import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getCashReceipt,
  addCashReceipt,
  getCashReceiptDropDown,
  getCashReceiptAttachment,
} from "../../../../redux/actions/Account/CashReceipt";

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

class CashReceiptNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      PersonList: [],
      file: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCashReceiptDropDown(postData);
    this.props.getCashReceipt(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.cashReceipt.error !== this.props.cashReceipt.error &&
      this.props.cashReceipt.error
    ) {
      toast.error(this.props.cashReceipt.error);
    }
    if (
      prevProps.cashReceipt.successMsg !== this.props.cashReceipt.successMsg &&
      this.props.cashReceipt.successMsg
    ) {
      toast.success(this.props.cashReceipt.successMsg);
    }

    if (
      prevProps.cashReceipt.PersonList !== this.props.cashReceipt.PersonList
    ) {
      this.setState({
        PersonList:
          this.props.cashReceipt.PersonList &&
          this.props.cashReceipt.PersonList.length
            ? this.props.cashReceipt.PersonList
            : [],
      });
    }
    if (prevProps.cashReceipt.file !== this.props.cashReceipt.file) {
      this.setState({
        file:
          this.props.cashReceipt.file && this.props.cashReceipt.file.length
            ? this.props.cashReceipt.file
            : [],
      });
    }

    if (
      prevProps.cashReceipt.ProjectList !== this.props.cashReceipt.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.cashReceipt.ProjectList &&
          this.props.cashReceipt.ProjectList.length
            ? this.props.cashReceipt.ProjectList
            : [],
      });
    }

    if (
      prevProps.cashReceipt.data !== this.props.cashReceipt.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
   
      const filterData =
        this.props.cashReceipt.data &&
        this.props.cashReceipt.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        PersonID: filterData?.PersonID,
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
    const { Date, PersonID, ProjectID, Amount, Remarks, file, itemData } =
      this.state;

    if (Date && PersonID && ProjectID && Amount) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,

        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
        PersonID,
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
        await this.props.addCashReceipt({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addCashReceipt(postData);
      }
      await this.resetState();
      await history.push("/Account/CashReceipt");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Cash Receipt</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Account/CashReceipt")}
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
                    {this.state.ProjectList &&
                      this.state.ProjectList?.length > 0 &&
                      this.state.ProjectList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.ProjectName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.ProjectID && <ErrorText />}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label>Cash Given To</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="PersonIDSelect"
                    name="PersonIDSelect"
                    value={this.state?.PersonID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.PersonID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        PersonID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Person</option>
                    {this.state.PersonList &&
                      this.state.PersonList?.length > 0 &&
                      this.state.PersonList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.EmpName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.PersonID && <ErrorText />}
                </Col>
                <Col>
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
                  {btnFlg && !this.state?.Amount && <ErrorText />}
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
    cashReceipt: state.cashReceipt,
  };
};

export default connect(mapStateToProps, {
  getCashReceipt,
  getCashReceiptDropDown,
  addCashReceipt,
  getCashReceiptAttachment,
})(CashReceiptNew);
