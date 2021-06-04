import React from "react";
import { CardTitle } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import "../../style.css";
import {
  // Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  // FormGroup,
} from "reactstrap";
import {
  getRoleData,
  deleteRoleData,
  getDefaultRights,
  submitData,
} from "../../../../redux/actions/Administration/role";
import { Edit, Trash, Plus } from "react-feather";
import { connect } from "react-redux";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
// import ErrorText from "../../../ui-elements/text-utilities/ErrorText";
import { CustomHeader } from "../../../components/CustomHeader";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { hasRight } from "../../../../constant/commonDS";

class RoleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      defaultRights: [],
      deleteAlert: false,
      selectedRights: [],
      error: "",
      deleteRoleId: null,
      random: "",
      GroupCode: "",
      GroupName: "",
      btnFlg: false,
    };
  }

  componentDidMount() {
    let roleData = {
      RoleID: JSON.parse(localStorage.getItem("userData")).RoleID,
    };
    this.props.getDefaultRights(roleData);
    var postData = {
      GroupName: "",
      PageNo: 1,
      PageSize: 20,
    };

    this.props.getRoleData(postData);
  }

  static getDerivedStateFromProps(props, state, prevProps) {
    if (props.roles.error && props.roles.error !== state.error) {
      toast.error(props.roles.error);
      return {
        error: props.roles.error,
      };
    }

    if (props.roles && props.roles.data) {
      if (
        Object.keys(props.roles.data).every(
          (p) => props.roles.data[p] !== state.response[p]
        ) ||
        (props.roles.rights &&
          Object.keys(props.roles.rights).every(
            (p) => props.roles.rights[p] !== state.defaultRights[p]
          ))
      ) {
        let successMsg = "";
        if (props.roles.random !== state.random && props.roles.successMsg) {
          successMsg = props.roles.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.roles.data && props.roles.data.length ? props.roles.data : [],
          successMsg: successMsg,
          defaultRights:
            props.roles && props.roles.rights ? props.roles.rights : [],
          random: props.roles.random,
        };
      }
    }

    return null;
  }

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });

    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getRoleData(postData);
  };

  editRow = (row) => {
    // this.props.getDefaultRights(roleData);
    this.setState({
      GroupCode: row.GroupCode,
      GroupName: row.GroupName,
      GroupID: row.IDNumber,
      // defaultRights: row.defaultRights,
    });
  };
  deleteRow = (row) => {
    this.setState({ deleteRoleId: row.IDNumber });
    this.setState({ deleteAlert: true });
    //api pending
  };
  deleteRole() {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteRoleId,
    };
    this.props.deleteRoleData(postData);
  }
  handleChange = (event, data, action) => {
    let selectedRight = {
      IDNumber: 0,
      FuncIdnumber: data.IDNumber,
      AllowInsert: 0,
      AllowUpdate: 0,
      AllowDelete: 0,
      AllowView: 0,
      AllowApproval: 0,
    };
    let defaultData = this.state.defaultRights;

    let defaultIndex = this.state.defaultRights.findIndex(
      (x) => x.IDNumber === data.IDNumber
    );

    if (event.target.checked) {
      selectedRight[action] = 1;
      if (defaultIndex !== -1) {
        defaultData[defaultIndex][action] = 1;
      }
    } else {
      selectedRight[action] = 0;
      if (defaultIndex !== -1) {
        defaultData[defaultIndex][action] = 0;
      }
    }
    let rights = this.state.selectedRights;
    let index = rights.findIndex((x) => x.FuncIdnumber === data.IDNumber);
    if (index !== -1) {
      rights[index] = selectedRight;
    } else {
      rights.push(selectedRight);
    }

    this.setState({ defaultRights: defaultData });

    this.setState({ selectedRights: rights });
  };
  groupCodeChange = (event) => {
    this.setState({ GroupCode: event.target.value });
  };

  onGroupNameChange = (event) => {
    let pattern = /^[a-zA-Z ]*$/;
    if (pattern.test(event.target.value)) {
      this.setState({ GroupName: event.target.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    if (
      this.state.selectedRights.length &&
      this.state.GroupCode &&
      this.state.GroupName
    ) {
      let postData = {
        IDNumber: this.state.GroupID ? this.state.GroupID : 0,
        GroupCode: this.state.GroupCode,
        GroupName: this.state.GroupName,
        CreatedBy: JSON.parse(localStorage.getItem("userData")).CreatedBy,
        GroupRights: this.state.selectedRights,
      };
      this.props.submitData(postData);
      this.setState({ selectedRights: [], GroupCode: "", GroupName: "" });
    }
  };

  resetState = () => {
    let temp = this.state.defaultRights;
    temp.forEach((item) => {
      item.AllowInsert = 0;
      item.AllowUpdate = 0;
      item.AllowDelete = 0;
      item.AllowView = 0;
      item.AllowApproval = 0;
    });

    this.setState({ GroupCode: "", GroupName: "", defaultRights: temp });
  };
  render() {
    let Access = hasRight("ROLE");
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
                        pathname: `/Administrator/RoleMaster/edit/${rowData.IDNumber}`,
                        state: {
                          id: rowData.IDNumber,
                        },
                      });
                      this.editRow(rowData);
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
          name: "Group Code",
          selector: "GroupCode",
          sortable: true,
          width: "10%",
        },
        {
          name: "Group Name",
          selector: "GroupName",
          sortable: true,
          width: "10%",
        },
      ];
    } else {
      columns = [
        {
          name: "Group Code",
          selector: "GroupCode",
          sortable: true,
          width: "10%",
        },
        {
          name: "Group Name",
          selector: "GroupName",
          sortable: true,
          width: "10%",
        },
      ];
    }

    const { response, SearchText } = this.state;
    return (
      <Card>
        <CardHeader>
          <CardTitle>Role Master</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Administrator/RoleMaster/new")}
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
            title="Delete Role"
            show={this.state.deleteAlert}
            onConfirm={() => this.deleteRole()}
            onCancel={() => this.handleAlert("deleteAlert", false)}
          >
            <p className="sweet-alert-text">
              Are you sure you want to delete this role
            </p>
          </SweetAlert>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roles: state.roles,
  };
};

export default connect(mapStateToProps, {
  getRoleData,
  getDefaultRights,
  deleteRoleData,
  submitData,
})(RoleView);
