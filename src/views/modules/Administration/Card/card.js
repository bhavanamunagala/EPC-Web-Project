import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CustomInput,
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
} from "reactstrap";
import { connect } from "react-redux";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import "flatpickr/dist/themes/light.css";
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "../../style.css";

import {
  getCard,
  addCard,
  deleteCard,
} from "../../../../redux/actions/Administration/card";
import { getUser } from "../../../../redux/actions/Administration/user";
import { Edit, Trash } from "react-feather";

import "../../../../assets/scss/plugins/extensions/toastr.scss";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";

import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import { hasRight } from "../../../../constant/commonDS";

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      deleteCard: null,
      CardID: "",
      SearchText: "",
      successMsg: "",
      deleteAlert: false,
      CardNo: "",
      IssueDate: "",
      ExpiryDate: "",
      btnFlg: false,
      ResponsiblePersonID: null,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCard(postData);
    this.props.getUser(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.card.error && props.card.error !== state.error) {
      toast.error(props.card.error);
      return {
        error: props.card.error,
      };
    }
    if (props.card && props.card.data) {
      let successMsg = "";
      if (
        Object.keys(props.card.data).every(
          (p) => props.card.data[p] !== state.response[p]
        )
      ) {
        if (props.card.random !== state.random && props.card.successMsg) {
          successMsg = props.card.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.card.data && props.card.data.length ? props.card.data : [],
          successMsg: successMsg,
          random: props.card.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.userList !== this.props.user.userList) {
      let userData = [];
      this.props.user.userList.forEach((item) => {
        userData.push({ value: item.IDNumber, label: item.EmpName });
      });
      this.setState({
        userList:
          this.props.user.userList && this.props.user.userList.length
            ? userData
            : [],
      });
    }
  }

  editRow = (row) => {
    this.setState({
      CardNo: row.CardNo,
      IssueDate: row.IssueDate,
      ExpiryDate: row.ExpiryDate,
      ResponsiblePersonID: row.ResponsiblePersonID,
    });
    this.setState({ CardID: row.IDNumber });
  };

  onChange = (event) => {
    this.setState({ CardNo: event.target.value });
  };

  handleSubmit = (e) => {
    this.setState({
      btnFlg: true,
    });
    e.preventDefault();
    if (
      this.state.CardNo &&
      this.state.IssueDate &&
      this.state.ExpiryDate &&
      this.state.ResponsiblePersonID
    ) {
      let user = JSON.parse(localStorage.getItem("userData"));
      let postData = {
        IDNumber: this.state.CardID ? this.state.CardID : 0,
        CardNo: this.state.CardNo,
        IssueDate: this.state.IssueDate,
        ExpiryDate: this.state.ExpiryDate,
        ResponsiblePersonID: this.state.ResponsiblePersonID,
        CreatedBy: user.IDNumber,
        UpdatedBy: user.IDNumber,
      };
      this.props.addCard(postData);
      this.resetState();
    }
  };

  deleteRow = (row) => {
    this.setState({ deleteCard: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  resetState = () => {
    this.setState({
      CardNo: "",
      IssueDate: "",
      ExpiryDate: "",
      CardID: "",
      btnFlg: false,
      ResponsiblePersonID: 0,
    });
  };

  deleteCard = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteCard.IDNumber,
      CardNo: this.state.deleteCard.CardNo,
    };
    this.props.deleteCard(postData);
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getCard(postData);
  };

  render() {
    let Access = hasRight("ITEM");
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
          name: "Card No",
          selector: "CardNo",
          sortable: true,
        },
        {
          name: "Responsible Person",
          selector: "ResponsiblePersonName",
          sortable: true,
        },
        {
          name: "Issue Date",
          selector: "IssueDate",
          sortable: true,
          cell: (rowData) => moment(rowData.IssueDate).format("DD/MM/YYYY"),
        },
        {
          name: "Expiry Date",
          selector: "ExpiryDate",
          sortable: true,
          cell: (rowData) => moment(rowData.ExpiryDate).format("DD/MM/YYYY"),
        },
        {
          name: "Updated At",
          selector: "UpdatedDate",
          sortable: true,
          cell: (rowData) =>
            moment(rowData.UpdatedDate).format("DD/MM/YYYY ,h:mm:ss a"),
        },
        {
          name: "Created At",
          selector: "CreatedDate",
          sortable: true,
          cell: (rowData) =>
            moment(rowData.CreatedDate).format("DD/MM/YYYY ,h:mm:ss a"),
        },
      ];
    } else {
      columns = [
        {
          name: "Card No",
          selector: "CardNo",
          sortable: true,
        },
        {
          name: "Responsible Person",
          selector: "ResponsiblePersonName",
          sortable: true,
        },
        {
          name: "Issue Date",
          selector: "IssueDate",
          sortable: true,
          cell: (rowData) => moment(rowData.IssueDate).format("DD/MM/YYYY"),
        },
        {
          name: "Expiry Date",
          selector: "ExpiryDate",
          sortable: true,
          cell: (rowData) => moment(rowData.ExpiryDate).format("DD/MM/YYYY"),
        },
        {
          name: "Updated At",
          selector: "UpdatedDate",
          sortable: true,
          cell: (rowData) =>
            moment(rowData.UpdatedDate).format("DD/MM/YYYY ,h:mm:ss a"),
        },
        {
          name: "Created At",
          selector: "CreatedDate",
          sortable: true,
          cell: (rowData) =>
            moment(rowData.CreatedDate).format("DD/MM/YYYY ,h:mm:ss a"),
        },
      ];
    }
    const { btnFlg, response, SearchText } = this.state;
    return (
      <React.Fragment>
        {Access.AllowInsert || Access.AllowUpdate ? (
          <Card>
            <CardHeader>
              <CardTitle>Card Master</CardTitle>
            </CardHeader>
            <CardBody>
              <Form className="country">
                <FormGroup row>
                  <Col>
                    <Label>Card No</Label>
                    <Input
                      size="sm"
                      type="text"
                      value={this.state.CardNo}
                      onChange={this.onChange}
                      name="cardNo"
                      id="cardNo"
                      placeholder="Card NO"
                      className={
                        btnFlg &&
                        (!this.state.CardNo || this.state.CardNo === "")
                          ? "invalid-input"
                          : ""
                      }
                    />
                    {btnFlg &&
                      (!this.state.CardNo || this.state.CardNo === "") && (
                        <ErrorText />
                      )}
                  </Col>

                  <Col>
                    <Label>Issue Date</Label>
                    <Flatpickr
                      className={`${"form-control form-control-sm"} ${
                        btnFlg &&
                        (!this.state.IssueDate || this.state.IssueDate === "")
                          ? "invalid-input"
                          : ""
                      }`}
                      placeholder="Issue Date"
                      value={this.state.IssueDate}
                      onChange={(date) => {
                        this.setState({
                          IssueDate: moment(date[0]).format(
                            "YYYY-MM-DDTHH:mm:ss"
                          ),
                        });
                      }}
                    />
                    {btnFlg &&
                      (!this.state.IssueDate ||
                        this.state.IssueDate === "") && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Expiry Date</Label>
                    <Flatpickr
                      className={`${"form-control form-control-sm"} ${
                        btnFlg &&
                        (!this.state.ExpiryDate || this.state.ExpiryDate === "")
                          ? "invalid-input"
                          : ""
                      }`}
                      placeholder="Expiry Date"
                      value={this.state.ExpiryDate}
                      onChange={(date) => {
                        this.setState({
                          ExpiryDate: moment(date[0]).format(
                            "YYYY-MM-DDTHH:mm:ss"
                          ),
                        });
                      }}
                    />
                    {btnFlg &&
                      (!this.state.ExpiryDate ||
                        this.state.ExpiryDate === "") && <ErrorText />}
                  </Col>

                  <Col
                    className={
                      btnFlg && !this.state.ResponsiblePersonID
                        ? "invalid-input"
                        : ""
                    }
                  >
                    <Label>Responsible Person</Label>
                    {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ ResponsiblePersonID: e })}
                    value={this.state.ResponsiblePersonID}
                    name="sort"
                    options={this.state.userList}
                  /> */}
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="ResponsiblePersonIDSelect"
                      name="ResponsiblePersonIDSelect"
                      value={this.state?.ResponsiblePersonID}
                      className="p-0 pl-1"
                      onChange={(e) => {
                        this.setState({
                          ResponsiblePersonID: parseInt(e.target.value),
                        });
                      }}
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
                    {btnFlg && !this.state.ResponsiblePersonID && <ErrorText />}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col className="mt-2">
                    <Button.Ripple
                      size="sm"
                      color="primary"
                      type="submit"
                      className="mr-1 ml-6 mb-1"
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
                      className="mb-1"
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
        {Access.AllowView ? (
          <Card>
            <CardHeader>
              {Access.AllowInsert || Access.AllowUpdate ? (
                <CardTitle></CardTitle>
              ) : (
                <CardTitle>Card Master</CardTitle>
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
                title="Delete Card"
                show={this.state.deleteAlert}
                showCancel
                reverseButtons
                onConfirm={() => this.deleteCard()}
                onCancel={() => this.handleAlert("deleteAlert", false)}
              >
                <p className="sweet-alert-text">
                  Are you sure you want to delete this card
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
    user: state.user,
    card: state.card,
  };
};

export default connect(mapStateToProps, {
  getCard,
  addCard,
  deleteCard,
  getUser,
})(CardView);
