import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getLeaveMaster,
  addLeaveMaster,
  getLeaveMasterDropDown,
} from "../../../../redux/actions/HR/LeaveMaster";

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

class LeaveMasterNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      GenderList: [],
      LeaveTypeList:[]
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getLeaveMasterDropDown(postData);
    this.props.getLeaveMaster(postData);
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

    if (
      prevProps.earningMaster.GenderList !== this.props.earningMaster.GenderList
    ) {
      this.setState({
        GenderList:
          this.props.earningMaster.GenderList &&
          this.props.earningMaster.GenderList.length
            ? this.props.earningMaster.GenderList
            : [],
      });
    }
    if (
      prevProps.earningMaster.LeaveTypeList !== this.props.earningMaster.LeaveTypeList
    ) {
      this.setState({
        LeaveTypeList:
          this.props.earningMaster.LeaveTypeList &&
          this.props.earningMaster.LeaveTypeList.length
            ? this.props.earningMaster.LeaveTypeList
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
        LeaveCode: filterData?.LeaveCode,
        LeaveName: filterData?.LeaveName,
        TypeOfLeave: filterData?.TypeOfLeave,
        NoOfSpellPerYear: filterData?.NoOfSpellPerYear,
         NoOfDaysperAccumulation: filterData?.NoOfDaysperAccumulation,
       MaxLeave: filterData?.MaxLeave,
       MinLeave: filterData?.MinLeave,
       Gender: filterData?.Gender,



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
    const {LeaveCode,LeaveName,TypeOfLeave,NoOfSpellPerYear,NoOfDaysperAccumulation,MaxLeave,MinLeave,Gender, file, itemData } =
      this.state;

    if (LeaveCode&&LeaveName&&TypeOfLeave&&NoOfSpellPerYear&&NoOfDaysperAccumulation&&MaxLeave&&MinLeave&&Gender&& file&& itemData) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,

     
          LeaveCode,
          LeaveName,
          TypeOfLeave,
          NoOfSpellPerYear,
          NoOfDaysperAccumulation,
          MaxLeave,
          MinLeave,
          Gender,
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
        await this.props.addLeaveMaster({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addLeaveMaster(postData);
      }
      await this.resetState();
      await history.push("/HR/LeaveMaster");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, GenderList,LeaveTypeList} = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Leave Master</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/LeaveMaster")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
             
             
              <Col>
                  <Label>Leave Code</Label>
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
                      this.setState({LeaveCode: e.target.value })
                    }
                    name="LeaveCode"
                    id="LeaveCode"
                    placeholder="Leave Code"
                  />
                  {btnFlg && !this.state?.LeaveCode && <ErrorText />}
                </Col>
             
                <Col>
                  <Label>Leave Name</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.LeaveName
                        ? this.state.LeaveName
                        : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.LeaveName
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ LeaveName: e.target.value })
                    }
                    name="LeaveName"
                    id="LeaveName"
                    placeholder="Leave Name"
                  />
                  {btnFlg && !this.state?.LeaveName && <ErrorText />}
                </Col>

                <Col>
                  <Label>New Project</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="LeaveTypeIDSelect"
                    name="LeaveTypeIDSelect"
                    value={this.state?.LeaveTypeID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.LeaveTypeID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        LeaveTypeID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">New Project</option>
                    {LeaveTypeList &&
                      LeaveTypeList?.length > 0 &&
                      LeaveTypeList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.LeaveTypeName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.LeaveTypeID && <ErrorText />}
                </Col>

              </FormGroup>
            

              <FormGroup row>
             
             
             <Col>
                 <Label>No of Spell allowed per year</Label>
                 <Input
                   bsSize="sm"
                   type="text"
                   value={
                     this.state.NoOfSpellPerYear
                       ? this.state.NoOfSpellPerYear
                       : ""
                   }
                   className={`form-control form-control-sm ${
                     btnFlg && !this.state?.NoOfSpellPerYear
                       ? "invalid-input"
                       : ""
                   }`}
                   onChange={(e) =>
                     this.setState({ NoOfSpellPerYear: e.target.value })
                   }
                   name="NoOfSpellPerYear"
                   id="NoOfSpellPerYear"
                   
                 />
                 {btnFlg && !this.state?.Remarks && <ErrorText />}
               </Col>
            
               <Col>
                 <Label>No of days per year</Label>
                 <Input
                   bsSize="sm"
                   type="text"
                   value={
                     this.state.NoOfDaysperAccumulation
                       ? this.state.NoOfDaysperAccumulation
                       : ""
                   }
                   className={`form-control form-control-sm ${
                     btnFlg && !this.state?.NoOfDaysperAccumulation
                       ? "invalid-input"
                       : ""
                   }`}
                   onChange={(e) =>
                     this.setState({ NoOfDaysperAccumulation: e.target.value })
                   }
                   name="NoOfDaysperAccumulation"
                   id="NoOfDaysperAccumulation"
                  
                 />
                 {btnFlg && !this.state?.NoOfDaysperAccumulation && <ErrorText />}
               </Col>
             
             </FormGroup>
           
             <FormGroup row>
             
             
              <Col>
                  <Label>Maximum leave in a single spell/Application</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.MaxLeave
                        ? this.state.MaxLeave
                        : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.MaxLeave
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) =>
                      this.setState({MaxLeave: e.target.value })
                    }
                    name="MaxLeave"
                    id="MaxLeave"
                  
                  />
                  {btnFlg && !this.state?.MaxLeave && <ErrorText />}
                </Col>
             
                <Col>
                  <Label>Minimum leave in a single spell/Application</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.MinLeave
                        ? this.state.MinLeave
                        : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.MinLeave
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ MinLeave: e.target.value })
                    }
                    name="MinLeave"
                    id="MinLeave"
                  
                  />
                  {btnFlg && !this.state?.MinLeave && <ErrorText />}
                </Col>
              
              </FormGroup>
            
              <FormGroup row>
             
             
              <Col>
              <Label>Leave application to gender</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="LeaveApplicationgenderID"
                    name="LeaveApplicationgenderID"
                    value={this.state?.LeaveApplicationgenderID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.LeaveApplicationgenderID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        LeaveApplicationgenderID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Gender</option>
                    {GenderList &&
                      GenderList?.length > 0 &&
                      GenderList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.GenderName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.LeaveApplicationgenderID && <ErrorText />}
                
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
  getLeaveMaster,
  getLeaveMasterDropDown,
  addLeaveMaster,
})(LeaveMasterNew);
