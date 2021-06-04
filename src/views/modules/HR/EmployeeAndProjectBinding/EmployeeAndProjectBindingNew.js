import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getProjectEmpMaster,
  addProjectEmpMaster,
  getProjectEmpMasterDropDown,
} from "../../../../redux/actions/HR/EmployeeAndProjectBinding";

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

class EmployeeAndProjectBindingNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      PersonList: [],
      ProjectList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getProjectEmpMasterDropDown(postData);
    this.props.getProjectEmpMaster(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.projectEmpMaster.error !== this.props.projectEmpMaster.error &&
      this.props.projectEmpMaster.error
    ) {
      toast.error(this.props.projectEmpMaster.error);
    }
    if (
      prevProps.projectEmpMaster.successMsg !== this.props.projectEmpMaster.successMsg &&
      this.props.projectEmpMaster.successMsg
    ) {
      toast.success(this.props.projectEmpMaster.successMsg);
    }

    if (prevProps.projectEmpMaster.PersonList !== this.props.projectEmpMaster.PersonList) {
      this.setState({
        PersonList:
          this.props.projectEmpMaster.PersonList &&
          this.props.projectEmpMaster.PersonList.length
            ? this.props.projectEmpMaster.PersonList
            : [],
      });
    }

    if (
      prevProps.projectEmpMaster.ProjectList !== this.props.projectEmpMaster.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.projectEmpMaster.ProjectList &&
          this.props.projectEmpMaster.ProjectList.length
            ? this.props.projectEmpMaster.ProjectList
            : [],
      });
    }

    if (
      prevProps.projectEmpMaster.data !== this.props.projectEmpMaster.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.projectEmpMaster.data &&
        this.props.projectEmpMaster.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        ProjectStatusID: filterData?.ProjectStatusID,
        ProjectID: filterData?.ProjectID,
        ProjectName: filterData?.ProjectName,
   
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
    const { Date,  ProjectID,ResponsiblePerson, ProjectName,ProjectStatusID, file, itemData } =
      this.state;

    if (Date&&  ProjectID&& ResponsiblePerson &&ProjectName&& ProjectStatusID&& file&& itemData ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
     
        ProjectID,
        ProjectStatusID,
        ProjectName,
        ResponsiblePerson,

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
        await this.props.addProjectEmpMaster({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addProjectEmpMaster(postData);
      }
      await this.resetState();
      await history.push("/HR/EmployeeAndProjectBinding");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, ProjectList, PersonList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Project Wise Employee Binding</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/EmployeeAndProjectBinding")}
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
                  <Label>Project</Label>
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
                    {ProjectList &&
                      ProjectList?.length > 0 &&
                      ProjectList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.ProjectName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.ProjectID && <ErrorText />}
                </Col>

                <Col>
                  <Label>Responsible Person</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="ProjectStatusSelect"
                    name="ProjectStatusIDSelect"
                    value={this.state?.ProjectStatusIDID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.ProjectStatusID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        ProjectStatusID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Responsible Person</option>
                    {PersonList &&
                      PersonList?.length > 0 &&
                      PersonList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.ResponsiblePerson}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.ProjectStatusID && <ErrorText />}
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
    projectEmpMaster: state.projectEmpMaster,
  };
};

export default connect(mapStateToProps, {
  getProjectEmpMaster,
  getProjectEmpMasterDropDown,
  addProjectEmpMaster,
})(EmployeeAndProjectBindingNew);
