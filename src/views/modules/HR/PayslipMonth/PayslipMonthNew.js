import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getPayslipMonth,
  addPayslipMonth,
  getPayslipMonthDropDown,
} from "../../../../redux/actions/HR/PayslipMonth";

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
  Table,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { history } from "../../../../history";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";
import { Eye } from "react-feather";

class PayslipMonthNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      EmployeeList: [],
      SelectMonth:[]

    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getPayslipMonthDropDown(postData);
    this.props.getPayslipMonth(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.paySlipMaster.error !== this.props.paySlipMaster.error &&
      this.props.paySlipMaster.error
    ) {
      toast.error(this.props.paySlipMaster.error);
    }
    if (
      prevProps.paySlipMaster.successMsg !==
        this.props.paySlipMaster.successMsg &&
      this.props.paySlipMaster.successMsg
    ) {
      toast.success(this.props.paySlipMaster.successMsg);
    }

    if (
      prevProps.paySlipMaster.EmployeeList !==
      this.props.paySlipMaster.EmployeeList
    ) {
      this.setState({
        EmployeeList:
          this.props.paySlipMaster.EmployeeList &&
          this.props.paySlipMaster.EmployeeList.length
            ? this.props.paySlipMaster.EmployeeList
            : [],
      });
    }

    if (
      prevProps.paySlipMaster.SelectMonthList !==
      this.props.paySlipMaster.SelectMonthList
    ) {
      this.setState({
        SelectMonthList:
          this.props.paySlipMaster.SelectMonthList &&
          this.props.paySlipMaster.SelectMonthList.length
            ? this.props.paySlipMaster.SelectMonthList
            : [],
      });
    }

    if (
      prevProps.paySlipMaster.data !== this.props.paySlipMaster.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.paySlipMaster.data &&
        this.props.paySlipMaster.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
      IDNumber: filterData?.IDNumber,
      OnDate: filterData?.OnDate,
      EmpID: filterData?.EmpID,
      EmpName: filterData?.EmpName,
      EmpCode: filterData?.EmpCode,
      BasicSalary: filterData?.BasicSalary,
      Attendance: filterData?.Attendance,
      PresentDays: filterData?.PresentDays,
      GrossEarnings: filterData?.GrossEarnings,
      TotalDeduction: filterData?.TotalDeduction,
      NetSalary: filterData?.NetSalary,
      Remarks: filterData?.Remarks,



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
    const {OnDate,EmpID,EmpName,EmpCode,BasicSalary,Attendance,PresentDays,GrossEarnings,NetSalary, Remarks,TotalDeduction,itemData } = this.state;

    if (OnDate&&EmpID&&EmpName&&EmpCode&&BasicSalary&&Attendance&&PresentDays&&GrossEarnings&&NetSalary&& Remarks&&TotalDeduction&&itemData) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
          OnDate,
          EmpID,
          EmpName,
          EmpCode,
          BasicSalary,
          Attendance,
          PresentDays,
          GrossEarnings,
          NetSalary,
           Remarks,
          TotalDeduction,
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
        await this.props.addPayslipMonth({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addPayslipMonth(postData);
      }
      await this.resetState();
      await history.push("/HR/PayslipMonth");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, EmployeeList, MonthList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Payslip Month</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/PayslipMonth")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col>
                  <Label>Employee</Label>
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
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.EmpName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.EmployeeID && <ErrorText />}
                </Col>
                <Col>
                  <Label>Employee Code</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.EmpCode ? this.state.EmpCode : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.EmpCode ? "invalid-input" : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ EmpCode: e.target.value })
                    }
                    name="EmpCode"
                    id="EmpCode"
                    placeholder="EmpCode"
                  />
                  {btnFlg && !this.state?.EmpCode && <ErrorText />}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="8">
                  <Label>Select Month</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="MonthIDSelect"
                    name="MonthIDSelect"
                    value={this.state?.MonthID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.MonthID === 0 ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        MonthID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Month</option>
                    {MonthList &&
                      MonthList?.length > 0 &&
                      MonthList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.MonthName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.MonthID && <ErrorText />}
                </Col>

                <Col sm="4">
                  <Button
                    color="primary"
                    className="cursor-pointer action-btn mr-1 mt-2"
                    size="sm"
                    onClick={() => this.handleAddAccount()}
                    style={{ height: "28px" }}
                  >
                    Get Details
                  </Button>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>Attendence</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.Attendence ? this.state.Attendence : ""}
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Attendence ? "invalid-input" : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ Attendence: e.target.value })
                    }
                    name="Attendence"
                    id="Attendence"
                    placeholder="Attendence"
                  />
                  {btnFlg && !this.state?.Attendence && <ErrorText />}
                </Col>
                <Col>
                  <Label>Present Days</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.PresentDays ? this.state.PresentDays : ""}
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.PresentDays ? "invalid-input" : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ PresentDays: e.target.value })
                    }
                    name="PresentDays"
                    id="PresentDays"
                    placeholder="PresentDays"
                  />
                  {btnFlg && !this.state?.PresentDays && <ErrorText />}
                </Col>
                <Col>
                  <Label>Basic Cut</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.BasicSalary ? this.state.BasicSalary : ""}
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.BasicSalary ? "invalid-input" : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ BasicSalary: e.target.value })
                    }
                    name="BasicSalary"
                    id="BasicSalary"
                    placeholder="BasicSalary"
                  />
                  {btnFlg && !this.state?.BasicSalary && <ErrorText />}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>Earning Details</Label>
                  <Table>
                    <thead>
                      <tr>
                        <th>Earning</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Salary</td>
                        <td>35000</td>
                      </tr>
                      <tr>
                        <td>xyz</td>
                        <td>XXXX</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col>
                  <Label>Deduction Details</Label>
                  <Table>
                    <thead>
                      <tr>
                        <th>Deduction</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>PF</td>
                        <td>4003</td>
                      </tr>
                      <tr>
                        <td>xyz</td>
                        <td>XXXX</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>Gross Earning</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.GrossEarnings ? this.state.GrossEarnings : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.GrossEarnings ? "invalid-input" : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ GrossEarnings: e.target.value })
                    }
                    name="GrossEarnings"
                    id="GrossEarnings"
                    placeholder="Gross Earnings"
                  />
                  {btnFlg && !this.state?.GrossEarnings && <ErrorText />}
                </Col>
                <Col>
                  <Label>Total Deduction</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.TotalDeduction ? this.state.TotalDeduction : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.TotalDeduction
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ TotalDeduction: e.target.value })
                    }
                    name="TotalDeduction"
                    id="TotalDeduction"
                    placeholder="Total Deduction"
                  />
                  {btnFlg && !this.state?.TotalDeduction && <ErrorText />}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>NetSalary</Label>
                  <Input
                    type="text"
                    value={this.state.NetSalary ? this.state.NetSalary : ""}
                    onChange={(e) =>
                      this.setState({ NetSalary: e.target.value })
                    }
                    name="NetSalary"
                    id="NetSalary"
                    placeholder="Net Salary"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.NetSalary ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.NetSalary && <ErrorText />}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label>Remarks</Label>
                  <Input
                    type="text"
                    value={this.state.Remarks ? this.state.Remarks : ""}
                    onChange={(e) => this.setState({ Remarks: e.target.value })}
                    name="Remarks"
                    id="Remarks"
                    placeholder="Remarks"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Remarks ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.Remarks && <ErrorText />}
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
    paySlipMaster: state.paySlipMaster,
  };
};

export default connect(mapStateToProps, {
  getPayslipMonth,
  getPayslipMonthDropDown,
  addPayslipMonth,
})(PayslipMonthNew);
