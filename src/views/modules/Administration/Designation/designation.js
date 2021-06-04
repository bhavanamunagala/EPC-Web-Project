import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import "../../style.css";
import {
  getDesignation,
  addDesignation,
  deleteDesignation,
} from "../../../../redux/actions/Administration/designation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Form,
  Col,
  Label,
  Button,
  Input,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Edit, Trash } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";
import { CustomHeader } from "../../../components/CustomHeader";
import DataTable from "react-data-table-component";
import { hasRight } from "../../../../constant/commonDS";

class DesignationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      deleteDesignation: null,
      SearchText: "",
      successMsg: "",
      deleteAlert: false,
      Code: "",
      Designation: "",
      CreatedDate: null,
      selectedRow: null,
      btnFlg: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getDesignation(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.designation.error && props.designation.error !== state.error) {
      toast.error(props.designation.error);
      return {
        error: props.designation.error,
      };
    }
    if (props.designation && props.designation.designationList) {
      let successMsg = "";
      if (
        Object.keys(props.designation.designationList).every(
          (p) => props.designation.designationList[p] !== state.response[p]
        )
      ) {
        if (
          props.designation.random !== state.random &&
          props.designation.successMsg
        ) {
          successMsg = props.designation.successMsg;
          toast.success(successMsg);
        }

        return {
          response:
            props.designation.designationList &&
            props.designation.designationList.length
              ? props.designation.designationList
              : [],
          successMsg: successMsg,
          random: props.designation.random,
        };
      }
    }

    // Return null if the state hasn't changed
    return null;
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     this.props.designation.successMsg !== prevProps.designation.successMsg
  //   ) {
  //     toast.success(this.props.designation.successMsg);
  //   }
  // }

  editRow = (row) => {
    this.setState({
      selectedRow: row,
      Code: row.Code,
      Designation: row.Designation,
      StateID: row.IDNumber,
      CreatedDate: row.CreatedDate,
    });
  };

  onChange = (event, name) => {
    let pattern = /^[a-zA-Z ]*$/;
    if (name === "Designation") {
      if (pattern.test(event.target.value)) {
        this.setState({ [name]: event.target.value });
      }
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleSubmit = (e) => {
    this.setState({
      btnFlg: true,
    });
    e.preventDefault();

    if (this.state.Code && this.state.Designation) {
      const postData = {
        Code: this.state.Code,
        Designation: this.state.Designation,
      };
      if (this.state.StateID) {
        postData["IDNumber"] = this.state.StateID;
      }
      this.props.addDesignation(postData);

      this.resetState();
    }
  };
  deleteRow = (row) => {
    this.setState({ deleteDesignation: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  resetState = () => {
    this.setState({
      Code: "",
      Designation: "",
      CreatedDate: null,
      selectedRow: null,
      StateID: null,
      btnFlg: false,
    });
  };

  deleteDesignation = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteDesignation.IDNumber,
      Designation: this.state.deleteDesignation.Designation,
    };
    this.props.deleteDesignation(postData);
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getDesignation(postData);
  };

  render() {
    let Access = hasRight("DSG");
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
          name: "Code",
          selector: "Code",
          sortable: true,
          width: "10%",
        },
        {
          name: "Designation",
          selector: "Designation",
          sortable: true,
          width: "10%",
        },
      ];
    } else {
      columns = [
        {
          name: "Code",
          selector: "Code",
          sortable: true,
          width: "10%",
        },
        {
          name: "Designation",
          selector: "Designation",
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
              <CardTitle>Designation Master</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
              <Form className="country">
                <FormGroup row className="align-items-center">
                  <Col sm="2">
                    <Label>Code</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.Code}
                      onChange={(e) => this.onChange(e, "Code")}
                      name="code"
                      id="code"
                      placeholder="Code"
                      className={
                        btnFlg && (!this.state.Code || this.state.Code === "")
                          ? "invalid-input"
                          : ""
                      }
                    />
                    {btnFlg && (!this.state.Code || this.state.Code === "") && (
                      <ErrorText />
                    )}
                  </Col>

                  <Col sm="2">
                    <Label>Designation</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.Designation}
                      onChange={(e) => this.onChange(e, "Designation")}
                      name="designation"
                      id="designation"
                      placeholder="Designation Name"
                      className={
                        btnFlg &&
                        (!this.state.Designation ||
                          this.state.Designation === "")
                          ? "invalid-input"
                          : ""
                      }
                    />
                    {btnFlg &&
                      (!this.state.Designation ||
                        this.state.Designation === "") && <ErrorText />}
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
                      Cancel
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
                <CardTitle>Designation Master</CardTitle>
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
                title="Delete Item"
                show={this.state.deleteAlert}
                showCancel
                reverseButtons
                onConfirm={() => this.deleteDesignation()}
                onCancel={() => this.handleAlert("deleteAlert", false)}
              >
                <p className="sweet-alert-text">
                  Are you sure you want to delete this Item
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
    designation: state.designation,
  };
};

export default connect(mapStateToProps, {
  getDesignation,
  deleteDesignation,
  addDesignation,
})(DesignationView);
