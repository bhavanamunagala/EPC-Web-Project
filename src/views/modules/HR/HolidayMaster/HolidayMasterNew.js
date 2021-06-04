import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
//import {
 // getHolidayMaster,
  //addHolidayMaster,
  //getHolidayMasterDropDown,
//} from "../../../../redux/actions/HR/HolidayMaster";

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

class HolidayMasterNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      CardList: [],
      ProjectList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getHolidayMasterDropDown(postData);
    this.props.getHolidayMaster(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.project.error !== this.props.project.error &&
      this.props.project.error
    ) {
      toast.error(this.props.project.error);
    }
    if (
      prevProps.project.successMsg !== this.props.project.successMsg &&
      this.props.project.successMsg
    ) {
      toast.success(this.props.project.successMsg);
    }

    if (prevProps.project.CardList !== this.props.project.CardList) {
      this.setState({
        CardList:
          this.props.project.CardList &&
          this.props.project.CardList.length
            ? this.props.project.CardList
            : [],
      });
    }

    if (
      prevProps.project.ProjectList !== this.props.project.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.project.ProjectList &&
          this.props.project.ProjectList.length
            ? this.props.project.ProjectList
            : [],
      });
    }

    if (
      prevProps.project.data !== this.props.project.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.project.data &&
        this.props.project.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        CardID: filterData?.CardID,
        ProjectID: filterData?.ProjectID,
        Amount: filterData?.Amount,
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
    const { Date, CardID, ProjectID, Amount, Remarks, file, itemData } =
      this.state;

    if (Date && CardID && ProjectID && Amount) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
        CardID,
        ProjectID,
        Amount,
        Remarks,
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
        await this.props.addHolidayMaster({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addHolidayMaster(postData);
      }
      await this.resetState();
      await history.push("/HR/HolidayMaster");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, ProjectList, CardList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Leave Opening</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/HolidayMaster")}
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
                    <option value="0">Select Employee</option>
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
                 
                <Label>Employee Code</Label>
                  <Input
                    // bsSize="sm"
                    type="text"
                    value={this.state.EmployeeCode ? this.state.EmployeeCode : ""}
                    onChange={(e) =>
                      this.setState({ EmployeeCode: e.target.value })
                    }
                    name="EmployeeCode"
                    id="EmployeeCode"
                    placeholder="Employee Code"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.EmployeeCode ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.EmployeeCode && <ErrorText />}
              
              
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
    project: state.project,
  };
};

export default connect(mapStateToProps, {
  //getHolidayMaster,
  //getHolidayMasterDropDown,
  //addHolidayMaster,
})(HolidayMasterNew);
