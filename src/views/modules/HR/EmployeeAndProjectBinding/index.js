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
  getProjectEmpMaster,
  deleteProjectEmpMaster,
} from "../../../../redux/actions/HR/EmployeeAndProjectBinding";
import { hasRight } from "../../../../constant/commonDS";

class ProjectEmpMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProjectEmpMasterList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getProjectEmpMaster(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.projectEmpMaster.error &&
      nextProps.projectEmpMaster.error !== state.error
    ) {
      toast.error(nextProps.projectEmpMaster.error);
      return {
        error: nextProps.projectEmpMaster.error,
      };
    }
    if (nextProps.projectEmpMaster&& nextProps.projectEmpMaster.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.projectEmpMaster.data).every(
          (p) => nextProps.projectEmpMaster.data[p] !== state.EmployeeAndProjectBindingList[p]
        )
      ) {
        if (
          nextProps.projectEmpMaster.random !== state.random &&
          nextProps.projectEmpMaster.successMsg
        ) {
          successMsg = nextProps.projectEmpMaster.successMsg;
          toast.success(successMsg);
        }
        return {
          ProjectEmpMasterList:
            nextProps.projectEmpMaster.data && nextProps.projectEmpMaster.data.length
              ? nextProps.projectEmpMaster.data
              : [],
          successMsg: successMsg,
          random: nextProps.projectEmpMaster.random,
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
    this.props.deleteProjectEmpMaster(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getProjectEmpMaster(postData);
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
                        pathname: `/HR/EmployeeAndProjectBinding/edit/${rowData.IDNumber}`,
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
        {
          name: "Responsible Name",
          selector: "ResponsibleName",
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
        {
          name: "Responsible Name",
          selector: "ResponsibleName",
          sortable: true,
        },
      
      ];
    }

    const { ProjectEmpMasterList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Wise Employee Binding</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/HR/EmployeeAndProjectBinding/new")}
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
            data={ProjectEmpMasterList}
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
    projectEmpMaster: state.projectEmpMaster,
  };
};

export default connect(mapStateToProps, {
  getProjectEmpMaster,
  deleteProjectEmpMaster,
})(ProjectEmpMaster);
