import React from "react";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { CardHeader, Card, CardBody, CardTitle, Button } from "reactstrap";
import "../../style.css";
import {
  getUser,
  deleteUser,
} from "../../../../redux/actions/Administration/user";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Edit, Trash, UserPlus } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { CustomHeader } from "../../../components/CustomHeader";
import { history } from "../../../../history";
import { hasRight } from "../../../../constant/commonDS";

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      filteredData: [],
      id: "",
      deleteEmployee: null,
      SearchText: "",
      successMsg: "",
      deleteAlert: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user.error && props.user.error !== state.error) {
      toast.error(props.user.error);
      return {
        error: props.user.error,
      };
    }
    if (props.user && props.user.userList) {
      let successMsg = "";
      if (
        Object.keys(props.user.userList).every(
          (p) => props.user.userList[p] !== state.response[p]
        )
      ) {
        if (props.user.random !== state.random && props.user.successMsg) {
          successMsg = props.user.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.user.userList && props.user.userList.length
              ? props.user.userList
              : [],
          successMsg: successMsg,
          random: props.user.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getUser(postData);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.successMsg !== prevProps.user.successMsg) {
      toast.success(this.props.user.successMsg);
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
    this.props.deleteUser(postData);
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getUser(postData);
  };

  render() {
    let Access = hasRight("USE");
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
                        pathname: `/Administrator/UserMaster/edit/${rowData.IDNumber}`,
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
          <CardTitle>User Master</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Administrator/UserMaster/new")}
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
            title="Delete User"
            show={this.state.deleteAlert}
            showCancel
            reverseButtons
            onConfirm={() => this.deleteEmployee()}
            onCancel={() => this.handleAlert("deleteAlert", false)}
          >
            <p className="sweet-alert-text">
              Are you sure you want to delete this User
            </p>
          </SweetAlert>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  getUser,
  deleteUser,
})(UserView);
