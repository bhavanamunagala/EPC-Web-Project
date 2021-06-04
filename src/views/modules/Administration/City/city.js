import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { Button, CustomInput, Input } from "reactstrap";
import { Edit, Trash } from "react-feather";
import "../../style.css";
import { getCountry } from "../../../../redux/actions/Administration/country";
import { getStateData } from "../../../../redux/actions/Administration/state";
import { getDistrict } from "../../../../redux/actions/Administration/district";
import {
  getCity,
  addCity,
  deleteCity,
} from "../../../../redux/actions/Administration/city";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Form,
  Label,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import ErrorText from "../../../../views/ui-elements/text-utilities/ErrorText";
import { CustomHeader } from "../../../components/CustomHeader";
import DataTable from "react-data-table-component";
import { hasRight } from "../../../../constant/commonDS";

class CityView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      countryList: [],
      allStateList: [],
      allCountryData: [],
      SearchText: "",
      successMsg: "",
      CountryID: { value: 0, label: "Select Country" },
      StateID: { value: 0, label: "Select State" },
      DistrictID: { value: 0, label: "Select District" },
      District: "",
      deleteAlert: false,
      CityName: "",
      btnFlg: false,
      districtList: [],
      allDistrictList: [],
      filtereddistrictList: [],
      filteredstateList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCountry(postData);
    this.props.getStateData(postData);
    this.props.getDistrict(postData);
    this.props.getCity(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.district.error && props.district.error !== state.error) {
      toast.error(props.district.error);
      return {
        error: props.district.error,
      };
    }

    if (props.country && props.country.data && props.country.data.length) {
      if (
        Object.keys(props.country.data).every(
          (p) => props.country.data[p] !== state.allCountryData[p]
        )
      ) {
        let countryData = [];
        props.country.data.forEach((item) => {
          countryData.push({ value: item.IDNumber, label: item.CountryName });
        });

        return {
          countryList:
            props.country.data && props.country.data.length ? countryData : [],
          allCountryData:
            props.country.data && props.country.data.length
              ? props.country.data
              : [],
        };
      }
    }

    if (props.state && props.state.stateList && props.state.stateList.length) {
      if (
        Object.keys(props.state.stateList).every(
          (p) => props.state.stateList[p] !== state.allStateList[p]
        )
      ) {
        let stateData = [];
        props.state.stateList.forEach((item) => {
          stateData.push({
            value: item.IDNumber,
            label: item.StateName,
            CountryID: item.CountryID,
          });
        });
        return {
          stateList:
            props.state.stateList && props.state.stateList.length
              ? stateData
              : [],
          allStateList:
            props.state.stateList && props.state.stateList.length
              ? props.state.stateList
              : [],
        };
      }
    }

    if (props.district && props.district.districtList) {
      if (
        Object.keys(props.district.districtList).every(
          (p) => props.district.districtList[p] !== state.allDistrictList[p]
        )
      ) {
        let districtData = [];
        props.district.districtList.forEach((item) => {
          districtData.push({
            value: item.IDNumber,
            label: item.DistrictName,
            StateID: item.StateID,
          });
        });
        return {
          districtList:
            props.district.districtList && props.district.districtList.length
              ? districtData
              : [],
          allDistrictList:
            props.district.districtList && props.district.districtList.length
              ? props.district.districtList
              : [],
        };
      }
    }

    if (props.city && props.city.cityList) {
      let successMsg = "";
      if (
        Object.keys(props.city.cityList).every(
          (p) => props.city.cityList[p] !== state.response[p]
        )
      ) {
        if (props.city.random !== state.random && props.city.successMsg) {
          successMsg = props.city.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.city.cityList && props.city.cityList.length
              ? props.city.cityList
              : [],
          successMsg: successMsg,
          random: props.state.random,
        };
      }
    }

    // Return null if the state hasn't changed
    return null;
  }

  editRow = (row) => {
    this.setState({
      country: row.CountryID,
      state: row.StateID,
      CityName: row.CityName,
      district: row.DistrictID,
      CityID: row.IDNumber,
    });
  };

  onCountryChange = (data) => {
    this.setState({
      CountryID: { value: data.value, label: data.label },
      filteredstateList: this.state.stateList.filter(
        (item) => item.CountryID === data.value
      ),
    });
  };

  onStateChange = (data) => {
    this.setState({
      StateID: { value: data.value, label: data.label },
      filtereddistrictList: this.state.districtList.filter(
        (item) => item.StateID === data.value
      ),
    });
  };

  onChange = (event) => {
    let pattern = /^[a-zA-Z ]*$/;
    if (pattern.test(event.target.value)) {
      this.setState({ CityName: event.target.value });
    }
  };

  onDistrictChange = (data) => {
    this.setState({ DistrictID: { value: data.value, label: data.label } });
  };

  handleSubmit = (e) => {
    this.setState({
      btnFlg: true,
    });
    e.preventDefault();
    if (
      this.state.country &&
      this.state.state &&
      this.state.CityName &&
      this.state.district
    ) {
      let postData = {
        IDNumber: this.state.CityID ? this.state.CityID : 0,
        DistrictID: this.state.district,
        StateID: this.state.state,
        CityName: this.state.CityName,
        CountryID: this.state.country,
      };
      this.props.addCity(postData);
      this.resetState();
    }
  };
  resetState = () => {
    this.setState({
      country: 0,
      district: 0,
      state: 0,
      CityName: "",
      btnFlg: false,
    });
  };
  deleteRow = (row) => {
    this.setState({ deleteCity: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  deleteState = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteCity.IDNumber,
      CityName: this.state.deleteCity.CityName,
    };
    this.props.deleteCity(postData);
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getCity(postData);
  };

  render() {
    let Access = hasRight("CITYMST");
    let columns;
    if (Access.AllowUpdate || Access.AllowDelete) {
      columns = [
        {
          name: "Actions",
          selector: "actions",
          width: "7%",
          cell: (rowData) =>
            rowData && (
              <>
                {Access.AllowUpdate ? (
                  <Edit
                    className="cursor-pointer mr-1 text-warning"
                    size={20}
                    onClick={() => {
                      this.editRow(rowData);
                    }}
                  />
                ) : (
                  ""
                )}
                {Access.AllowDelete ? (
                  <Trash
                    className="cursor-pointer text-danger"
                    size={20}
                    onClick={() => {
                      this.deleteRow(rowData);
                    }}
                  />
                ) : (
                  ""
                )}
              </>
            ),
        },
        {
          name: "Country Name",
          selector: "CountryName",
          sortable: true,
          width: "13%",
        },
        {
          name: "State Name",
          selector: "StateName",
          sortable: true,
          width: "13%",
        },
        {
          name: "District Name",
          selector: "DistrictName",
          sortable: true,
          width: "13%",
        },
        {
          name: "City Name",
          selector: "CityName",
          sortable: true,
          width: "13%",
        },
      ];
    } else {
      columns = [
        {
          name: "Country Name",
          selector: "CountryName",
          sortable: true,
          width: "13%",
        },
        {
          name: "State Name",
          selector: "StateName",
          sortable: true,
          width: "13%",
        },
        {
          name: "District Name",
          selector: "DistrictName",
          sortable: true,
          width: "13%",
        },
        {
          name: "City Name",
          selector: "CityName",
          sortable: true,
          width: "13%",
        },
      ];
    }
    const { btnFlg, response, SearchText } = this.state;
    return (
      <React.Fragment>
        {Access.AllowInsert || Access.AllowUpdate ? (
          <Card>
            <CardHeader>
              <CardTitle>City Master</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
              <Form className="country">
                <FormGroup row className="align-items-center">
                  <Col
                    sm="2"
                    className={`${
                      btnFlg && this.state.country === 0 ? "invalid-input" : ""
                    }`}
                  >
                    <Label>Country</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="countrySelect"
                      name="countrySelect"
                      value={this.state?.country}
                      className="p-0 pl-1"
                      onChange={(e) => {
                        this.setState({
                          country: parseInt(e.target.value),
                          filteredstateList: this.state.stateList.filter(
                            (item) =>
                              item.CountryID === parseInt(e.target.value)
                          ),
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
                    {btnFlg && this.state.country === 0 && <ErrorText />}
                  </Col>

                  <Col
                    sm="2"
                    className={` ${
                      btnFlg && this.state.state === 0 ? "invalid-input" : ""
                    }`}
                  >
                    <Label>State</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="stateSelect"
                      name="stateSelect"
                      value={this.state?.state}
                      className="p-0 pl-1"
                      onChange={(e) => {
                        this.setState({
                          state: parseInt(e.target.value),
                          filtereddistrictList: this.state.districtList.filter(
                            (data) => data.StateID === parseInt(e.target.value)
                          ),
                        });
                      }}
                    >
                      <option value="0">State</option>
                      {this.state.filteredstateList &&
                      this.state.filteredstateList?.length > 0
                        ? this.state?.filteredstateList.map((d, i) => {
                            return (
                              <option value={d.value} key={d.value}>
                                {d.label}
                              </option>
                            );
                          })
                        : this.state.stateList &&
                          this.state.stateList?.length > 0 &&
                          this.state.stateList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                    </CustomInput>
                    {btnFlg && this.state.state === 0 && <ErrorText />}
                  </Col>

                  <Col
                    sm="2"
                    className={
                      btnFlg && this.state.district === 0 ? "invalid-input" : ""
                    }
                  >
                    <Label>District</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="dsistrictSelect"
                      name="districtSelect"
                      value={this.state?.district ? this.state?.district : 0}
                      className="p-0 pl-1"
                      onChange={(e) => {
                        this.setState({
                          district: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">District</option>
                      {this.state.filtereddistrictList &&
                      this.state.filtereddistrictList?.length > 0
                        ? this.state?.filtereddistrictList.map((d, i) => {
                            return (
                              <option value={d.value} key={d.value}>
                                {d.label}
                              </option>
                            );
                          })
                        : this.state.districtList &&
                          this.state.districtList?.length > 0 &&
                          this.state.districtList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                    </CustomInput>
                    {btnFlg && this.state.district === 0 && <ErrorText />}
                  </Col>

                  <Col sm="2">
                    <Label>City</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.CityName}
                      onChange={this.onChange}
                      name="name"
                      id="name"
                      placeholder="City Name"
                      className={
                        btnFlg &&
                        (!this.state.CityName || this.state.CityName === "")
                          ? "invalid-input"
                          : ""
                      }
                    />
                    {btnFlg &&
                      (!this.state.CityName || this.state.CityName === "") && (
                        <ErrorText />
                      )}
                  </Col>

                  <Col className="mt-1_8">
                    <Button.Ripple
                      size="sm"
                      color="primary"
                      type="submit"
                      className="mr-1 ml-6"
                      onClick={this.handleSubmit}
                    >
                      Save
                    </Button.Ripple>
                    <Button.Ripple
                      size="sm"
                      outline
                      color="warning"
                      type="reset"
                      onClick={this.resetState}
                    >
                      Reset
                    </Button.Ripple>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        ) : (
          ""
        )}
        {Access.AllowView || Access.AllowUpdate ? (
          <Card>
            <CardHeader>
              {Access.AllowInsert || Access.AllowUpdate ? (
                <CardTitle></CardTitle>
              ) : (
                <CardTitle>City Master</CardTitle>
              )}
              <div className="d-flex align-items-center">
                <CustomHeader
                  value={SearchText}
                  handleFilter={this.searchData}
                />
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <DataTable
                // data={SearchText.length ? filteredData : response}
                data={response}
                columns={columns}
                noHeader
                pagination
                paginationComponentOptions={{
                  rowsPerPageText: "Records per page:",
                  rangeSeparatorText: "of",
                  noRowsPerPage: false,
                  selectAllRowsItem: false,
                  selectAllRowsItemText: "All",
                }}
              />
              <ToastContainer />
              <SweetAlert
                title="Delete City"
                show={this.state.deleteAlert}
                showCancel
                reverseButtons
                onConfirm={() => this.deleteState()}
                onCancel={() => this.handleAlert("deleteAlert", false)}
              >
                <p className="sweet-alert-text">
                  Are you sure you want to delete this city
                </p>
              </SweetAlert>
            </CardBody>
          </Card>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    country: state.country,
    state: state.state,
    district: state.district,
    city: state.city,
  };
};

export default connect(mapStateToProps, {
  getCountry,
  getStateData,
  getDistrict,
  getCity,
  addCity,
  deleteCity,
})(CityView);
