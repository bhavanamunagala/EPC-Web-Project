import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardHeader, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import "../../style.css";
import {
  getEmployee,
  deleteEmployee,
} from "../../../../redux/actions/Administration/employee";
import { Card, CardBody, Button } from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";

import { Edit, Trash, UserPlus } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { history } from "../../../../history";
import { CustomHeader } from "../../../components/CustomHeader";
import DataTable from "react-data-table-component";
import { hasRight } from "../../../../constant/commonDS";

class EmployeeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      id: "",
      deleteEmployee: null,
      SearchText: "",
      successMsg: "",
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getEmployee(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.employee.error && props.employee.error !== state.error) {
      toast.error(props.employee.error);
      return {
        error: props.employee.error,
      };
    }
    if (props.employee && props.employee.employeeList) {
      let successMsg = "";
      if (
        Object.keys(props.employee.employeeList).every(
          (p) => props.employee.employeeList[p] !== state.response[p]
        )
      ) {
        if (
          props.employee.random !== state.random &&
          props.employee.successMsg
        ) {
          successMsg = props.employee.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.employee.employeeList && props.employee.employeeList.length
              ? props.employee.employeeList
              : [],
          successMsg: successMsg,
          random: props.employee.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.employee.successMsg !== prevProps.employee.successMsg) {
      toast.success(this.props.employee.successMsg);
    }
  }

  editRow = (row) => {
    this.setState({ id: row.IDNumber });
  };

  deleteRow = (row) => {
    this.setState({ deleteEmployee: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  deleteEmployee = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteEmployee.IDNumber,
      EmployeeName: this.state.deleteEmployee.EmpName,
    };
    this.props.deleteEmployee(postData);
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getEmployee(postData);
  };

  render() {
    let Access = hasRight("EMPMST");
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
                    onClick={() => {
                      history.push({
                        pathname: `/Administrator/EmployeeMaster/edit/${rowData.IDNumber}`,
                        state: {
                          id: rowData.IDNumber,
                        },
                      });
                      return this.editRow(rowData);
                    }}
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
          name: "UserCode",
          selector: "EmpCode",
          sortable: true,
        },
        {
          name: "Name",
          selector: "EmpName",
          sortable: true,
        },
        {
          name: "User Name",
          selector: "UserID",
          sortable: true,
        },
        {
          name: "Role",
          selector: "GroupName",
          sortable: true,
        },
        {
          name: "Employee Type",
          selector: "EmpType",
          sortable: true,
        },
        {
          name: "Mobile No",
          selector: "MobileNo",
          sortable: true,
        },
        {
          name: "City",
          selector: "CityName",
          sortable: true,
        },
      ];
    } else {
      columns = [
        {
          name: "UserCode",
          selector: "EmpCode",
          sortable: true,
        },
        {
          name: "Name",
          selector: "EmpName",
          sortable: true,
        },
        {
          name: "User Name",
          selector: "UserID",
          sortable: true,
        },
        {
          name: "Role",
          selector: "GroupName",
          sortable: true,
        },
        {
          name: "Employee Type",
          selector: "EmpType",
          sortable: true,
        },
        {
          name: "Mobile No",
          selector: "MobileNo",
          sortable: true,
        },
        {
          name: "City",
          selector: "CityName",
          sortable: true,
        },
      ];
    }
    const { response, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Employee Master</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() =>
                  history.push("/Administrator/EmployeeMaster/new")
                }
              >
                <UserPlus size={20} className="text-white" />
              </Button>
            ) : (
              ""
            )}
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <DataTable
            // data={SearchText.length ? filteredData : response}
            data={response}
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
            title="Delete Employee"
            show={this.state.deleteAlert}
            showCancel
            reverseButtons
            onConfirm={() => this.deleteEmployee()}
            onCancel={() => this.handleAlert("deleteAlert", false)}
          >
            <p className="sweet-alert-text">
              Are you sure you want to delete this Employee
            </p>
          </SweetAlert>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employee: state.employee,
  };
};

export default connect(mapStateToProps, {
  getEmployee,
  deleteEmployee,
})(EmployeeView);
