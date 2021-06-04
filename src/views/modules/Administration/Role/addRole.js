import React from "react";
import { connect } from "react-redux";
import { Eye } from "react-feather";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import { history } from "../../../../history";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";
import {
  getRoleData,
  deleteRoleData,
  getDefaultRights,
  submitData,
  getGroupRights,
} from "../../../../redux/actions/Administration/role";

class AddRole extends React.Component {
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
      tmpRights: [],
    };
  }

  componentDidMount() {
    let roleData = {
      RoleID: history?.location?.state?.id ? history?.location?.state?.id : 0,
    };
    var postData = {
      GroupName: "",
      PageNo: 1,
      PageSize: 20,
    };
    this.props.getRoleData(postData);
    this.props.getGroupRights(roleData);

    // this.props.getDefaultRights(roleData);
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

  handleSubmenuChange = (event, data, action) => {
    let defaultRights = [...this.state.defaultRights[0].SubMenus];

    let defaultIndex = this.state.defaultRights[0].SubMenus.findIndex(
      (x) => x.FuncIDNumber === data.FuncIDNumber
    );

    defaultRights[defaultIndex][action] = event.target.checked ? 1 : 0;
    defaultRights[defaultIndex]["UpdatedBy"] = JSON.parse(
      localStorage.getItem("userData")
    ).IDNumber;

    this.setState({
      // defaultRights: defaultRights,
      tmpRights: defaultRights,
    });
  };

  onInputChange = (event, name) => {
    if (name === "GroupName") {
      let pattern = /^[a-zA-Z ]*$/;
      if (pattern.test(event.target.value)) {
        this.setState({ [name]: event.target.value });
      }
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const { tmpRights, GroupCode, GroupName, GroupID } = this.state;
    if (GroupCode && GroupName) {
      let postData = {
        IDNumber: GroupID ? GroupID : 0,
        GroupCode: GroupCode,
        GroupName: GroupName,
        UpdatedBy: JSON.parse(localStorage.getItem("userData")).IDNumber,
        GroupRights: tmpRights,
      };

      this.props.submitData(postData);
      this.resetState();
      history.push("/Administrator/RoleMaster");
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.roles.data !== this.props.roles.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.roles.data &&
        this.props.roles.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];

      this.setState({
        GroupID: filterData?.IDNumber,
        GroupCode: filterData?.GroupCode,
        GroupName: filterData?.GroupName,
      });
    }

    if (prevProps.roles.data !== this.props.roles.data) {
      let RolesData = [];
      this.props.roles.data.forEach((item) => {
        RolesData.push({ value: item.IDNumber, label: item.GroupName });
      });
      this.setState({
        RolesList:
          this.props.roles.data && this.props.roles.data.length
            ? RolesData
            : [],
      });
    }
  }

  resetState = () => {
    // let temp = this.state.defaultRights;
    // temp.forEach((item) => {
    //   item.AllowInsert = 0;
    //   item.AllowUpdate = 0;
    //   item.AllowDelete = 0;
    //   item.AllowView = 0;
    //   item.AllowApproval = 0;
    // });

    this.setState({ GroupCode: "", GroupName: "", tmpRights: [] });
  };

  render() {
    const { btnFlg } = this.state;
    return (
      <Card>
        <CardHeader>
          <CardTitle>Role Master</CardTitle>
          <Button
            size="sm"
            color="primary"
            onClick={() => history.push("/Administrator/RoleMaster")}
          >
            <Eye size={20} className="text-white" />
          </Button>
        </CardHeader>
        <CardBody className="p-0">
          <Form>
            <FormGroup row className="p-1">
              <Col md="6" sm="12">
                <Label>Group Code</Label>
                <Input
                  size="sm"
                  type="text"
                  value={this.state.GroupCode}
                  onChange={(e) => this.onInputChange(e, "GroupCode")}
                  name="groupCode"
                  id="groupCodeId"
                  placeholder="Group Code"
                  className={
                    btnFlg &&
                    (!this.state.GroupCode || this.state.GroupCode === "")
                      ? "invalid-input"
                      : ""
                  }
                />
                {btnFlg &&
                  (!this.state.GroupCode || this.state.GroupCode === "") && (
                    <ErrorText />
                  )}
              </Col>
              <Col md="6" sm="12">
                <Label>Group Name</Label>
                <Input
                  size="sm"
                  type="text"
                  value={this.state.GroupName}
                  onChange={(e) => this.onInputChange(e, "GroupName")}
                  name="groupName"
                  id="groupId"
                  placeholder="Group Name"
                  className={
                    btnFlg &&
                    (!this.state.GroupName || this.state.GroupName === "")
                      ? "invalid-input"
                      : ""
                  }
                />
                {btnFlg &&
                  (!this.state.GroupName || this.state.GroupName === "") && (
                    <ErrorText />
                  )}
              </Col>
            </FormGroup>
            <FormGroup
              row
              style={{ height: "295px", overflowY: "auto" }}
              className="p-1"
            >
              <Col sm="12">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Function Name</th>
                      <th>Add</th>
                      <th>Edit</th>
                      <th>View</th>
                      <th>Delete</th>
                      <th>Approve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.defaultRights &&
                      this.state.defaultRights.length > 0 &&
                      this.state.defaultRights.map(
                        (data, i) =>
                          data.SubMenus !== null &&
                          data.SubMenus.map((d, i) => (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td>{d.FunName}</td>
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    this.handleSubmenuChange(
                                      e,
                                      d,
                                      "AllowInsert"
                                    )
                                  }
                                  checked={d.AllowInsert ? true : false}
                                />
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    this.handleSubmenuChange(
                                      e,
                                      d,
                                      "AllowUpdate"
                                    )
                                  }
                                  checked={d.AllowUpdate ? true : false}
                                />
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    this.handleSubmenuChange(e, d, "AllowView")
                                  }
                                  checked={d.AllowView ? true : false}
                                />
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    this.handleSubmenuChange(
                                      e,
                                      d,
                                      "AllowDelete"
                                    )
                                  }
                                  checked={d.AllowDelete ? true : false}
                                />
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    this.handleSubmenuChange(
                                      e,
                                      d,
                                      "AllowApproval"
                                    )
                                  }
                                  checked={d.AllowApproval ? true : false}
                                />
                              </td>
                            </tr>
                          ))
                      )}
                  </tbody>
                </Table>
              </Col>
            </FormGroup>

            <FormGroup row className="pl-1 pr-1">
              <Col sm="12">
                <Button.Ripple
                  size="sm"
                  color="primary"
                  type="submit"
                  className="mr-1"
                  onClick={this.handleSubmit}
                >
                  Save
                </Button.Ripple>
                <Button.Ripple
                  size="sm"
                  outline
                  color="warning"
                  type="reset"
                  onClick={this.resetState}
                >
                  Reset
                </Button.Ripple>
              </Col>
            </FormGroup>
          </Form>
          <ToastContainer />
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
  getGroupRights,
})(AddRole);
