import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import "../../style.css";
import { getCountry } from "../../../../redux/actions/Administration/country";
import {
  getStateData,
  addState,
  deleteState,
} from "../../../../redux/actions/Administration/state";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Form,
  Button,
  Input,
  Label,
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

class StateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      countryList: [],
      allCountryData: [],
      SearchText: "",
      CountryID: { value: 0, label: "Select Country" },
      StateCode: "",
      deleteAlert: false,
      CountryName: "",
      StateName: "",
      btnFlg: false,
      stateID: 0,
      successMsg: "",
      error: "",
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCountry(postData);
    this.props.getStateData(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.state.error && props.state.error !== state.error) {
      toast.error(props.state.error);
      return {
        error: props.state.error,
      };
    }
    if (props.state && props.state.stateList) {
      let successMsg = "";
      if (
        Object.keys(props.state.stateList).every(
          (p) => props.state.stateList[p] !== state.response[p]
        )
      ) {
        if (props.state.random !== state.random && props.state.successMsg) {
          successMsg = props.state.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.state.stateList && props.state.stateList.length
              ? props.state.stateList
              : [],
          successMsg: successMsg,
          random: props.state.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.state.successMsg !== prevProps.state.successMsg) {
      toast.success(this.props.state.successMsg);
    }
    if (this.props.state.error !== prevProps.state.error) {
      toast.error(this.props.state.error);
      this.setState({
        error: this.props.state.error,
      });
    }
    if (this.props.state.stateList !== prevProps.state.stateList) {
      this.setState({
        response:
          this.props.state.stateList && this.props.state.stateList.length
            ? this.props.state.stateList
            : [],
        random: this.props.state.random,
      });
    }

    if (this.props.country.data !== prevProps.country.data) {
      let countryData = [];
      this.props.country.data.forEach((item) => {
        countryData.push({ value: item.IDNumber, label: item.CountryName });
      });

      this.setState({
        countryList:
          this.props.country.data && this.props.country.data.length
            ? countryData
            : [],
        allCountryData:
          this.props.country.data && this.props.country.data.length
            ? this.props.country.data
            : [],
        response:
          this.props.state.stateList && this.props.state.stateList.length
            ? this.props.state.stateList
            : [],
      });
    }
  }

  editRow = (row) => {
    this.setState({
      CountryID: { value: row.CountryID, label: row.CountryName },
      StateName: row.StateName,
      StateCode: row.StateCode,
      StateID: row.IDNumber,
      country: row.CountryID,
    });
  };

  onCountryChange = (data) => {
    this.setState({ Country: data });
  };

  onChange = (event) => {
    let pattern = /^[a-zA-Z ]*$/;
    if (pattern.test(event.target.value)) {
      this.setState({ StateName: event.target.value });
    }
  };

  onStateCodeChange = (event) => {
    this.setState({ StateCode: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    if (this.state.country && this.state.StateName && this.state.StateCode) {
      let postData = {
        IDNumber: this.state.StateID ? this.state.StateID : 0,
        StateCode: this.state.StateCode,
        StateName: this.state.StateName,
        CountryID: this.state.country,
      };
      this.props.addState(postData);
      this.resetState();
    }
  };
  resetState = () => {
    this.setState({
      stateID: 0,
      StateName: "",
      StateCode: "",
      country: 0,
      CountryID: { value: "0", label: "Select Country" },
      btnFlg: false,
    });
  };
  deleteRow = (row) => {
    this.setState({ deleteState: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  deleteState = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteState.IDNumber,
      StateName: this.state.deleteState.StateName,
    };
    this.props.deleteState(postData);
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getStateData(postData);
  };

  render() {
    let Access = hasRight("STATEMST");
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
          width: "10%",
        },
        {
          name: "State Code",
          selector: "StateCode",
          sortable: true,
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
          width: "10%",
        },
        {
          name: "State Code",
          selector: "StateCode",
          sortable: true,
        },
      ];
    }
    const { btnFlg, response, SearchText } = this.state;
    return (
      <React.Fragment>
        {Access.AllowInsert || Access.AllowUpdate ? (
          <Card>
            <CardHeader>
              <CardTitle>State Master</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
              <Form className="country">
                <FormGroup row className="align-items-center">
                  <Col
                    sm="2"
                    className={
                      btnFlg && this.state.CountryID === 0
                        ? "invalid-input"
                        : ""
                    }
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
                    {btnFlg && this.state.Country && <ErrorText />}
                  </Col>

                  <Col sm="2">
                    <Label>State Name</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.StateName}
                      onChange={this.onChange}
                      name="stateName"
                      id="stateName"
                      placeholder="State Name"
                      className={
                        btnFlg &&
                        (!this.state.StateName || this.state.StateName === "")
                          ? "invalid-input"
                          : ""
                      }
                    />
                    {btnFlg &&
                      (!this.state.StateName ||
                        this.state.StateName === "") && <ErrorText />}
                  </Col>

                  <Col sm="2">
                    <Label>State Code</Label>
                    <Input
                      bsSize="sm"
                      type="number"
                      value={this.state.StateCode}
                      onChange={this.onStateCodeChange}
                      name="stateCode"
                      id="stateCode"
                      placeholder="State Code"
                      className={
                        btnFlg &&
                        (!this.state.StateCode || this.state.StateCode === "")
                          ? "invalid-input"
                          : ""
                      }
                    />
                    {btnFlg &&
                      (!this.state.StateCode ||
                        this.state.StateCode === "") && <ErrorText />}
                  </Col>
                  <Col className="mt-1_8">
                    <Button.Ripple
                      size="sm"
                      color="primary"
                      type="submit"
                      className="mr-1 ml-6 "
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
              {Access.AllowInsert ? (
                <CardTitle></CardTitle>
              ) : (
                <CardTitle>State Master</CardTitle>
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
                title="Delete State"
                show={this.state.deleteAlert}
                showCancel
                reverseButtons
                onConfirm={() => this.deleteState()}
                onCancel={() => this.handleAlert("deleteAlert", false)}
              >
                <p className="sweet-alert-text">
                  Are you sure you want to delete this state
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
  };
};

export default connect(mapStateToProps, {
  getCountry,
  getStateData,
  addState,
  deleteState,
})(StateView);
