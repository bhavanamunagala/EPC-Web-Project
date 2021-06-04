import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getCashPayment,
  addCashPayment,
  getCashPaymentDropDown,
  getCashPaymentAttachment,
} from "../../../../redux/actions/Account/CashPayment";

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

class CashPaymentNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      AccountList: [],
      CashPaymentDetails: [],
      TotalAmount: 0,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCashPaymentDropDown(postData);
    this.props.getCashPayment(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.cashPayment.error !== this.props.cashPayment.error &&
      this.props.cashPayment.error
    ) {
      toast.error(this.props.cashPayment.error);
    }
    if (
      prevProps.cashPayment.successMsg !== this.props.cashPayment.successMsg &&
      this.props.cashPayment.successMsg
    ) {
      toast.success(this.props.cashPayment.successMsg);
    }

    if (
      prevProps.cashPayment.ProjectList !== this.props.cashPayment.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.cashPayment.ProjectList &&
          this.props.cashPayment.ProjectList.length
            ? this.props.cashPayment.ProjectList
            : [],
      });
    }

    if (
      prevProps.cashPayment.AccountList !== this.props.cashPayment.AccountList
    ) {
      this.setState({
        AccountList:
          this.props.cashPayment.AccountList &&
          this.props.cashPayment.AccountList.length
            ? this.props.cashPayment.AccountList
            : [],
      });
    }

    if (prevProps.cashPayment.file !== this.props.cashPayment.file) {
      this.setState({
        file:
          this.props.cashPayment.file && this.props.cashPayment.file.length
            ? this.props.cashPayment.file
            : [],
      });
    }

    if (
      prevProps.cashPayment.data !== this.props.cashPayment.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      this.props.getCashPaymentAttachment({ IDNumber: id });
      const filterData =
        this.props.cashPayment.data &&
        this.props.cashPayment.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        ProjectID: filterData?.ProjectID,
        TotalAmount: filterData?.TotalAmount,
        CashPaymentDetails: filterData?.CashPaymentDetails,
        Remarks: filterData?.Remarks,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleAddAccount = () => {
    let { CashPaymentDetails } = this.state;
    CashPaymentDetails.push({
      IDNumber: 0,
      CashPaymentMasterID: 0,
      AccountID: this.state.AccountID,
      Amount: this.state.Amount,
      Remark: this.state.AccountRemarks,
      DetailID: 0,
    });
    this.setState({
      CashPaymentDetails,
      TotalAmount: this.state.TotalAmount + parseInt(this.state.Amount),
      AccountID: 0,
      Amount: "",
      AccountRemarks: "",
    });
  };

  onInputChange = (value, name, id) => {
    const exist = this.state.CashPaymentDetails?.filter((data) => {
      return data.IDNumber === id;
    })?.[0];
    const unique = this.state.CashPaymentDetails?.filter((data) => {
      return data.IDNumber !== id;
    });
    if (name === "Amount") {
      this.setState({
        TotalAmount: this.state.TotalAmount - exist["Amount"] + value,
      });
    }

    exist[name] = value;

    this.setState({
      CashPaymentDetails: [
        {
          ...exist,
          [name]: value,
        },
        ...unique,
      ],
    });
  };

  handlePOAttachment = (e) => {
    let fileArray = [];
    for (let i = 0; i < e.target.files.length; i++) {
      fileArray.push(URL.createObjectURL(e.target.files[i]));
    }
    this.setState({ file: fileArray });
  };

  deletePOAttachment = (index) => {
    let { file } = this.state;
    file.splice(index, 1);
    this.setState({ file });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const {
      Date,
      ProjectID,
      TotalAmount,
      CashPaymentDetails,
      DeletedCashPaymentDetails,
      deletedAttachmentIds,
      Remarks,
      file,
      itemData,
    } = this.state;

    if (
      Date &&
      ProjectID &&
      TotalAmount &&
      CashPaymentDetails &&
      CashPaymentDetails?.length > 0
    ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
        ProjectID,
        TotalAmount,
        CashPaymentDetails,
        Remarks,
        file,
        DeletedCashPaymentDetails,
        deletedAttachmentIds,
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
        await this.props.addCashPayment({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addCashPayment(postData);
      }
      await this.resetState();
      await history.push("/Account/CashPayment");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, ProjectList, AccountList, CashPaymentDetails } =
      this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Cash Payment</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Account/CashPayment")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col sm="4">
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
                <Col sm="8">
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
              </FormGroup>
              <Card>
                <CardBody className="border">
                  <FormGroup row>
                    <Col sm="1">
                      <Label></Label>
                    </Col>
                    <Col>
                      <Label>Account Name</Label>
                    </Col>
                    <Col>
                      <Label>Amount</Label>
                    </Col>
                    <Col>
                      <Label>Remarks</Label>
                    </Col>
                  </FormGroup>
                  {CashPaymentDetails && CashPaymentDetails?.length > 0
                    ? CashPaymentDetails.map((data, i) => (
                        <FormGroup row>
                          <Col sm="1" className="text-center">
                            <Button
                              color="danger"
                              className="cursor-pointer action-btn"
                              size="sm"
                              onClick={() => {
                                let objectIndex =
                                  this.state.PODetails.findIndex(
                                    (d) => d.IDNumber === data.IDNumber
                                  );
                                this.state.PODetails.splice(objectIndex, 1);
                                this.setState({
                                  DeletedPODetails:
                                    this.state.DeletedPODetails +
                                    "," +
                                    data.IDNumber,
                                  ItemTotal:
                                    this.state.ItemTotal -
                                    this.state.PODetails[objectIndex]?.Amount,
                                });
                              }}
                            >
                              <Trash size={16} />
                            </Button>
                          </Col>
                          <Col>
                            <CustomInput
                              bsSize="sm"
                              type="select"
                              id="AccountIDSelect"
                              name="AccountIDSelect"
                              value={data?.AccountID}
                              className={`p-0 pl-1 ${
                                btnFlg && data?.AccountID === 0
                                  ? "invalid-input"
                                  : ""
                              }`}
                              onChange={(e) =>
                                this.onInputChange(
                                  parseInt(e.target.value),
                                  "AccountID",
                                  data?.IDNumber
                                )
                              }
                            >
                              <option value="0">Account Name</option>
                              {AccountList &&
                                AccountList?.length > 0 &&
                                AccountList.map((d, i) => (
                                  <option value={d.IDNUMBER} key={d.IDNUMBER}>
                                    {d.ACNAME}
                                  </option>
                                ))}
                            </CustomInput>
                            {btnFlg && !this.state?.AccountID && <ErrorText />}
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              value={data?.Amount ? data?.Amount : ""}
                              onChange={(e) =>
                                this.onInputChange(
                                  parseInt(e.target.value),
                                  "Amount",
                                  data?.IDNumber
                                )
                              }
                              name="Amount"
                              id="Amount"
                              placeholder="Amount"
                              className={`form-control form-control-sm ${
                                btnFlg && !data?.Amount ? "invalid-input" : ""
                              }`}
                            />
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              value={data?.Remark ? data?.Remark : ""}
                              onChange={(e) =>
                                this.onInputChange(
                                  parseInt(e.target.value),
                                  "Remark",
                                  data?.IDNumber
                                )
                              }
                              name="AccountRemarks"
                              id="AccountRemarks"
                              placeholder="Remarks"
                              className={`form-control form-control-sm ${
                                btnFlg && !data?.Remarks ? "invalid-input" : ""
                              }`}
                            />
                          </Col>
                        </FormGroup>
                      ))
                    : ""}

                  <FormGroup row>
                    <Col sm="1">
                      <Label></Label>
                    </Col>
                    <Col>
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="AccountIDSelect"
                        name="AccountIDSelect"
                        value={this.state?.AccountID}
                        className={`p-0 pl-1 ${
                          btnFlg && this.state?.AccountID === 0
                            ? "invalid-input"
                            : ""
                        }`}
                        onChange={(e) => {
                          this.setState({
                            AccountID: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Account Name</option>
                        {AccountList &&
                          AccountList?.length > 0 &&
                          AccountList.map((d, i) => (
                            <option value={d.IDNUMBER} key={d.IDNUMBER}>
                              {d.ACNAME}
                            </option>
                          ))}
                      </CustomInput>
                      {btnFlg && !this.state?.AccountID && <ErrorText />}
                    </Col>
                    <Col>
                      <Input
                        type="text"
                        value={this.state.Amount ? this.state.Amount : ""}
                        onChange={(e) =>
                          this.setState({ Amount: e.target.value })
                        }
                        name="Amount"
                        id="Amount"
                        placeholder="Amount"
                        className={`form-control form-control-sm ${
                          btnFlg && !this.state?.Amount ? "invalid-input" : ""
                        }`}
                      />
                    </Col>
                    <Col>
                      <Input
                        type="text"
                        value={
                          this.state.AccountRemarks
                            ? this.state.AccountRemarks
                            : ""
                        }
                        onChange={(e) =>
                          this.setState({ AccountRemarks: e.target.value })
                        }
                        name="AccountRemarks"
                        id="AccountRemarks"
                        placeholder="Remarks"
                        className={`form-control form-control-sm ${
                          btnFlg && !this.state?.AccountRemarks
                            ? "invalid-input"
                            : ""
                        }`}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm="1">
                      <Label></Label>
                    </Col>
                    <Col>
                      <Button
                        color="primary"
                        className="cursor-pointer action-btn mr-1"
                        size="sm"
                        onClick={() => this.handleAddAccount()}
                        style={{ height: "24px" }}
                      >
                        + Add New
                      </Button>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>

              <FormGroup row>
                <Col>
                  <Label>Total Amount</Label>
                  <Input
                    type="text"
                    value={this.state.TotalAmount ? this.state.TotalAmount : ""}
                    onChange={(e) =>
                      this.setState({ TotalAmount: e.target.value })
                    }
                    name="Total Amount"
                    id="Total Amount"
                    placeholder="Total Amount"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.TotalAmount ? "invalid-input" : ""
                    }`}
                    disabled
                  />
                </Col>
                <Col>
                  <Label>Remarks</Label>
                  <Input
                    // bsSize="sm"
                    type="text"
                    value={this.state.Remarks ? this.state.Remarks : ""}
                    onChange={(e) => this.setState({ Remarks: e.target.value })}
                    name="Remarks"
                    id="Remarks"
                    placeholder="Remarks"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Remarks ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.Remarks && <ErrorText />}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <FormGroup>
                    <Label for="POAttchment"> Attachment Document</Label>
                    <CustomInput
                      type="file"
                      bsSize="sm"
                      id="POAttchment"
                      name="POAttchment"
                      multiple
                      onChange={(e) => this.handlePOAttachment(e)}
                      disabled={this.state?.file?.length === 10}
                    />
                  </FormGroup>
                </Col>
              </FormGroup>

              <div className="d-flex w-100">
                {file?.length > 0 &&
                  file.map((url, index) => (
                    <div key={"POAttachment-" + index}>
                      <img
                        src={url}
                        alt="..."
                        style={{
                          height: "100px",
                          marginTop: "5px",
                        }}
                      />
                      <Button
                        color="danger"
                        className="cursor-pointer action-btn mr-1 ml-1"
                        size="sm"
                        onClick={() => this.deletePOAttachment(url, index)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  ))}
              </div>

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
    cashPayment: state.cashPayment,
  };
};

export default connect(mapStateToProps, {
  getCashPayment,
  getCashPaymentDropDown,
  addCashPayment,
  getCashPaymentAttachment,
})(CashPaymentNew);
