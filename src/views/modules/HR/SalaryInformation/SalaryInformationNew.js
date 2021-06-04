import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getEmpSalaryInfo,
  getEmpSalaryInfoDropDown,
  addEmpSalaryInfo,
} from "../../../../redux/actions/HR/SalaryInformation";

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

class EmpSalaryInfoNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      paymentList: [],
      employeeList: [],
    };
  }
   componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getEmpSalaryInfoDropDown(postData);
    this.props.getEmpSalaryInfo(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.empSalaryInfo.error !== this.props.empSalaryInfo.error &&
      this.props.empSalaryInfo.error
    ) {
      toast.error(this.props.empSalaryInfo.error);
    }
    if (
      prevProps.empSalaryInfo.successMsg !==
        this.props.empSalaryInfo.successMsg &&
      this.props.empSalaryInfo.successMsg
    ) {
      toast.success(this.props.empSalaryInfo.successMsg);
    }


    
    if (
      prevProps.empSalaryInfo.paymentList !==
      this.props.empSalaryInfo.paymentList
    ) {
      this.setState({
        paymentList:
          this.props.empSalaryInfo.paymentList &&
          this.props.empSalaryInfo.paymentList.length
            ? this.props.empSalaryInfo.paymentList
            : [],
      });
    }
  
    if (
      prevProps.empSalaryInfo.employeeList !==
      this.props.empSalaryInfo.employeeList
    ) {
      this.setState({
        employeeList:
          this.props.empSalaryInfo.employeeList &&
          this.props.empSalaryInfo.employeeList.length
            ? this.props.empSalaryInfo.employeeList
            : [],
      });
    }
  
    if (
      prevProps.empSalaryInfo.data !== this.props.empSalaryInfo.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.empSalaryInfo.data &&
        this.props.empSalaryInfo.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        parentIDNumber: filterData?.IDNumber,
    
        PaymentTypeID: filterData?.PaymentTypeID,
        EmployeeID: filterData?.EmployeeID,
        OnDate: filterData?.OnDate,
        LookupDesc: filterData?.LookupDesc,
        EmpName: filterData?.EmpName,
        EmpCode: filterData?.EmpCode,
        Amount: filterData?.Amount,
        EarningCode: filterData?.EarningCode,
        EarningName: filterData?.EarningName,
        DeductionCode: filterData?.DeductionCode,
        DeductionName: filterData?.DeductionName,
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


    const {
      PaymentTypeID,
      EmployeeID,
      OnDate,
      EmpCode,
     Amount,
     EmpName,
     EarningCode,
     EarningName,
     DeductionCode,
     DeductionName,
     LookupDesc,
     itemData
    } = this.state;
    if (
      PaymentTypeID &&
      EmployeeID &&
      OnDate &&
      EmpCode &&
      Amount &&
      EarningCode &&
      EarningName &&
      DeductionCode &&
      DeductionName &&
      LookupDesc &&
      EmpName
  
    ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        PaymentTypeID,
        EmployeeID,
        EmpCode,
        EmpName,
        Amount,
        OnDate:
          typeof OnDate === "object"
            ? moment(OnDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : OnDate,
       EarningCode,
       EarningName,
       DeductionName,
       DeductionCode,
       LookupDesc,
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
        await this.props.addEmpSalaryInfo({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addEmpSalaryInfo(postData);
      }
      await this.resetState();
      await history.push("/HR/SalaryInformation");
    }
  };

  resetState = () => {
    this.setState({
      PaymentTypeID: 0,
      EmployeeID: 0,
      OnDate: null
   
    });
  };

  toggleModal = () =>
    this.setState({
      modal: !this.state.modal,
    });


  render() {
    const { btnFlg ,Reason} = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Salary Information</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/SalaryInformation")}
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
                  <Label>Payment Type</Label>
                
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="PaymentTypeIDSelect"
                    name="PaymentTypeIDSelect"
                    value={this.state?.PaymentTypeID}
                    className={`p-0 pl-1 
                    ${
                      btnFlg && this.state?.Group_ID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        PaymentTypeID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Payment</option>
                    {this.state.paymentList &&
                      this.state.paymentList?.length > 0 &&
                      this.state.paymentList.map((d, i) => (
                        <option value={d.LookupCode} key={d.LookupCode}>
                          {d.LookupDesc}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.PaymentTypeID && <ErrorText />}
               </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                
                <Label>Employee </Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="EmployeeIDSelect"
                    name="EmployeeIDSelect"
                    value={this.state?.EmployeeID}
                    className={`p-0 pl-1 
                    ${
                      btnFlg && !this.state?.EmployeeID ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        EmployeeID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Employee</option>
                    {this.state.employeeList &&
                      this.state.employeeList?.length > 0 &&
                      this.state.employeeList.map((d, i) => (
                        <option value={d.EmpCode} key={d.EmpCode}>
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
                <Col>
                  <Label>Basic Amount</Label>
                  <Input
           sss         bsSize="sm"
                    type="number"
                    value={this.state.Amount ? this.state.Amount : ""}
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Amount ? "invalid-input" : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ Amount: e.target.value })
                    }
                    name="Amount"
                    id="Amount"
                    placeholder="Amount"
                  />
                  {btnFlg && !this.state?.Amount && <ErrorText />}
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
    empSalaryInfo: state.empSalaryInfo,
  };
};

export default connect(mapStateToProps, {
  getEmpSalaryInfo,
  getEmpSalaryInfoDropDown,
  addEmpSalaryInfo,
})(EmpSalaryInfoNew);
