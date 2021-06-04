import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getLeaveApproval,
  addLeaveApproval,
  getLeaveApprovalDropDown,
} from "../../../../redux/actions/HR/LeaveApproval";

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
import { Eye, Trash } from "react-feather";

class LeaveApprovalNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      employeeList: [],
      EmployeeCodeList: [],
 
     
      file: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getLeaveApprovalDropDown(postData);
    this.props.getLeaveApproval(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.leaveApproval.error !== this.props.leaveApproval.error &&
      this.props.leaveApproval.error
    ) {
      toast.error(this.props.leaveApproval.error);
    }
    if (
      prevProps.leaveApproval.successMsg !== this.props.leaveApproval.successMsg &&
      this.props.leaveApproval.successMsg
    ) {
      toast.success(this.props.leaveApproval.successMsg);
    }

    if (prevProps.leaveApproval.employeeList !== this.props.leaveApproval.employeeList) {
      this.setState({
        employeeList:
          this.props.leaveApproval.employeeList &&
          this.props.leaveApproval.employeeList.length
            ? this.props.leaveApproval.employeeList
            : [],
      });
    }
    if (
      prevProps.leaveApproval.EmployeeCodeList !== this.props.leaveApproval.EmployeeCodeList
    ) {
      this.setState({
        EmployeeCodeList:
          this.props.leaveApproval.EmployeeCodeList &&
          this.props.leaveApproval.EmployeeCodeList.length
            ? this.props.leaveApproval.EmployeeCodeList
            : [],
      });
    }

 

    if (
      prevProps.leaveApproval.data !== this.props.leaveApproval.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.leaveApproval.data &&
        this.props.leaveApproval.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        LeaveCode: filterData?.LeaveCode,
        EmployeeID: filterData?.EmployeeID,
        EmpName: filterData?.EmpName,
        EmpCode: filterData?.EmpCode,
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
    const { Date, EmployeeID,LeaveCode,EmpName,EmpCode, file, itemData } =
      this.state;

    if ( Date&& EmployeeID&&LeaveCode&&EmpName&&EmpCode&& file&& itemData  ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
            EmployeeID,
            LeaveCode,
            EmpName,
            EmpCode,
             file,
              itemData,
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
        await this.props.addLeaveApproval({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addLeaveApproval(postData);
      }
      await this.resetState();
      await history.push("/HR/LeaveApproval");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, EmployeeList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Leave Approval</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/LeaveApproval")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col>
                  <Label>Date</Label>
                  <Flatpickr
                    value={this.state.Date}
                    onChange={(date) => {
                      this.setState({ Date: date });
                    }}
                    placeholder="Date"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Date ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.Date && <ErrorText />}
                </Col>

                <Col>
                  <Label>LeaveCode</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.LeaveCode
                        ? this.state.LeaveCode
                        : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.LeaveCode
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ LeaveCode: e.target.value })
                    }
                    name="LeaveCode"
                    id="LeaveCode"
                    placeholder="LeaveCode"
                  />
                  {btnFlg && !this.state?.LeaveCode && <ErrorText />}
                </Col>
             
                <Col>
                  <Label>Select Employee</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="EmployeeIDSelect"
                    name="EmployeeIDSelect"
                    value={this.state?.EmployeeID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.EmployeeID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        EmployeeID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Employee</option>
                    {EmployeeList &&
                      EmployeeList?.length > 0 &&
                      EmployeeList.map((d, i) => (
                        <option value={d.EmpCode} key={d.EmpCode}>
                          {d.EmpName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.EmployeeID && <ErrorText />}
                </Col>

                <Col>
                  <Label>Employee Code</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="EmployeeIDSelect"
                    name="EmployeeIDSelect"
                    value={this.state?.EmployeeID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.EmployeeID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        EmployeeID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Employee Code</option>
                    {EmployeeList &&
                      EmployeeList?.length > 0 &&
                      EmployeeList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.EmpCode}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.EmployeeID && <ErrorText />}
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
    leaveApproval: state.leaveApproval,
  };
};

export default connect(mapStateToProps, {
  getLeaveApproval,
  getLeaveApprovalDropDown,
  addLeaveApproval,
})(LeaveApprovalNew);
