import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import { getStateData } from "../../../../redux/actions/Administration/state";
import { getDistrict } from "../../../../redux/actions/Administration/district";
import { getCity } from "../../../../redux/actions/Administration/city";
import {
  getProject,
  addProject,
  getProjectMetaData,
} from "../../../../redux/actions/Administration/project";
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

class ProjectNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CountryID: "",
      successMsg: "",
      deleteAlert: false,
      CountryName: "",
      Code: "",
      ProjectName: "",
      Address: "",
      ResponsiblePerson: 0,
      status: 0,
      country: 0,
      state: 0,
      district: 0,
      city: 0,
      Remarks: "",
      itemData: null,
      stateList: [],
      countryList: [],
      cityList: [],
      districtList: [],
      projectStatusList: [],
      userList: [],
      filteredcityList: [],
      filtereddistrictList: [],
      filteredstateList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getProject(postData);
    // this.props.getCountryList(postData);
    // this.props.getStateData(postData);
    // this.props.getCityData(postData);
    // this.props.getDistrictData(postData);
    this.props.getProjectMetaData();
    // this.props.getUserData(postData);
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

    if (prevProps.project.userList !== this.props.project.userList) {
      let userData = [];
      this.props.project.userList.forEach((item) => {
        userData.push({ value: item.IDNumber, label: item.EmpName });
      });
      this.setState({
        userList:
          this.props.project.userList && this.props.project.userList.length
            ? userData
            : [],
      });
    }

    if (prevProps.project.countryList !== this.props.project.countryList) {
      let countryData = [];
      this.props.project.countryList.forEach((item) => {
        countryData.push({ value: item.IDNumber, label: item.CountryName });
      });
      this.setState({
        countryList:
          this.props.project.countryList &&
          this.props.project.countryList.length
            ? countryData
            : [],
      });
    }
    if (prevProps.state.stateList !== this.props.state.stateList) {
      let stateData = [];
      this.props.state.stateList.forEach((item) => {
        stateData.push({
          value: item.IDNumber,
          label: item.StateName,
          CountryID: item.CountryID,
        });
      });
      this.setState({
        stateList:
          this.props.state.stateList && this.props.state.stateList.length
            ? stateData
            : [],
      });
    }
    if (prevProps.district.districtList !== this.props.district.districtList) {
      let districtData = [];
      this.props.district.districtList.forEach((item) => {
        districtData.push({
          value: item.IDNumber,
          label: item.DistrictName,
          StateID: item.StateID,
        });
      });
      this.setState({
        districtList:
          this.props.district.districtList &&
          this.props.district.districtList.length
            ? districtData
            : [],
      });
    }
    if (prevProps.city.cityList !== this.props.city.cityList) {
      let cityData = [];
      this.props.city.cityList.forEach((item) => {
        cityData.push({
          value: item.IDNumber,
          label: item.CityName,
          DistrictID: item.DistrictID,
        });
      });
      this.setState({
        cityList:
          this.props.city.cityList && this.props.city.cityList.length
            ? cityData
            : [],
      });
    }
    if (
      prevProps.project.projectStatusList !==
      this.props.project.projectStatusList
    ) {
      let projectStatusData = [];
      this.props.project.projectStatusList.forEach((item) => {
        projectStatusData.push({
          value: item.IDNumber,
          label: item.ProjectStatusName,
        });
      });
      this.setState({
        projectStatusList:
          this.props.project.projectStatusList &&
          this.props.project.projectStatusList.length
            ? projectStatusData
            : [],
      });
    }
    if (
      prevProps.project.projectList !== this.props.project.projectList &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.project.projectList &&
        this.props.project.projectList.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.props.getStateData({ CountryID: filterData?.CountryID });
      this.props.getDistrict({ StateID: filterData?.StateID });
      this.props.getCity({ CityID: filterData?.cityID });

      this.setState({ itemData: filterData });
      this.setState({
        Code: filterData?.Code,
        ProjectName: filterData?.ProjectName,
        Address: filterData?.Address,
        ResponsiblePerson: filterData?.ResponsiblePerson,
        Remarks: filterData?.Remarks,
        city: filterData?.CityID,
        state: filterData?.StateID,
        country: filterData?.CountryID,
        district: filterData?.DistrictID,
        ProjectStartDate: filterData?.ProjectStartDate,
        Deadline: filterData?.Deadline,
        status: filterData?.ProjectStatusID,
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
      Code,
      ProjectName,
      Address,
      ResponsiblePerson,
      Remarks,
      itemData,
      city,
      state,
      district,
      country,
      ProjectStartDate,
      Deadline,
      status,
    } = this.state;
    if (
      Code &&
      ProjectName &&
      Address &&
      ResponsiblePerson &&
      city &&
      state &&
      district &&
      country &&
      ProjectStartDate &&
      Deadline &&
      status
    ) {
      let postData = {
        Code,
        ProjectName,
        Address,
        CityID: city,
        DistrictID: district,
        StateID: state,
        CountryID: country,
        ProjectStartDate:
          typeof ProjectStartDate === "object"
            ? ProjectStartDate?.[0]
            : itemData?.ProjectStartDate,
        Deadline:
          typeof Deadline === "object" ? Deadline?.[0] : itemData?.Deadline,
        ProjectStatusID: status,
        ResponsiblePerson: ResponsiblePerson,
        Remarks,
        CreatedDate: history?.location?.state?.id
          ? itemData?.CreatedDate
          : moment(),
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
      };
      if (history?.location?.state?.id) {
        await this.props.addProject({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addProject(postData);
        await this.resetState();
      }
      await history.push("/Administrator/ProjectMaster");
    }
  };

  resetState = () => {
    this.setState({
      CountryName: "",
      Code: "",
      ProjectName: "",
      Address: "",
      ResponsiblePerson: 0,
      Remarks: "",
      itemData: null,
      stateList: [],
      countryList: [],
      cityList: [],
      districtList: [],
      projectStatusList: [],
      userList: [],
      ProjectStartDate: null,
      Deadline: null,
      city: 0,
      state: 0,
      country: 0,
      district: 0,
      status: 0,
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Project Master</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Administrator/ProjectMaster")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col>
                  <Label>Code</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.Code}
                    onChange={(e) => this.onChange(e, "Code")}
                    name="Code"
                    id="Code"
                    placeholder="Code"
                    className={
                      btnFlg &&
                      (!this.state.Code || this.state.Code === "") &&
                      "invalid-input"
                    }
                  />
                  {btnFlg && (!this.state.Code || this.state.Code === "") && (
                    <ErrorText />
                  )}
                </Col>
                <Col>
                  <Label>Project Name</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.ProjectName}
                    onChange={(e) => this.onChange(e, "ProjectName")}
                    name="ProjectName"
                    id="ProjectName"
                    placeholder="Project Name"
                    className={
                      btnFlg &&
                      (!this.state.ProjectName || this.state.ProjectName === "")
                        ? "invalid-input"
                        : ""
                    }
                  />
                  {btnFlg &&
                    (!this.state.ProjectName ||
                      this.state.ProjectName === "") && <ErrorText />}
                </Col>
                <Col>
                  <Label>Project Start Date</Label>
                  <Flatpickr
                    value={this.state.ProjectStartDate}
                    onChange={(date) => {
                      this.setState({ ProjectStartDate: date });
                    }}
                    placeholder="Project Start Date"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.ProjectStartDate
                        ? "invalid-input"
                        : ""
                    }`}
                  />
                  {btnFlg && !this.state?.ProjectStartDate && <ErrorText />}
                </Col>
                <Col>
                  <Label>Deadline Date</Label>
                  <Flatpickr
                    value={this.state.Deadline}
                    onChange={(date) => {
                      this.setState({ Deadline: date });
                    }}
                    placeholder="Deadline Date"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Deadline ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.Deadline && <ErrorText />}
                </Col>
              </FormGroup>
              <FormGroup row>
                {/* <Col
                  className={
                    btnFlg && !this.state?.country?.value ? "invalid-input" : ""
                  }
                >
                  <Label>Country</Label>
                  <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) =>
                      this.setState({
                        country: e,
                        filteredstateList: this.state.stateList.filter(
                          (data) => data.CountryID === e.value
                        ),
                      })
                    }
                    value={this.state.country}
                    name="sort"
                    options={this.state.countryList}
                    placeholder="Country"
                  />
                  {btnFlg && !this.state?.country?.value && <ErrorText />}
                </Col>
                <Col
                  className={
                    btnFlg && !this.state?.state?.value ? "invalid-input" : ""
                  }
                >
                  <Label>State</Label>
                  <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) =>
                      this.setState({
                        state: e,
                        filtereddistrictList: this.state.districtList.filter(
                          (data) => data.StateID === e.value
                        ),
                      })
                    }
                    value={this.state.state}
                    name="sort"
                    options={this.state.filteredstateList}
                    placeholder="State"
                  />
                  {btnFlg && !this.state?.state?.value && <ErrorText />}
                </Col>

                <Col
                  className={
                    btnFlg && !this.state?.district?.value
                      ? "invalid-input"
                      : ""
                  }
                >
                  <Label>District</Label>
                  <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) =>
                      this.setState({
                        district: e,
                        filteredcityList: this.state.cityList.filter(
                          (data) => data.DistrictID === e.value
                        ),
                      })
                    }
                    value={this.state.district}
                    name="sort"
                    options={this.state.filtereddistrictList}
                    placeholder="District"
                  />
                  {btnFlg && !this.state?.district?.value && <ErrorText />}
                </Col>

                <Col
                  className={
                    btnFlg && !this.state?.city?.value ? "invalid-input" : ""
                  }
                >
                  <Label>City</Label>
                  <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ city: e })}
                    value={this.state.city}
                    name="sort"
                    options={this.state.filteredcityList}
                    placeholder="City"
                  />
                  {btnFlg && !this.state?.city?.value && <ErrorText />}
                </Col> */}
                <Col>
                  <Label>Country</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="countrySelect"
                    name="countrySelect"
                    value={this.state?.country}
                    className={`p-0 pl-1 ${
                      btnFlg && !this.state?.country ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.props.getStateData({
                        CountryID: parseInt(e.target.value),
                      });
                      this.setState({
                        country: parseInt(e.target.value),
                        stateList: [],
                        districtList: [],
                        cityList: [],
                        state: 0,
                        district: 0,
                        city: 0,
                      });
                    }}
                  >
                    <option value="0">Country</option>
                    {this.state.countryList?.length > 0 &&
                      this.state.countryList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.country && <ErrorText />}
                </Col>
                <Col>
                  <Label>State</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="stateSelect"
                    name="stateSelect"
                    value={this.state?.state}
                    className={`p-0 pl-1 ${
                      btnFlg && !this.state?.state ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.props.getDistrict({
                        StateID: parseInt(e.target.value),
                      });
                      this.setState({
                        state: parseInt(e.target.value),
                        districtList: [],
                        cityList: [],
                        district: 0,
                        city: 0,
                      });
                    }}
                  >
                    <option value="0">State</option>
                    {this.state.stateList &&
                      this.state.stateList?.length > 0 &&
                      this.state?.stateList.map((d, i) => {
                        return (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        );
                      })}
                  </CustomInput>
                  {btnFlg && !this.state?.state && <ErrorText />}
                </Col>
                <Col>
                  <Label>District</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="dsistrictSelect"
                    name="districtSelect"
                    value={this.state?.district}
                    className={`p-0 pl-1 ${
                      btnFlg && !this.state?.district ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.props.getCity({
                        DistrictID: parseInt(e.target.value),
                      });
                      this.setState({
                        district: parseInt(e.target.value),
                        cityList: [],
                        city: 0,
                      });
                    }}
                  >
                    <option value="0">District</option>
                    {this.state.districtList &&
                      this.state.districtList?.length > 0 &&
                      this.state.districtList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.district && <ErrorText />}
                </Col>
                <Col>
                  <Label>City</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="citySelect"
                    name="citySelect"
                    value={this.state?.city}
                    className={`p-0 pl-1 ${
                      btnFlg && !this.state?.city ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        city: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">City</option>
                    {this.state.cityList &&
                      this.state.cityList?.length > 0 &&
                      this.state.cityList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.city && <ErrorText />}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label>Address</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.Address}
                    onChange={(e) => this.onChange(e, "Address")}
                    name="Address"
                    id="Address"
                    placeholder="Address"
                    className={
                      btnFlg &&
                      (!this.state.Address || this.state.Address === "")
                        ? "invalid-input"
                        : ""
                    }
                  />
                  {btnFlg &&
                    (!this.state.Address || this.state.Address === "") && (
                      <ErrorText />
                    )}
                </Col>

                <Col>
                  <Label>Project Status</Label>
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ status: e })}
                    value={this.state.status}
                    name="sort"
                    options={this.state.projectStatusList}
                    placeholder="Project Status"
                  /> */}
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="statusSelect"
                    name="statusSelect"
                    value={this.state?.status}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.status === 0 ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        status: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Project Status</option>
                    {this.state.projectStatusList &&
                      this.state.projectStatusList?.length > 0 &&
                      this.state.projectStatusList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.status && <ErrorText />}
                </Col>

                <Col>
                  <Label>Responsible Person</Label>
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ ResponsiblePerson: e })}
                    value={this.state.ResponsiblePerson}
                    name="sort"
                    options={this.state.userList}
                    placeholder="Responsible Person"
                  /> */}
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="ResponsiblePersonSelect"
                    name="ResponsiblePersonSelect"
                    value={this.state?.ResponsiblePerson}
                    onChange={(e) => {
                      this.setState({
                        ResponsiblePerson: parseInt(e.target.value),
                      });
                    }}
                    className={`p-0 pl-1
                      ${
                        btnFlg && this.state?.ResponsiblePerson === 0
                          ? "invalid-input"
                          : ""
                      }`}
                  >
                    <option value="0">Responsible Person</option>
                    {this.state.userList &&
                      this.state.userList?.length > 0 &&
                      this.state.userList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.ResponsiblePerson && <ErrorText />}
                </Col>

                <Col>
                  <Label>Remarks</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.Remarks}
                    onChange={(e) => this.onChange(e, "Remarks")}
                    name="Remarks"
                    id="Remarks"
                    placeholder="Remarks"
                  />
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
    state: state.state,
    district: state.district,
    city: state.city,
    project: state.project,
  };
};

export default connect(mapStateToProps, {
  getStateData,
  getDistrict,
  getCity,
  getProject,
  addProject,
  getProjectMetaData,
})(ProjectNew);
