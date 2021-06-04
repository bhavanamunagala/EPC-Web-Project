import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getLeagalPayment,
  addLeagalPayment,
  getLeagalPaymentDropDown,
} from "../../../../redux/actions/Account/LeagalPayment";

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

class LeagalPaymentNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      Leagal: true,
      Government: false,
      Cash: true,
      Bank: false,
      Cheque: false,
      NEFT: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getLeagalPaymentDropDown(postData);
    this.props.getLeagalPayment(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.leagalPayment.error !== this.props.leagalPayment.error &&
      this.props.leagalPayment.error
    ) {
      toast.error(this.props.leagalPayment.error);
    }
    if (
      prevProps.leagalPayment.successMsg !==
        this.props.leagalPayment.successMsg &&
      this.props.leagalPayment.successMsg
    ) {
      toast.success(this.props.leagalPayment.successMsg);
    }

    if (
      prevProps.leagalPayment.ProjectList !==
      this.props.leagalPayment.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.leagalPayment.ProjectList &&
          this.props.leagalPayment.ProjectList.length
            ? this.props.leagalPayment.ProjectList
            : [],
      });
    }

    if (
      prevProps.leagalPayment.data !== this.props.leagalPayment.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.leagalPayment.data &&
        this.props.leagalPayment.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        ProjectID: filterData?.ProjectID,
        Leagal: filterData?.Leagal,
        Government: filterData?.Government,
        Cash: filterData?.Cash === 1 ? true : false,
        Bank: filterData?.Bank === 1 ? true : false,
        Cheque: filterData?.Cheque === 1 ? true : false,
        NEFT: filterData?.NEFT === 1 ? true : false,
        ChequeNo: filterData?.ChequeNo,
        ChequeDate: filterData?.ChequeDate,
        UTRNo: filterData?.UTRNo,
        NEFTDate: filterData?.NEFTDate,
        BeneficiaryName: filterData?.BeneficiaryName,
        BankName: filterData?.BankName,
        Amount: filterData?.Amount,
        PersonName: filterData?.PersonName,
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
      ProjectID,
      Leagal,
      Government,
      Cash,
      Bank,
      Cheque,
      NEFT,
      ChequeNo,
      ChequeDate,
      UTRNo,
      NEFTDate,
      BeneficiaryName,
      BankName,
      Amount,
      PersonName,
      Remarks,
      file,
      itemData,
    } = this.state;

    if (Date) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
        ProjectID,
        Leagal: Leagal ? 1 : 0,
        Government: Government ? 1 : 0,
        Cash: Cash ? 1 : 0,
        Bank: Bank ? 1 : 0,
        Cheque: Cheque ? 1 : 0,
        NEFT: NEFT ? 1 : 0,
        ChequeNo: ChequeNo ? ChequeNo : "",
        ChequeDate: ChequeDate
          ? typeof ChequeDate === "object"
            ? moment(ChequeDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.ChequeDate
          : null,
        UTRNo: UTRNo ? UTRNo : "",
        NEFTDate: NEFTDate
          ? typeof NEFTDate === "object"
            ? moment(NEFTDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.NEFTDate
          : null,
        BeneficiaryName: BeneficiaryName ? BeneficiaryName : "",
        BankName: BankName ? BankName : "",
        Amount,
        PersonName,
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
        await this.props.addLeagalPayment({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addLeagalPayment(postData);
      }
      await this.resetState();
      await history.push("/Account/LeagalPayment");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, ProjectList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Leagal Cash / Bank Payment</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Account/LeagalPayment")}
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
                  <Row className="justify-content-start align-items-center py-1 mt-25">
                    <FormGroup check inline>
                      <Input
                        bsSize="sm"
                        type="radio"
                        name="LeagalType"
                        onChange={(e) =>
                          this.setState({
                            Leagal: true,
                            Government: false,
                          })
                        }
                        checked={this.state.Leagal}
                      />
                      <Label className="mb-0"> Leagal</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        bsSize="sm"
                        type="radio"
                        name="LeagalType"
                        onChange={(e) =>
                          this.setState({
                            Leagal: false,
                            Government: true,
                          })
                        }
                        checked={this.state.Government}
                      />
                      <Label className="mb-0">Government</Label>
                    </FormGroup>
                  </Row>
                </Col>
              </FormGroup>

              <Row className="border justify-content-start align-items-center py-1 pl-1">
                <FormGroup check inline>
                  <Input
                    bsSize="sm"
                    type="radio"
                    name="Payment"
                    onChange={(e) =>
                      this.setState({
                        Cash: true,
                        Bank: false,
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
                        Bank: true,
                        Cash: false,
                      })
                    }
                    checked={this.state.Bank}
                  />
                  <Label className="mb-0">Bank</Label>
                </FormGroup>
              </Row>

              {this.state.Cash ? (
                <FormGroup row>
                  <Col sm="4">
                    <Label>Amount</Label>
                    <Input
                      // bsSize="sm"
                      type="text"
                      value={this.state.Amount ? this.state.Amount : ""}
                      onChange={(e) =>
                        this.setState({ Amount: e.target.value })
                      }
                      name=" Amount"
                      id=" Amount"
                      placeholder=" Amount"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.Amount ? "invalid-input" : ""
                      }`}
                    />
                    {btnFlg && !this.state?.Amount && <ErrorText />}
                  </Col>
                  <Col sm="8">
                    <Label>PersonName</Label>
                    <Input
                      // bsSize="sm"
                      type="text"
                      value={this.state.PersonName ? this.state.PersonName : ""}
                      onChange={(e) =>
                        this.setState({ PersonName: e.target.value })
                      }
                      name=" PersonName"
                      id=" PersonName"
                      placeholder=" PersonName"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.PersonName ? "invalid-input" : ""
                      }`}
                    />
                    {btnFlg && !this.state?.PersonName && <ErrorText />}
                  </Col>
                </FormGroup>
              ) : (
                ""
              )}
              {this.state.Bank ? (
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
                    <Col sm="4">
                      <Label>Amount</Label>
                      <Input
                        // bsSize="sm"
                        type="text"
                        value={this.state.Amount ? this.state.Amount : ""}
                        onChange={(e) =>
                          this.setState({ Amount: e.target.value })
                        }
                        name=" Amount"
                        id=" Amount"
                        placeholder=" Amount"
                        className={`form-control form-control-sm ${
                          btnFlg && !this.state?.Amount ? "invalid-input" : ""
                        }`}
                      />
                      {btnFlg && !this.state?.Amount && <ErrorText />}
                    </Col>
                  </FormGroup>
                </>
              ) : (
                ""
              )}
              <FormGroup row>
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
    leagalPayment: state.leagalPayment,
  };
};

export default connect(mapStateToProps, {
  getLeagalPayment,
  getLeagalPaymentDropDown,
  addLeagalPayment,
})(LeagalPaymentNew);
