import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getPaymentToContractor,
  addPaymentToContractor,
  getPaymentToContractorDropDown,
} from "../../../../redux/actions/Account/PaymenToContractor";

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
  Row,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { history } from "../../../../history";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";
import { Eye, Trash } from "react-feather";

class PaymentToContractorNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      CardList: [],
      BillList: [],
      RequestList: [],
      ContractorList: [],
      BasedOnRequest: true,
      Bill: false,
      Cash: true,
      Card: false,
      Cheque: false,
      NEFT: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getPaymentToContractorDropDown(postData);
    this.props.getPaymentToContractor(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.paymentToContractor.error !==
        this.props.paymentToContractor.error &&
      this.props.paymentToContractor.error
    ) {
      toast.error(this.props.paymentToContractor.error);
    }
    if (
      prevProps.paymentToContractor.successMsg !==
        this.props.paymentToContractor.successMsg &&
      this.props.paymentToContractor.successMsg
    ) {
      toast.success(this.props.paymentToContractor.successMsg);
    }

    if (
      prevProps.paymentToContractor.ProjectList !==
      this.props.paymentToContractor.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.paymentToContractor.ProjectList &&
          this.props.paymentToContractor.ProjectList.length
            ? this.props.paymentToContractor.ProjectList
            : [],
      });
    }

    if (
      prevProps.paymentToContractor.CardList !==
      this.props.paymentToContractor.CardList
    ) {
      this.setState({
        CardList:
          this.props.paymentToContractor.CardList &&
          this.props.paymentToContractor.CardList.length
            ? this.props.paymentToContractor.CardList
            : [],
      });
    }
    if (
      prevProps.paymentToContractor.BillList !==
      this.props.paymentToContractor.BillList
    ) {
      this.setState({
        BillList:
          this.props.paymentToContractor.BillList &&
          this.props.paymentToContractor.BillList.length
            ? this.props.paymentToContractor.BillList
            : [],
      });
    }
    if (
      prevProps.paymentToContractor.RequestList !==
      this.props.paymentToContractor.RequestList
    ) {
      this.setState({
        RequestList:
          this.props.paymentToContractor.RequestList &&
          this.props.paymentToContractor.RequestList.length
            ? this.props.paymentToContractor.RequestList
            : [],
      });
    }
    if (
      prevProps.paymentToContractor.ContractorList !==
      this.props.paymentToContractor.ContractorList
    ) {
      this.setState({
        ContractorList:
          this.props.paymentToContractor.ContractorList &&
          this.props.paymentToContractor.ContractorList.length
            ? this.props.paymentToContractor.ContractorList
            : [],
      });
    }

    if (
      prevProps.paymentToContractor.data !==
        this.props.paymentToContractor.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.paymentToContractor.data &&
        this.props.paymentToContractor.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        BasedOnRequest: filterData?.BasedOnRequest,
        BasedOnBill: filterData?.BasedOnBill,
        Cash: filterData?.Cash === 1 ? true : false,
        Card: filterData?.Card === 1 ? true : false,
        Bank: filterData?.Bank === 1 ? true : false,
        Cheque: filterData?.Cheque === 1 ? true : false,
        NEFT: filterData?.NEFT === 1 ? true : false,
        RequestID: filterData?.RequestID,
        ProjectID: filterData?.ProjectID,
        ContractorID: filterData?.ContractorID,
        CardID: filterData?.CardID,
        BillID: filterData?.BillID,
        ChequeNo: filterData?.ChequeNo,
        ChequeDate: filterData?.ChequeDate,
        Amount: filterData?.Amount,
        BeneficiaryName: filterData?.BeneficiaryName,
        BankName: filterData?.BankName,
        UTRNo: filterData?.UTRNo,
        NEFTDate: filterData?.NEFTDate,
        Remarks: filterData?.Remarks,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
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
      BasedOnRequest,
      BasedOnBill,
      Cash,
      Card,
      Bank,
      Cheque,
      NEFT,
      RequestID,
      ProjectID,
      ContractorID,
      CardID,
      BillID,
      ChequeNo,
      ChequeDate,
      Amount,
      BeneficiaryName,
      BankName,
      UTRNo,
      NEFTDate,
      Remarks,
      file,
      itemData,
    } = this.state;

    if (Date && ProjectID && ContractorID) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
        BasedOnRequest: BasedOnRequest ? 1 : 0,
        BasedOnBill: BasedOnBill ? 1 : 0,
        Cash: Cash ? 1 : 0,
        Card: Card ? 1 : 0,
        Bank: Bank ? 1 : 0,
        Cheque: Cheque ? 1 : 0,
        NEFT: NEFT ? 1 : 0,
        RequestID: RequestID ? RequestID : 0,
        ProjectID: ProjectID ? ProjectID : 0,
        ContractorID: ContractorID ? ContractorID : 0,
        CardID: CardID ? CardID : 0,
        BillID: BillID ? BillID : 0,
        ChequeNo: ChequeNo ? ChequeNo : "0",
        ChequeDate: ChequeDate
          ? typeof ChequeDate === "object"
            ? moment(ChequeDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.ChequeDate
          : null,
        Amount,
        BeneficiaryName: BeneficiaryName ? BeneficiaryName : "",
        BankName: BankName ? BankName : "",
        UTRNo: UTRNo ? UTRNo : "",
        NEFTDate: NEFTDate
          ? typeof NEFTDate === "object"
            ? moment(NEFTDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.NEFTDate
          : null,
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
        await this.props.addPaymentToContractor({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addPaymentToContractor(postData);
      }
      await this.resetState();
      await history.push("/Account/PaymentToContractor");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const {
      btnFlg,
      file,
      ProjectList,
      ContractorList,
      BillList,
      RequestList,
      CardList,
    } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Payment To Contractor</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Account/PaymentToContractor")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col>
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
                <Col>
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
                    <option value="0">Select Project</option>
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
                  <Label>Contractor</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="ContractorIDSelect"
                    name="ContractorIDSelect"
                    value={this.state?.ContractorID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.ContractorID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        ContractorID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Contractor</option>
                    {ContractorList &&
                      ContractorList?.length > 0 &&
                      ContractorList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.SupplierName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.ContractorID && <ErrorText />}
                </Col>
              </FormGroup>

              <Row className="border justify-content-center align-items-center py-1">
                <FormGroup check inline>
                  <Input
                    bsSize="sm"
                    type="radio"
                    name="PaymentRequest"
                    onChange={(e) =>
                      this.setState({
                        BasedOnRequest: true,
                        Bill: false,
                      })
                    }
                    checked={this.state.BasedOnRequest}
                  />
                  <Label className="mb-0"> Based On Request</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input
                    bsSize="sm"
                    type="radio"
                    name="PaymentRequest"
                    onChange={(e) =>
                      this.setState({
                        Bill: true,
                        BasedOnRequest: false,
                      })
                    }
                    checked={this.state.Bill}
                  />
                  <Label className="mb-0">Bill</Label>
                </FormGroup>
              </Row>
              <FormGroup row>
                <Col sm="4">
                  <Label>{this.state.Bill ? "Bill No." : "Request No."}</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="RequestNoIDSelect"
                    name="RequestNoIDSelect"
                    value={this.state?.RequestNoID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.RequestNoID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        RequestNoID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">
                      {this.state.Bill
                        ? "Select Bill No."
                        : "Select Request No."}
                    </option>
                    {RequestList &&
                      RequestList?.length > 0 &&
                      RequestList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.RequestNo}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.RequestNoID && <ErrorText />}
                </Col>
                <Col sm="8">
                  <Row className="justify-content-start align-items-center py-1 mt-25">
                    <FormGroup check inline>
                      <Input
                        bsSize="sm"
                        type="radio"
                        name="Payment"
                        onChange={(e) =>
                          this.setState({
                            Cash: !this.state.Cash,
                          })
                        }
                        checked={this.state.Cash}
                      />
                      <Label className="mb-0"> Cash</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        bsSize="sm"
                        type="radio"
                        name="Payment"
                        onChange={(e) =>
                          this.setState({
                            Card: !this.state.Card,
                          })
                        }
                        checked={this.state.Card}
                      />
                      <Label className="mb-0">Card</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        bsSize="sm"
                        type="radio"
                        name="Payment"
                        onChange={(e) =>
                          this.setState({
                            Bank: !this.state.Bank,
                          })
                        }
                        checked={this.state.Bank}
                      />
                      <Label className="mb-0">Bank</Label>
                    </FormGroup>
                  </Row>
                </Col>
              </FormGroup>
              {this.state.Card && (
                <FormGroup row>
                  <Col sm="4">
                    <Label>Card</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="CardIDSelect"
                      name="CardIDSelect"
                      value={this.state?.CardID}
                      className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.CardID === 0 ? "invalid-input" : ""
                    }`}
                      onChange={(e) => {
                        this.setState({
                          CardID: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">Select Card</option>
                      {CardList &&
                        CardList?.length > 0 &&
                        CardList.map((d, i) => (
                          <option value={d.IDNumber} key={d.IDNumber}>
                            {d.CardNo}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.CardID && <ErrorText />}
                  </Col>
                  <Col sm="8">
                    <Label>Responsible Person</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="Person  IDSelect"
                      name="Person  IDSelect"
                      value={this.state?.CardID}
                      className={`p-0 pl-1 `}
                      disabled
                    >
                      <option value="0">Select Person</option>
                      {CardList &&
                        CardList?.length > 0 &&
                        CardList.map((d, i) => (
                          <option value={d.IDNumber} key={d.IDNumber}>
                            {d.ResponsiblePersonName}
                          </option>
                        ))}
                    </CustomInput>
                  </Col>
                </FormGroup>
              )}
              {this.state.Bank && (
                <>
                  <FormGroup row>
                    <Col sm="4">
                      <FormGroup check inline>
                        <Input
                          bsSize="sm"
                          type="radio"
                          name="PaymentType"
                          onChange={(e) =>
                            this.setState({
                              Cheque: true,
                              NEFT: false,
                            })
                          }
                          checked={this.state.Cheque}
                        />
                        <Label className="mb-0"> Cheque</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          bsSize="sm"
                          type="radio"
                          name="PaymentType"
                          onChange={(e) =>
                            this.setState({
                              Cheque: false,
                              NEFT: true,
                            })
                          }
                          checked={this.state.NEFT}
                        />
                        <Label className="mb-0">NEFT</Label>
                      </FormGroup>
                    </Col>
                    <Col sm="8">
                      <FormGroup row>
                        <Col>
                          <Label>
                            {this.state.Cheque ? "Cheque No." : "UTR No."}
                          </Label>
                          <Input
                            type="text"
                            value={this.state.Amount ? this.state.Amount : ""}
                            onChange={(e) =>
                              this.setState({ Amount: e.target.value })
                            }
                            name=" Amount"
                            id=" Amount"
                            placeholder={
                              this.state.Cheque ? "Cheque No." : "UTR No."
                            }
                            className={`form-control form-control-sm ${
                              btnFlg && !this.state?.Amount
                                ? "invalid-input"
                                : ""
                            }`}
                          />
                          {btnFlg && !this.state?.Amount && <ErrorText />}
                        </Col>
                        <Col>
                          <Label>
                            {this.state.Cheque ? "Cheque Date" : "NEFT Date"}
                          </Label>
                          <Flatpickr
                            value={this.state.Date}
                            onChange={(date) => {
                              this.setState({ Date: date });
                            }}
                            placeholder={
                              this.state.Cheque ? "Cheque Date" : "NEFT Date"
                            }
                            className={`form-control form-control-sm ${
                              btnFlg && !this.state?.Date ? "invalid-input" : ""
                            }`}
                          />
                          {btnFlg && !this.state?.Date && <ErrorText />}
                        </Col>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Label>Beneficiary Name /Bank Name</Label>
                      <Input
                        // bsSize="sm"
                        type="text"
                        value={this.state.BankName ? this.state.BankName : ""}
                        onChange={(e) =>
                          this.setState({ BankName: e.target.value })
                        }
                        name=" BankName"
                        id=" BankName"
                        placeholder=" BankName"
                        className={`form-control form-control-sm ${
                          btnFlg && !this.state?.BankName ? "invalid-input" : ""
                        }`}
                      />
                      {btnFlg && !this.state?.BankName && <ErrorText />}
                    </Col>
                  </FormGroup>
                </>
              )}
              <FormGroup row>
                <Col>
                  <Label>Amount</Label>
                  <Input
                    // bsSize="sm"
                    type="text"
                    value={this.state.Amount ? this.state.Amount : ""}
                    onChange={(e) => this.setState({ Amount: e.target.value })}
                    name=" Amount"
                    id=" Amount"
                    placeholder=" Amount"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Amount ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.Amount && <ErrorText />}
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
    paymentToContractor: state.paymentToContractor,
  };
};

export default connect(mapStateToProps, {
  getPaymentToContractor,
  getPaymentToContractorDropDown,
  addPaymentToContractor,
})(PaymentToContractorNew);
