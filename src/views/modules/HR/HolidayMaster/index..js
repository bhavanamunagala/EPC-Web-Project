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
  getHolidayMaster,
  deleteHolidayMaster,
} from "../../../../redux/actions/HR/HolidayMaster";
import { hasRight } from "../../../../constant/commonDS";

class HolidayMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HolidayMasterList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getHolidayMaster(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.project.error &&
      nextProps.project.error !== state.error
    ) {
      toast.error(nextProps.project.error);
      return {
        error: nextProps.project.error,
      };
    }
    if (nextProps.project&& nextProps.project.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.project.data).every(
          (p) => nextProps.project.data[p] !== state.HolidayMasterList[p]
        )
      ) {
        if (
          nextProps.project.random !== state.random &&
          nextProps.project.successMsg
        ) {
          successMsg = nextProps.project.successMsg;
          toast.success(successMsg);
        }
        return {
          HolidayMasterList:
            nextProps.project.data && nextProps.project.data.length
              ? nextProps.project.data
              : [],
          successMsg: successMsg,
          random: nextProps.project.random,
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
    this.props.deleteHolidayMaster(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getHolidayMaster(postData);
  };

  render() {
    let Access = hasRight("ACC_CRR");
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
                        pathname: `/HR/HolidayMaster/edit/${rowData.IDNumber}`,
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
          name: "Date",
          selector: "Date",
          sortable: true,
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
        },
  
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
      
      
      ];
    } else {
      columns = [
    
        {
          name: "Date",
          selector: "Date",
          sortable: true,
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
        },
      
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
   
      ];
    }

    const { HolidayMasterList, SearchText } = this.state;

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
                onClick={() => history.push("/HR/HolidayMaster/new")}
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
            data={HolidayMasterList}
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
    project: state.project,
  };
};

export default connect(mapStateToProps, {
  getHolidayMaster,
  deleteHolidayMaster,
})(HolidayMaster);
