import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getLeaveOpening,
  addLeaveOpening,
  getLeaveOpeningDropDown,
} from "../../../../redux/actions/HR/LeaveOpening";

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

class LeaveOpeningNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      EmployeeList: [],
     
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getLeaveOpeningDropDown(postData);
    this.props.getLeaveOpening(postData);
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

    if (prevProps.earningMaster.EmployeeList !== this.props.earningMaster.EmployeeList) {
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
  
        EmployeeID: filterData?.EmployeeID,
        EmpCode: filterData?.EmpCode,
        EmpName: filterData?.EmpName,
    
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
    const {  EmployeeID,EmpCode,EmpName, file, itemData } =
      this.state;

    if ( EmployeeID&&EmpCode&&EmpName &&file&& itemData) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
     EmployeeID,
     EmpName,
     EmpCode,
     itemData,
      
        file,
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
        await this.props.addLeaveOpening({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addLeaveOpening(postData);
      }
      await this.resetState();
      await history.push("/HR/LeaveOpening");
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
            <CardTitle>Leave Opening</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/LeaveOpening")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
               
                <Col>
                  <Label>Employee Name</Label>
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
  getLeaveOpening,
  getLeaveOpeningDropDown,
  addLeaveOpening,
})(LeaveOpeningNew);
