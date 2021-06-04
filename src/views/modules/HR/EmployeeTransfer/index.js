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
  getEmployeeTransfer,
  deleteEmployeeTransfer,
} from "../../../../redux/actions/HR/EmployeeTransfer";
import { hasRight } from "../../../../constant/commonDS";

class EmployeeTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EmployeeTransferList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getEmployeeTransfer(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.employeeTransfer.error &&
      nextProps.employeeTransfer.error !== state.error
    ) {
      toast.error(nextProps.employeeTransfer.error);
      return {
        error: nextProps.employeeTransfer.error,
      };
    }
    if (nextProps.employeeTransfer&& nextProps.employeeTransfer.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.employeeTransfer.data).every(
          (p) => nextProps.employeeTransfer.data[p] !== state.EmployeeTransferList[p]
        )
      ) {
        if (
          nextProps.employeeTransfer.random !== state.random &&
          nextProps.employeeTransfer.successMsg
        ) {
          successMsg = nextProps.employeeTransfer.successMsg;
          toast.success(successMsg);
        }
        return {
          EmployeeTransferList:
            nextProps.employeeTransfer.data && nextProps.employeeTransfer.data.length
              ? nextProps.employeeTransfer.data
              : [],
          successMsg: successMsg,
          random: nextProps.employeeTransfer.random,
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
    this.props.deleteEmployeeTransfer(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getEmployeeTransfer(postData);
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
                        pathname: `/HR/EmployeeTransfer/edit/${rowData.IDNumber}`,
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
          name: "Employee Name",
          selector: "EmpName",
          sortable: true,
        },
        {
          name: "Employee Code",
          selector: "EmpCode",
          sortable: true,
        },
      
        {
          name: "Current Project",
          selector: "CurrentProject",
          sortable: true,
        },
        {
          name: "New Project",
          selector: "NewProject",
          sortable: true,
        },
        {
          name: "Remarks",
          selector: "Remarks",
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
          name: "Employee Name",
          selector: "EmpName",
          sortable: true,
        },
        {
          name: "Employee Code",
          selector: "EmpCode",
          sortable: true,
        },
      
        {
          name: "Current Project",
          selector: "CurrentProject",
          sortable: true,
        },
        {
          name: "New Project",
          selector: "NewProject",
          sortable: true,
        },
        {
          name: "Remarks",
          selector: "Remarks",
          sortable: true,
        },
   
      ];
    }

    const { EmployeeTransferList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Employee Transfer</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/HR/EmployeeTransfer/new")}
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
            data={EmployeeTransferList}
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
    employeeTransfer: state.employeeTransfer,
  };
};

export default connect(mapStateToProps, {
  getEmployeeTransfer,
  deleteEmployeeTransfer,
})(EmployeeTransfer);
