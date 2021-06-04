import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Edit, Trash, Plus } from "react-feather";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import "../../style.css";
import {
  getProjectAttendanceMaster,
  deleteProjectAttendanceMaster,
} from "../../../../redux/actions/HR/ProjectWiseAttendance";
import { hasRight } from "../../../../constant/commonDS";

class ProjectWiseAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProjectAttendanceMasterList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getProjectAttendanceMaster(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.projectAttendanceMaster.error &&
      nextProps.projectAttendanceMaster.error !== state.error
    ) {
      toast.error(nextProps.projectAttendanceMaster.error);
      return {
        error: nextProps.projectAttendanceMaster.error,
      };
    }
    if (nextProps.projectAttendanceMaster&& nextProps.projectAttendanceMaster.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.projectAttendanceMaster.data).every(
          (p) => nextProps.projectAttendanceMaster.data[p] !== state.ProjectAttendanceMasterList[p]
        )
      ) {
        if (
          nextProps.projectAttendanceMaster.random !== state.random &&
          nextProps.projectAttendanceMaster.successMsg
        ) {
          successMsg = nextProps.projectAttendanceMaster.successMsg;
          toast.success(successMsg);
        }
        return {
          ProjectAttendanceMasterList:
            nextProps.projectAttendanceMaster.data && nextProps.projectAttendanceMaster.data.length
              ? nextProps.projectAttendanceMaster.data
              : [],
          successMsg: successMsg,
          random: nextProps.projectAttendanceMaster.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  deleteRow = (row) => {
    this.setState({ deleteItem: row });
    this.setState({ deleteAlert: true });
  };
  deleteItem = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteItem.IDNumber,
      Code: this.state.deleteItem.Code,
  
    };
    this.props.deleteProjectAttendanceMaster(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getProjectAttendanceMaster(postData);
  };

  render() {
    let Access = hasRight("ACC_INS");
    let columns;
    if (Access.AllowUpdate || Access.AllowDelete) {
      columns = [
        {
          name: "Actions",
          selector: "actions",
          width: "7%",
          cell: (rowData) =>
            rowData && (
              <>
                {Access.AllowUpdate ? (
                  <Edit
                    className="cursor-pointer mr-1 text-warning"
                    size={20}
                    onClick={() =>
                      history.push({
                        pathname: `/HR/ProjectWiseAttendance/edit/${rowData.IDNumber}`,
                        state: {
                          id: rowData.IDNumber,
                        },
                      })
                    }
                  />
                ) : (
                  ""
                )}
                {Access.AllowDelete ? (
                  <Trash
                    className="cursor-pointer text-danger"
                    size={20}
                    onClick={() => {
                      this.deleteRow(rowData);
                    }}
                  />
                ) : (
                  ""
                )}
              </>
            ),
        },

   
        {
          name: "Start Date",
          selector: "StartDate",
          sortable: true,
          cell: (rowData) => moment(rowData.StartDate).format("DD-MM-YYYY"),
        },
      

  
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "End Date",
          selector: "EndDate",
          sortable: true,
          cell: (rowData) => moment(rowData.EndDate).format("DD-MM-YYYY"),
        },
      ];
    } else {
      columns = [
    
        {
          name: "Start Date",
          selector: "StartDate",
          sortable: true,
          cell: (rowData) => moment(rowData.StartDate).format("DD-MM-YYYY"),
        },
      

      
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "End Date",
          selector: "EndDate",
          sortable: true,
          cell: (rowData) => moment(rowData.EndDate).format("DD-MM-YYYY"),
        },
      ];
    }

    const { ProjectAttendanceMasterList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Wise Attendance</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/HR/ProjectWiseAttendance/new")}
              >
                <Plus size={20} className="text-white" />
              </Button>
            ) : (
              ""
            )}
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <DataTable
            data={ProjectAttendanceMasterList}
            columns={columns}
            noHeader
            pagination
            paginationComponentOptions={{
              rowsPerPageText: "Records per page:",
              rangeSeparatorText: "of",
              noRowsPerPage: false,
              selectAllRowsItem: false,
              selectAllRowsItemText: "All",
            }}
          />
          <ToastContainer />
          <SweetAlert
            title="Delete Item"
            show={this.state.deleteAlert}
            showCancel
            reverseButtons
            onConfirm={() => this.deleteItem()}
            onCancel={() => this.handleAlert("deleteAlert", false)}
          >
            <p className="sweet-alert-text">
              Are you sure you want to delete this Item
            </p>
          </SweetAlert>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projectAttendanceMaster: state.projectAttendanceMaster,
  };
};

export default connect(mapStateToProps, {
  getProjectAttendanceMaster,
  deleteProjectAttendanceMaster,
})(ProjectWiseAttendance);
