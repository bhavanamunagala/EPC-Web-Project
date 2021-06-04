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
  getRoom,
  getRoomMetaData,
  addRoom,
} from "../../../../redux/actions/Administration/room";
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

class RoomNewView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      CountryID: "",
      successMsg: "",
      deleteAlert: false,
      FlatName: "",
      BlockName: "",
      ProjectID: "",
      Address: "",
      itemData: null,
      RentAgreement: null,
      btnFlg: false,
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
    this.props.getRoom(postData);
    this.props.getRoomMetaData(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.room.error !== this.props.room.error &&
      this.props.room.error
    ) {
      toast.error(this.props.room.error);
    }
    if (
      prevProps.room.successMsg !== this.props.room.successMsg &&
      this.props.room.successMsg
    ) {
      toast.success(this.props.room.successMsg);
    }
    if (prevProps.room.data !== this.props.room.data) {
      this.setState({
        response:
          this.props.room.data && this.props.room.data.length
            ? this.props.room.data
            : [],
        random: this.props.room.random,
      });
    }
    if (prevProps.room.projectList !== this.props.room.projectList) {
      let ProjectData = [];
      this.props.room.projectList &&
        this.props.room.projectList.forEach((Project) => {
          ProjectData.push({
            value: Project.IDNumber,
            label: Project.ProjectName,
          });
        });
      this.setState({
        projectList:
          this.props.room.projectList && this.props.room.projectList.length
            ? ProjectData
            : [],
      });
    }

    if (prevProps.room.countryList !== this.props.room.countryList) {
      let countryData = [];
      this.props.room.countryList.forEach((item) => {
        countryData.push({ value: item.IDNumber, label: item.CountryName });
      });
      this.setState({
        countryList:
          this.props.room.countryList && this.props.room.countryList.length
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

    // for Edit Data
    if (
      prevProps.room.data !== this.props.room.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.room.data &&
        this.props.room.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.props.getStateData({ CountryID: filterData?.CountryID });
      this.props.getDistrict({ StateID: filterData?.StateID });
      this.props.getCity({ CityID: filterData?.cityID });
      this.setState({ itemData: filterData });
      this.setState({
        FlatName: filterData?.FlatName,
        BlockName: filterData?.BlockName,
        Address: filterData?.Address,
        ProjectID: filterData?.ProjectID,
        city: filterData?.CityID,
        state: filterData?.StateID,
        country: filterData?.CountryID,
        district: filterData?.DistrictID,
        PanNo: filterData?.PanNo,
        RentAgreement: filterData?.RentAgreement === 1 ? true : false,
        EffectiveDate: filterData?.EffectiveDate,
        Rent: filterData?.Rent,
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
      FlatName,
      BlockName,
      ProjectID,
      Address,
      itemData,
      city,
      state,
      district,
      country,
      PanNo,
      RentAgreement,
      EffectiveDate,
      Rent,
      Remarks,
    } = this.state;
    if (
      FlatName &&
      BlockName &&
      ProjectID &&
      Address &&
      city &&
      state &&
      district &&
      country &&
      PanNo &&
      EffectiveDate &&
      Rent
    ) {
      let postData = {
        FlatName,
        BlockName,
        ProjectID: ProjectID,
        Address,
        CityID: city,
        DistrictID: district,
        StateID: state,
        CountryID: country,
        PanNo,
        RentAgreement: RentAgreement ? 1 : 0,
        CreatedDate: history?.location?.state?.id
          ? itemData?.CreatedDate
          : moment(),
        EffectiveDate:
          typeof EffectiveDate === "object"
            ? EffectiveDate?.[0]
            : itemData?.EffectiveDate,
        Rent,
        Remarks,
      };
      if (history?.location?.state?.id) {
        await this.props.addRoom({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addRoom(postData);
        await this.resetState();
      }
      await history.push("/Administrator/RoomMaster");
    }
  };

  resetState = () => {
    this.setState({
      FlatName: "",
      BlockName: "",
      ProjectID: "",
      Address: "",
      Remarks: "",
      itemData: null,
      projectStatusList: [],
      userList: [],
      ProjectStartDate: null,
      Deadline: null,
      city: null,
      state: null,
      country: null,
      district: null,
      status: null,
      Rent: "",
      PanNo: "",
      EffectiveDate: null,
      RentAgreement: null,
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Room Master</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Administrator/RoomMaster")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col
                  className={
                    btnFlg && !this.state?.ProjectID ? "invalid-input" : ""
                  }
                >
                  <Label>Project</Label>
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ ProjectID: e })}
                    value={this.state.ProjectID}
                    name="sort"
                    options={this.state.projectList}
                    placeholder="Select Project"
                  /> */}
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="ProjectIDSelect"
                    name="ProjectIDSelect"
                    value={this.state?.ProjectID}
                    className="p-0 pl-1"
                    onChange={(e) => {
                      this.setState({
                        ProjectID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Project</option>
                    {this.state.projectList &&
                      this.state.projectList?.length > 0 &&
                      this.state.projectList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.ProjectID && <ErrorText />}
                </Col>

                <Col>
                  <Label>Flat Name</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.FlatName}
                    onChange={(e) => this.onChange(e, "FlatName")}
                    name="name"
                    id="name"
                    placeholder="Flat Name"
                    className={
                      btnFlg &&
                      (!this.state.FlatName || this.state.FlatName === "") &&
                      "invalid-input"
                    }
                  />
                  {btnFlg &&
                    (!this.state.FlatName || this.state.FlatName === "") && (
                      <ErrorText />
                    )}
                </Col>

                <Col>
                  <Label>Block Name</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.BlockName}
                    onChange={(e) => this.onChange(e, "BlockName")}
                    name="name"
                    id="name"
                    placeholder="Block Name"
                    className={
                      btnFlg &&
                      (!this.state.BlockName || this.state.BlockName === "") &&
                      "invalid-input"
                    }
                  />
                  {btnFlg &&
                    (!this.state.BlockName || this.state.BlockName === "") && (
                      <ErrorText />
                    )}
                </Col>

                <Col>
                  <Label>Address</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.Address}
                    onChange={(e) => this.onChange(e, "Address")}
                    name="name"
                    id="name"
                    placeholder="Address"
                    className={
                      btnFlg &&
                      (!this.state.Address || this.state.Address === "") &&
                      "invalid-input"
                    }
                  />
                  {btnFlg &&
                    (!this.state.Address || this.state.Address === "") && (
                      <ErrorText />
                    )}
                </Col>
              </FormGroup>
              <FormGroup row>
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
                  <Label>PanNo</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.PanNo}
                    onChange={(e) => this.onChange(e, "PanNo")}
                    name="PANno"
                    id="PANno"
                    placeholder="PanNo"
                    className={
                      btnFlg &&
                      (!this.state.PanNo || this.state.PanNo === "") &&
                      "invalid-input"
                    }
                  />
                  {btnFlg && (!this.state.PanNo || this.state.PanNo === "") && (
                    <ErrorText />
                  )}
                </Col>

                <Col>
                  <Label>Rent Agreement</Label>
                  <FormGroup row>
                    <FormGroup check inline>
                      <Input
                        size="sm"
                        type="radio"
                        name="RentAgreement"
                        onChange={(e) =>
                          this.setState({
                            RentAgreement: true,
                          })
                        }
                        checked={this.state.RentAgreement}
                      />
                      <Label className="mb-0"> Yes</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        size="sm"
                        type="radio"
                        name="RentAgreement"
                        onChange={(e) =>
                          this.setState({
                            RentAgreement: false,
                          })
                        }
                        checked={!this.state.RentAgreement}
                      />
                      <Label className="mb-0">No</Label>
                    </FormGroup>
                  </FormGroup>

                  {/* <Label className="d-block mb-1">Rent Agreement</Label>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type="radio"
                        className="mr-1"
                        onChange={(e) =>
                          this.setState({
                            RentAgreement: true,
                          })
                        }
                        checked={this.state.RentAgreement}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type="radio"
                        className="mr-1"
                        onChange={(e) =>
                          this.setState({
                            RentAgreement: false,
                          })
                        }
                        checked={!this.state.RentAgreement}
                      />
                      No
                    </Label>
                  </FormGroup> */}
                </Col>

                <Col
                  className={
                    btnFlg && !this.state?.EffectiveDate ? "invalid-input" : ""
                  }
                >
                  <Label>Effective Date</Label>
                  <Flatpickr
                    value={this.state.EffectiveDate}
                    onChange={(date) => {
                      this.setState({ EffectiveDate: date });
                    }}
                    placeholder="Effective Date"
                    className="form-control form-control-sm"
                  />
                  {btnFlg && !this.state?.EffectiveDate && <ErrorText />}
                </Col>

                <Col>
                  <Label>Rent</Label>
                  <Input
                    bsSize="sm"
                    type="number"
                    value={this.state.Rent}
                    onChange={(e) => this.onChange(e, "Rent")}
                    name="rent"
                    id="rent"
                    placeholder="Rent"
                    className={
                      btnFlg && (!this.state.Rent || this.state.Rent === "")
                        ? "invalid-input"
                        : ""
                    }
                  />
                  {btnFlg && (!this.state.Rent || this.state.Rent === "") && (
                    <ErrorText />
                  )}
                </Col>
                <Col>
                  <Label>Remarks</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.Remarks}
                    onChange={(e) => this.onChange(e, "Remarks")}
                    name="remark"
                    id="remark"
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
                    className="mr-1"
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
    room: state.room,
  };
};

export default connect(mapStateToProps, {
  getStateData,
  getDistrict,
  getCity,
  getRoom,
  getRoomMetaData,
  addRoom,
})(RoomNewView);
