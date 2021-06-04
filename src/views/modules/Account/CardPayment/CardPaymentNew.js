import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getCardPayment,
  addCardPayment,
  getCardPaymentDropDown,
} from "../../../../redux/actions/Account/CardPayment";

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

class CardPaymentNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      CardList: [],
      AccountList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCardPaymentDropDown(postData);
    this.props.getCardPayment(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.cardPayment.error !== this.props.cardPayment.error &&
      this.props.cardPayment.error
    ) {
      toast.error(this.props.cardPayment.error);
    }
    if (
      prevProps.cardPayment.successMsg !== this.props.cardPayment.successMsg &&
      this.props.cardPayment.successMsg
    ) {
      toast.success(this.props.cardPayment.successMsg);
    }

    if (
      prevProps.cardPayment.ProjectList !== this.props.cardPayment.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.cardPayment.ProjectList &&
          this.props.cardPayment.ProjectList.length
            ? this.props.cardPayment.ProjectList
            : [],
      });
    }

    if (prevProps.cardPayment.CardList !== this.props.cardPayment.CardList) {
      this.setState({
        CardList:
          this.props.cardPayment.CardList &&
          this.props.cardPayment.CardList.length
            ? this.props.cardPayment.CardList
            : [],
      });
    }

    if (
      prevProps.cardPayment.AccountList !== this.props.cardPayment.AccountList
    ) {
      this.setState({
        AccountList:
          this.props.cardPayment.AccountList &&
          this.props.cardPayment.AccountList.length
            ? this.props.cardPayment.AccountList
            : [],
      });
    }

    if (
      prevProps.cardPayment.data !== this.props.cardPayment.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.cardPayment.data &&
        this.props.cardPayment.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        ProjectID: filterData?.ProjectID,
        CardID: filterData?.CardID,
        AccountID: filterData?.AccountID,
        TotalAmount: filterData?.TotalAmount,
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
      CardID,
      AccountID,
      TotalAmount,
      Remarks,
      itemData,
    } = this.state;

    if (Date && ProjectID && CardID && AccountID && TotalAmount) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
        ProjectID,
        CardID,
        AccountID,
        TotalAmount,
        Remarks,
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
        await this.props.addCardPayment({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addCardPayment(postData);
      }
      await this.resetState();
      await history.push("/Account/CardPayment");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, ProjectList, AccountList, CardList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Card Payment</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Account/CardPayment")}
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
                    {this.state.CardList &&
                      this.state.CardList?.length > 0 &&
                      this.state.CardList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.CardNo}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.CardID && <ErrorText />}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label>Respected Person</Label>
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
                <Col>
                  <Label>Account Name</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="AccountIDSelect"
                    name="AccountIDSelect"
                    value={this.state?.AccountID}
                    className={`p-0 pl-1
                    ${
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
                    <option value="0">Select Account Name</option>
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
                  <Label>TotalAmount</Label>
                  <Input
                    type="text"
                    value={this.state.TotalAmount ? this.state.TotalAmount : ""}
                    onChange={(e) =>
                      this.setState({ TotalAmount: e.target.value })
                    }
                    name="TotalAmount"
                    id="TotalAmount"
                    placeholder="Amount"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.TotalAmount ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.TotalAmount && <ErrorText />}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label>Remarks</Label>
                  <Input
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
    cardPayment: state.cardPayment,
  };
};

export default connect(mapStateToProps, {
  getCardPayment,
  getCardPaymentDropDown,
  addCardPayment,
})(CardPaymentNew);
