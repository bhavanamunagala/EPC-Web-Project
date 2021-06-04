import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import "../../style.css";
import { getCountry } from "../../../../redux/actions/Administration/country";
import { getStateData } from "../../../../redux/actions/Administration/state";
import {
  getDistrict,
  addDistrict,
  deleteDistrict,
} from "../../../../redux/actions/Administration/district";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Form,
  Label,
  Button,
  Input,
  CustomInput,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Edit, Trash } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";
import { CustomHeader } from "../../../components/CustomHeader";
import DataTable from "react-data-table-component";
import { hasRight } from "../../../../constant/commonDS";

class DistrictView extends React.Component {
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
      DistrictName: "",
      deleteAlert: false,
      btnFlg: false,
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
      let successMsg = "";
      if (
        Object.keys(props.district.districtList).every(
          (p) => props.district.districtList[p] !== state.response[p]
        )
      ) {
        if (
          props.district.random !== state.random &&
          props.district.successMsg
        ) {
          successMsg = props.district.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.district.districtList && props.district.districtList.length
              ? props.district.districtList
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
      CountryID: { value: row.CountryID, label: row.CountryName },
      StateID: { value: row.StateID, label: row.StateName },
      DistrictName: row.DistrictName,
      DistrictID: row.IDNumber,
      country: row.CountryID,
      state: row.StateID,
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
    this.setState({ StateID: { value: data.value, label: data.label } });
  };

  onDistrictChange = (event) => {
    let pattern = /^[a-zA-Z ]*$/;
    if (pattern.test(event.target.value)) {
      this.setState({ DistrictName: event.target.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    if (
      this.state.country !== 0 &&
      this.state.state !== 0 &&
      this.state.DistrictName
    ) {
      let postData = {
        IDNumber: this.state.DistrictID ? this.state.DistrictID : 0,
        StateID: this.state.state,
        DistrictName: this.state.DistrictName,
        CountryID: this.state.country,
      };
      this.props.addDistrict(postData);
      this.resetState();
    }
  };
  resetState = () => {
    this.setState({
      country: 0,
      state: 0,
      DistrictName: "",
      btnFlg: false,
    });
  };
  deleteRow = (row) => {
    this.setState({ deleteDistrict: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  deleteDistrict = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteDistrict.IDNumber,
      DistrictName: this.state.deleteDistrict.DistrictName,
    };
    this.props.deleteDistrict(postData);
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getDistrict(postData);
  };

  render() {
    let Access = hasRight("DISTMST");
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
          width: "10%",
        },
        {
          name: "State Name",
          selector: "StateName",
          sortable: true,
          width: "10%",
        },
        {
          name: "District Name",
          selector: "DistrictName",
          sortable: true,
          width: "10%",
        },
      ];
    } else {
      columns = [
        {
          name: "Country Name",
          selector: "CountryName",
          sortable: true,
          width: "10%",
        },
        {
          name: "State Name",
          selector: "StateName",
          sortable: true,
          width: "10%",
        },
        {
          name: "District Name",
          selector: "DistrictName",
          sortable: true,
          width: "10%",
        },
      ];
    }
    const { btnFlg, response, SearchText } = this.state;

    return (
      <React.Fragment>
        {Access.AllowInsert || Access.AllowUpdate ? (
          <Card>
            <CardHeader>
              <CardTitle>District Master</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
              <Form className="country">
                <FormGroup row className="align-items-center">
                  <Col
                    sm="2"
                    className={`${
                      btnFlg && this.state.CountryID.value === 0
                        ? "invalid-input"
                        : ""
                    }`}
                  >
                    <Label>Country</Label>
                    {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={this.onCountryChange}
                    value={this.state.CountryID}
                    name="sort"
                    options={this.state.countryList}
                  /> */}
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
                            (item) => item.CountryID === e.target.value
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
                    {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={this.onStateChange}
                    value={this.state.StateID}
                    name="state"
                    options={this.state.filteredstateList}
                  /> */}
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

                  <Col sm="2">
                    <Label>District</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.DistrictName}
                      onChange={this.onDistrictChange}
                      name="district"
                      id="district"
                      placeholder="District"
                      className={
                        btnFlg &&
                        (!this.state.DistrictName ||
                          this.state.DistrictName === "")
                          ? "invalid-input"
                          : ""
                      }
                    />
                    {btnFlg &&
                      (!this.state.DistrictName ||
                        this.state.DistrictName === "") && <ErrorText />}
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
                <CardTitle>District Master</CardTitle>
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
                title="Delete District"
                show={this.state.deleteAlert}
                showCancel
                reverseButtons
                onConfirm={() => this.deleteDistrict()}
                onCancel={() => this.handleAlert("deleteAlert", false)}
              >
                <p className="sweet-alert-text">
                  Are you sure you want to delete this district
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
  };
};

export default connect(mapStateToProps, {
  getCountry,
  getStateData,
  getDistrict,
  addDistrict,
  deleteDistrict,
})(DistrictView);
