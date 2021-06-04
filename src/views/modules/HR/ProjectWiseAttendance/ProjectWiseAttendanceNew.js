import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getProjectAttendanceMaster,
  addProjectAttendanceMaster,
  getProjectAttendanceMasterDropDown,
} from "../../../../redux/actions/HR/ProjectWiseAttendance";

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

class ProjectWiseAttendanceNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      response: [],
      file: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getProjectAttendanceMasterDropDown(postData);
    this.props.getProjectAttendanceMaster(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.projectAttendanceMaster.error !== this.props.projectAttendanceMaster.error &&
      this.props.projectAttendanceMaster.error
    ) {
      toast.error(this.props.projectAttendanceMaster.error);
    }
    if (
      prevProps.projectAttendanceMaster.successMsg !== this.props.projectAttendanceMaster.successMsg &&
      this.props.projectAttendanceMaster.successMsg
    ) {
      toast.success(this.props.projectAttendanceMaster.successMsg);
    }

 

    if (
      prevProps.projectAttendanceMaster.ProjectList !== this.props.projectAttendanceMaster.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.projectAttendanceMaster.ProjectList &&
          this.props.projectAttendanceMaster.ProjectList.length
            ? this.props.projectAttendanceMaster.ProjectList
            : [],
      });
    }
   
    if (prevProps.projectAttendanceMaster.data !== this.props.projectAttendanceMaster.data) {
      this.setState({
        response:
          this.props.projectAttendanceMaster.data && this.props.projectAttendanceMaster.data.length
            ? this.props.projectAttendanceMaster.data
            : [],
            random: this.props.projectAttendanceMaster.random,
      });
    }

    if (
      prevProps.projectAttendanceMaster.data !== this.props.projectAttendanceMaster.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;

      const filterData =
        this.props.projectAttendanceMaster.data &&
        this.props.projectAttendanceMaster.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        parentIDNumber: filterData?.IDNumber,
        OnDate: filterData?.OnDate,
        ProjectID: filterData?.ProjectID,
        ProjectName: filterData?.ProjectName,
        StartDate: filterData?.StartDate,
        EndDate: filterData?.EndDate
    
    
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
    const { OnDate, ProjectID,  StartDate,
      EndDate,ProjectName, file, itemData } =
      this.state;

    if (OnDate  && ProjectID &&ProjectName&&StartDate&&EndDate) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
          StartDate:
          typeof StartDate === "object"
            ? moment(StartDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.StartDate,
        EndDate:
          typeof EndDate === "object"
            ? moment(EndDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.EndDate,
      
        ProjectID,
        ProjectName,
  
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
        await this.props.addProjectAttendanceMaster({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addProjectAttendanceMaster(postData);
      }
      await this.resetState();
      await history.push("/HR/ProjectAttendanceMaster");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  toggleModal = () =>
  this.setState({
    modal: !this.state.modal,
  });

  render() {
    const { btnFlg, file, } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Project Wise Attendance</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/ProjectWiseAttendance")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
           
                <Col>
                <Input
                    // bsSize="sm"
                    type="text"
                    value={this.state.ProjectName ? this.state.ProjectName : ""}
                    onChange={(e) =>
                      this.setState({ ProjectName: e.target.value })
                    }
                    name="ProjectName"
                    id="ProjectName"
                    placeholder=""
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.ProjectName ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.ProjectName && <ErrorText />}
               
            

                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="ProjectIDSelect"
                    name="ProjectIDSelect"
                    value={this.state?.ProjectID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.ProjectID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        ProjectID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Project</option>
                    {this.state.ProjectList &&
                      this.state.ProjectList?.length > 0 &&
                      this.state.ProjectList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.ProjectName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.ProjectID && <ErrorText />}
                
                </Col>

                <Col>
                  <Label>Start Date</Label>
                  <Flatpickr
                    value={this.state.StartDate}
                    onChange={(date) => {
                      this.setState({ StartDate: date });
                    }}
                    placeholder="On Date"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.StartDate ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.StartDate && <ErrorText />}
                </Col>
                <Col>
                  <Label>End Date</Label>
                  <Flatpickr
                    value={this.state.EndDate}
                    onChange={(date) => {
                      this.setState({ EndDate: date });
                    }}
                    placeholder="On Date"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.EndDate ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.EndDate && <ErrorText />}
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
    projectAttendanceMaster: state.projectAttendanceMaster,
  };
};

export default connect(mapStateToProps, {
  getProjectAttendanceMaster,
  getProjectAttendanceMasterDropDown,
  addProjectAttendanceMaster,
})(ProjectWiseAttendanceNew);
