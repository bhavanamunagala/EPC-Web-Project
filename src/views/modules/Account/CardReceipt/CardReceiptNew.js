import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getCardReceipt,
  addCardReceipt,
  getCardReceiptDropDown,
} from "../../../../redux/actions/Account/CardReceipt";

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

class CardReceiptNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      CardList: [],
      ProjectList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCardReceiptDropDown(postData);
    this.props.getCardReceipt(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.cardReceipt.error !== this.props.cardReceipt.error &&
      this.props.cardReceipt.error
    ) {
      toast.error(this.props.cardReceipt.error);
    }
    if (
      prevProps.cardReceipt.successMsg !== this.props.cardReceipt.successMsg &&
      this.props.cardReceipt.successMsg
    ) {
      toast.success(this.props.cardReceipt.successMsg);
    }

    if (prevProps.cardReceipt.CardList !== this.props.cardReceipt.CardList) {
      this.setState({
        CardList:
          this.props.cardReceipt.CardList &&
          this.props.cardReceipt.CardList.length
            ? this.props.cardReceipt.CardList
            : [],
      });
    }

    if (
      prevProps.cardReceipt.ProjectList !== this.props.cardReceipt.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.cardReceipt.ProjectList &&
          this.props.cardReceipt.ProjectList.length
            ? this.props.cardReceipt.ProjectList
            : [],
      });
    }

    if (
      prevProps.cardReceipt.data !== this.props.cardReceipt.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.cardReceipt.data &&
        this.props.cardReceipt.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        CardID: filterData?.CardID,
        ProjectID: filterData?.ProjectID,
        Amount: filterData?.Amount,
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
    const { Date, CardID, ProjectID, Amount, Remarks, file, itemData } =
      this.state;

    if (Date && CardID && ProjectID && Amount) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
        CardID,
        ProjectID,
        Amount,
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
        await this.props.addCardReceipt({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addCardReceipt(postData);
      }
      await this.resetState();
      await history.push("/Account/CardReceipt");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, ProjectList, CardList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Card Receipt</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Account/CardReceipt")}
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
              </FormGroup>
              <FormGroup row>
                <Col sm="8">
                  <Label>Person Name</Label>
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
                <Col sm="4">
                  <Label>Amount</Label>
                  <Input
                    // bsSize="sm"
                    type="text"
                    value={this.state.Amount ? this.state.Amount : ""}
                    onChange={(e) => this.setState({ Amount: e.target.value })}
                    name="Amount"
                    id="Amount"
                    placeholder="Amount"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Amount ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.PolicyNo && <ErrorText />}
                </Col>
              </FormGroup>
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
                    <Label for="POAttchment">Attachment Document</Label>
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
    cardReceipt: state.cardReceipt,
  };
};

export default connect(mapStateToProps, {
  getCardReceipt,
  getCardReceiptDropDown,
  addCardReceipt,
})(CardReceiptNew);
