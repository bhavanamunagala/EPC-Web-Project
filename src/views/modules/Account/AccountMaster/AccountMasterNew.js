import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getAccountMaster,
  addAccountMaster,
  getAccountMasterDropDown,
} from "../../../../redux/actions/Account/AccountMaster";

import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Button,
  Input,
  Label,
  CardHeader,
  CardTitle,
  CustomInput,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { history } from "../../../../history";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";
import { Eye } from "react-feather";

class AccountMasterNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      AccountGroupList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getAccountMasterDropDown(postData);
    this.props.getAccountMaster(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.accountMaster.error !== this.props.accountMaster.error &&
      this.props.accountMaster.error
    ) {
      toast.error(this.props.accountMaster.error);
    }
    if (
      prevProps.accountMaster.successMsg !==
        this.props.accountMaster.successMsg &&
      this.props.accountMaster.successMsg
    ) {
      toast.success(this.props.accountMaster.successMsg);
    }

    if (
      prevProps.accountMaster.AccountGroupList !== this.props.accountMaster.AccountGroupList
    ) {
      this.setState({
        AccountGroupList:
          this.props.accountMaster.AccountGroupList &&
          this.props.accountMaster.AccountGroupList.length
            ? this.props.accountMaster.AccountGroupList
            : [],
      });
    }

    if (
      prevProps.accountMaster.data !== this.props.accountMaster.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.accountMaster.data &&
        this.props.accountMaster.data.filter((data) => {
          return data.IDNUMBER === id;
        })?.[0];

      this.setState({ itemData: filterData });
      this.setState({
        Group_ID: filterData?.Group_ID,
        ACNAME: filterData?.ACNAME,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const { Group_ID, ACNAME, itemData } = this.state;

    if (Group_ID && ACNAME) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Group_ID,
        ACNAME,
        Year_ID:
          localStorage.getItem("yearId") && localStorage.getItem("yearId"),
        CreatedDate: history?.location?.state?.id
          ? itemData?.CreatedDate
          : moment(),
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedDate: moment(),
      };

      if (history?.location?.state?.id) {
        await this.props.addAccountMaster({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addAccountMaster(postData);
      }
      await this.resetState();
      await history.push("/Account/AccountMaster");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Account Master</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Account/AccountMaster")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col>
                  <Label>Account Group</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="Group_IDSelect"
                    name="Group_IDSelect"
                    value={this.state?.Group_ID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.Group_ID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        Group_ID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Account Group</option>
                    {this.state.AccountGroupList &&
                      this.state.AccountGroupList?.length > 0 &&
                      this.state.AccountGroupList.map((d, i) => (
                        <option value={d.Grpcode} key={d.Grpcode}>
                          {d.Grpname}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.Group_ID && <ErrorText />}
                </Col>

                <Col>
                  <Label>Account Name</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.ACNAME ? this.state.ACNAME : ""}
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.ACNAME ? "invalid-input" : ""
                    }`}
                    onChange={(e) => this.setState({ ACNAME: e.target.value })}
                    name="ACNAME"
                    id="ACNAME"
                    placeholder="Account Name"
                  />
                  {btnFlg && !this.state?.ACNAME && <ErrorText />}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm="12">
                  <Button.Ripple
                    size="sm"
                    color="primary"
                    type="submit"
                    className="mr-1 "
                    onClick={this.handleSubmit}
                  >
                    Save
                  </Button.Ripple>
                  {!history?.location?.state?.id && (
                    <Button.Ripple
                      size="sm"
                      outline
                      color="warning"
                      type="reset"
                      onClick={this.resetState}
                    >
                      Reset
                    </Button.Ripple>
                  )}
                </Col>
              </FormGroup>
            </Form>
            <ToastContainer />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accountMaster: state.accountMaster,
  };
};

export default connect(mapStateToProps, {
  getAccountMaster,
  getAccountMasterDropDown,
  addAccountMaster,
})(AccountMasterNew);
