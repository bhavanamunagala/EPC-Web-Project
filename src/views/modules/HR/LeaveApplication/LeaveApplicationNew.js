import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getLeaveApplication,
  addLeaveApplication,
  getLeaveApplicationDropDown,
} from "../../../../redux/actions/HR/LeaveApplication";

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

class LeaveApplicationNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
     LeaveTypesList: [],
      EmployeeList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getLeaveApplicationDropDown(postData);
    this.props.getLeaveApplication(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (

      prevProps.earningMaster.error !== this.props.earningMaster.error &&
      this.props.earningMaster.error
    ) {
      toast.error(this.props.earningMaster.error);
    }
    if (
      prevProps.earningMaster.successMsg !== this.props.earningMaster.successMsg &&
      this.props.earningMaster.successMsg
    ) {
      toast.success(this.props.earningMaster.successMsg);
    }

    if (prevProps.earningMaster.LeaveTypeName !== this.props.earningMaster.LeaveTypeName) {
      this.setState({
       LeaveTypesList:
          this.props.earningMaster.LeaveTypeName&&
          this.props.earningMasterLeaveTypeName.length
            ? this.props.earningMaster.LeaveTypeName
            : [],
      });
    }

    if (
      prevProps.earningMaster.EmployeeList !== this.props.earningMaster.EmployeeList
    ) {
      this.setState({
        EmployeeList:
          this.props.earningMaster.EmployeeList &&
          this.props.earningMaster.EmployeeList.length
            ? this.props.earningMaster.EmployeeList
            : [],
      });
    }

    if (
      prevProps.earningMaster.data !== this.props.earningMaster.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.earningMaster.data &&
        this.props.earningMaster.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        AppNo:filterData?.AppNo,
        Date: filterData?.Date,
       EmpID:filterData?.EmpID,
       EmpName:filterData?.EmpName,
       EmpCode:filterData?.EmpCode,
       LeaveID:filterData?.LeaveID,
       FromDate:filterData?.FromDate,
       ToDate:filterData?.ToDate,
        LeaveBalance: filterData?.LeaveBalance,
        NoOfDays: filterData?.NoOfDays,
        Reason: filterData?.Reason,
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
    const { Date,  EmpID, EmpName,EmpCode,LeaveID ,FromDate,ToDate,LeaveBalance,NoOfDays,Reason,file, itemData } =
      this.state;

    if ( Date&&  EmpID&& EmpName&&EmpCode&&LeaveID &&FromDate&&ToDate&&LeaveBalance&&NoOfDays&&Reason&&file&& itemData) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
       
          EmpID, 
          EmpName,
          EmpCode,
          LeaveID ,
          FromDate,
          ToDate,
          LeaveBalance,
          NoOfDays,
          Reason,
          file, 
          itemData ,
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
        await this.props.addLeaveApplication({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addLeaveApplication(postData);
      }
      await this.resetState();
      await history.push("/HR/LeaveApplication");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, EmployeeList,LeaveTypesList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Leave Application</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/LeaveApplication")}
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
                     // bsSize="sm"
                     type="text"
                     value={this.state.EmpCode ? this.state.EmpCode : ""}
                     onChange={(e) =>
                       this.setState({ EmpCode: e.target.value })
                     }
                     name="EmpCode"
                     id="EmpCode"
                     placeholder="Employee Code"
                     className={`form-control form-control-sm ${
                       btnFlg && !this.state?.EmpCode ? "invalid-input" : ""
                     }`}
                   />
                   {btnFlg && !this.state?.EmpCode && <ErrorText />}
               
               
                   </Col>
           
              </FormGroup>
              <FormGroup row>
             
              
                <Col>
                 
                 <Label>Leave Balance</Label>
                   <Input
                     // bsSize="sm"
                     type="text"
                     value={this.state.LeaveBalance ? this.state.LeaveBalance : ""}
                     onChange={(e) =>
                       this.setState({ LeaveBalance: e.target.value })
                     }
                     name="LeaveBalance"
                     id="LeaveBalance"
                     placeholder="Amount"
                     className={`form-control form-control-sm ${
                       btnFlg && !this.state?.LeaveBalance ? "invalid-input" : ""
                     }`}
                   />
                   {btnFlg && !this.state?.LeaveBalance && <ErrorText />}
               
               
                   </Col>

                   <Col>
                  <Label>Select Leave type</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="LeaveIDSelect"
                    name="LeaveIDSelect"
                    value={this.state?.LeaveID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.LeaveID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        LeaveID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Leave Type</option>
                    {LeaveTypesList &&
                     LeaveTypesList?.length > 0 &&
                     LeaveTypesList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.LeaveTypeName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.LeaveID&& <ErrorText />}
                </Col>

           
              </FormGroup>



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
              
              <Label></Label>
                <Input
                  // bsSize="sm"
                  type="text"
                  value={this.state.EmployeeCode ? this.state.EmployeeCode : ""}
                  onChange={(e) =>
                    this.setState({ EmployeeCode: e.target.value })
                  }
                  name="EmployeeCode"
                  id="EmployeeCode"
                  placeholder=""
                  className={`form-control form-control-sm ${
                    btnFlg && !this.state?.EmployeeCode ? "invalid-input" : ""
                  }`}
                />
                {btnFlg && !this.state?.EmployeeCode && <ErrorText />}
            
            
                </Col>


        
           </FormGroup>
        
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
              
              <Label></Label>
                <Input
                  // bsSize="sm"
                  type="text"
                  value={this.state.EmployeeCode ? this.state.TotalLeave : ""}
                  onChange={(e) =>
                    this.setState({ TotalLeave: e.target.value })
                  }
                  name="EmployeeCode"
                  id="EmployeeCode"
                  placeholder=""
                  className={`form-control form-control-sm ${
                    btnFlg && !this.state?.EmployeeCode ? "invalid-input" : ""
                  }`}
                />
                {btnFlg && !this.state?.EmployeeCode && <ErrorText />}
            
            
                </Col>

           </FormGroup>
           <FormGroup row>
             
              
             <Col>
              
              <Label>No of days</Label>
                <Input
                  // bsSize="sm"
                  type="text"
                  value={this.state.TotalLeave ? this.state.TotalLeave : ""}
                  onChange={(e) =>
                    this.setState({ TotalLeave: e.target.value })
                  }
                  name="TotalLeave"
                  id="TotalLeave"
                  placeholder="No of days"
                  className={`form-control form-control-sm ${
                    btnFlg && !this.state?.TotalLeave ? "invalid-input" : ""
                  }`}
                />
                {btnFlg && !this.state?.TotalLeave && <ErrorText />}
            
            
                </Col>

                <Col>
              
              <Label>Reason</Label>
                <Input
                  // bsSize="sm"
                  type="text"
                  value={this.state.Remarks ? this.state.Remarks : ""}
                  onChange={(e) =>
                    this.setState({ Remarks: e.target.value })
                  }
                  name="Remarks"
                  id="Remarks"
                  placeholder="Reason"
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
    earningMaster: state.earningMaster,
  };
};

export default connect(mapStateToProps, {
  getLeaveApplication,
  getLeaveApplicationDropDown,
  addLeaveApplication,
})(LeaveApplicationNew);
