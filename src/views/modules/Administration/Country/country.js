import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import {
  getCountry,
  addCountry,
  deleteCountry,
} from "../../../../redux/actions/Administration/country";
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
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Edit, Trash } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";
import { CustomHeader } from "../../../components/CustomHeader";
import DataTable from "react-data-table-component";
import "../../style.css";
import { hasRight } from "../../../../constant/commonDS";

class CountryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      CountryID: "",
      deleteCountryId: null,
      SearchText: "",
      deleteAlert: false,
      CountryName: "",
      btnFlg: false,
      successMsg: "",
      error: "",
      AllowUpdate: 0,
      AllowDelete: 0,
      AllowInsert: 0,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCountry(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.country.error && props.country.error !== state.error) {
      toast.error(props.country.error);
      return {
        error: props.country.error,
      };
    }
    if (props.country && props.country.data) {
      let successMsg = "";
      if (
        Object.keys(props.country.data).every(
          (p) => props.country.data[p] !== state.response[p]
        )
      ) {
        if (props.country.random !== state.random && props.country.successMsg) {
          successMsg = props.country.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.country.data && props.country.data.length
              ? props.country.data
              : [],
          successMsg: successMsg,
          random: props.country.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  editRow = (row) => {
    this.setState({ CountryName: row.CountryName });
    this.setState({ CountryID: row.IDNumber });
  };

  onChange = (event) => {
    this.setState({ CountryName: event.target.value });
  };

  handleSubmit = (e) => {
    this.setState({
      btnFlg: true,
    });
    e.preventDefault();
    if (this.state.CountryName) {
      let postData = {
        IDNumber: this.state.CountryID ? this.state.CountryID : 0,
        CountryName: this.state.CountryName,
      };
      this.props.addCountry(postData);
      this.resetState();
    }
  };
  deleteRow = (row) => {
    this.setState({ deleteCountryId: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  resetState = () => {
    this.setState({
      CountryID: 0,
      CountryName: "",
      btnFlg: false,
    });
  };

  deleteCountry = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteCountryId.IDNumber,
      CountryName: this.state.deleteCountryId.CountryName,
    };
    this.props.deleteCountry(postData);
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getCountry(postData);
  };

  render() {
    let Access = hasRight("COUNTRYMST");
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
        },
      ];
    } else {
      columns = [
        {
          name: "Country Name",
          selector: "CountryName",
          sortable: true,
        },
      ];
    }
    const { btnFlg, response, SearchText } = this.state;
    return (
      <React.Fragment>
        {Access.AllowInsert || Access.AllowUpdate ? (
          <Card>
            <CardHeader className="p-1">
              <CardTitle>Country Master</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
              <Form className="country">
                <FormGroup row className="align-items-center">
                  <Col sm="2">
                    <Label>Country Name</Label>
                    <Input
                      type="text"
                      bsSize="sm"
                      value={this.state.CountryName}
                      onChange={this.onChange}
                      name="name"
                      id="name"
                      placeholder="Country Name"
                      className={
                        btnFlg &&
                        (!this.state.CountryName ||
                          this.state.CountryName === "")
                          ? "invalid-input"
                          : ""
                      }
                    />
                    {btnFlg &&
                      (!this.state.CountryName ||
                        this.state.CountryName === "") && <ErrorText />}
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
                <CardTitle>Country Master</CardTitle>
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
                title="Delete Country"
                show={this.state.deleteAlert}
                showCancel
                reverseButtons
                onConfirm={() => this.deleteCountry()}
                onCancel={() => this.handleAlert("deleteAlert", false)}
              >
                <p className="sweet-alert-text">
                  Are you sure you want to delete this country
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
  };
};

export default connect(mapStateToProps, {
  getCountry,
  deleteCountry,
  addCountry,
})(CountryView);
