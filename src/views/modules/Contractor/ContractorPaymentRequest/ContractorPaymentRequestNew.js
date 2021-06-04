import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getContractorPaymentRequest,
  addContractorPaymentRequest,
  getContractorPaymentRequestDropDown,
} from "../../../../redux/actions/Contractor/ContractorPaymentRequest";

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

class ContractorPaymentRequestNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      ContractorList: [],
      WorkOrderList: [],
      BillList: [],
      AgainstBill: true,
      Advance: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getContractorPaymentRequestDropDown(postData);
    this.props.getContractorPaymentRequest(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.contractorPaymentRequest.error !==
        this.props.contractorPaymentRequest.error &&
      this.props.contractorPaymentRequest.error
    ) {
      toast.error(this.props.contractorPaymentRequest.error);
    }
    if (
      prevProps.contractorPaymentRequest.successMsg !==
        this.props.contractorPaymentRequest.successMsg &&
      this.props.contractorPaymentRequest.successMsg
    ) {
      toast.success(this.props.contractorPaymentRequest.successMsg);
    }

    if (
      prevProps.contractorPaymentRequest.ProjectList !==
      this.props.contractorPaymentRequest.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.contractorPaymentRequest.ProjectList &&
          this.props.contractorPaymentRequest.ProjectList.length
            ? this.props.contractorPaymentRequest.ProjectList
            : [],
      });
    }
    if (
      prevProps.contractorPaymentRequest.ContractorList !==
      this.props.contractorPaymentRequest.ContractorList
    ) {
      this.setState({
        ContractorList:
          this.props.contractorPaymentRequest.ContractorList &&
          this.props.contractorPaymentRequest.ContractorList.length
            ? this.props.contractorPaymentRequest.ContractorList
            : [],
      });
    }
    if (
      prevProps.contractorPaymentRequest.WorkOrderList !==
      this.props.contractorPaymentRequest.WorkOrderList
    ) {
      this.setState({
        WorkOrderList:
          this.props.contractorPaymentRequest.WorkOrderList &&
          this.props.contractorPaymentRequest.WorkOrderList.length
            ? this.props.contractorPaymentRequest.WorkOrderList
            : [],
      });
    }
    if (
      prevProps.contractorPaymentRequest.BillList !==
      this.props.contractorPaymentRequest.BillList
    ) {
      this.setState({
        BillList:
          this.props.contractorPaymentRequest.BillList &&
          this.props.contractorPaymentRequest.BillList.length
            ? this.props.contractorPaymentRequest.BillList
            : [],
      });
    }

    if (
      prevProps.contractorPaymentRequest.data !==
        this.props.contractorPaymentRequest.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.contractorPaymentRequest.data &&
        this.props.contractorPaymentRequest.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        ProjectID: filterData?.ProjectID,
        ContractorID: filterData?.ContractorID,
        WorkOrderID: filterData?.WorkOrderID,
        Advance: filterData?.Advance,
        AgainstBill: filterData?.AgainstBill,
        BillNoID: filterData?.BillNoID,
        Amount: filterData?.Amount,
        Remarks: filterData?.Remarks,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const {
      Date,
      ProjectID,
      ContractorID,
      WorkOrderID,
      Advance,
      AgainstBill,
      BillNoID,
      Amount,
      Remarks,
      itemData,
    } = this.state;

    if (Date && ProjectID && ContractorID && WorkOrderID && Amount) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
        ProjectID,
        ContractorID,
        WorkOrderID,
        Advance: Advance ? 1 : 0,
        AgainstBill: AgainstBill ? 1 : 0,
        BillNoID,
        Amount,
        Remarks,
        IsApproved: 0,
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
        await this.props.addContractorPaymentRequest({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addContractorPaymentRequest(postData);
      }
      await this.resetState();
      await history.push("/Contractor/ContractorPaymentRequest");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, ProjectList, ContractorList, WorkOrderList, BillList } =
      this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Contractor Payment Request</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() =>
                history.push("/Contractor/ContractorPaymentRequest")
              }
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
                  <Label>Contractor Name</Label>
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
              <FormGroup row>
                <Col sm="4">
                  <Label>Workorder No.</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="WorkOrderIDSelect"
                    name="WorkOrderIDSelect"
                    value={this.state?.WorkOrderID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.WorkOrderID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        WorkOrderID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Workorder</option>
                    {WorkOrderList &&
                      WorkOrderList?.length > 0 &&
                      WorkOrderList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.WoNo}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.WorkOrderID && <ErrorText />}
                </Col>
                <Col sm="8">
                  <Row className=" justify-content-start align-items-center py-1 pl-1">
                    <FormGroup check inline>
                      <Input
                        bsSize="sm"
                        type="radio"
                        name="Payment"
                        onChange={(e) =>
                          this.setState({
                            Advance: true,
                            AgainstBill: false,
                          })
                        }
                        checked={this.state.Advance}
                      />
                      <Label className="mb-0"> Advance</Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        bsSize="sm"
                        type="radio"
                        name="Payment"
                        onChange={(e) =>
                          this.setState({
                            AgainstBill: true,
                            Advance: false,
                          })
                        }
                        checked={this.state.AgainstBill}
                      />
                      <Label className="mb-0">Against Bill</Label>
                    </FormGroup>
                  </Row>
                </Col>
              </FormGroup>
              <FormGroup row>
                {this.state.AgainstBill ? (
                  <Col>
                    <Label>Bill No.</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="BillNoIDSelect"
                      name="BillNoIDSelect"
                      value={this.state?.BillNoID}
                      className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.BillNoID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                      onChange={(e) => {
                        this.setState({
                          BillNoID: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">Select Bill No.</option>
                      {BillList &&
                        BillList?.length > 0 &&
                        BillList.map((d, i) => (
                          <option value={d.IDNumber} key={d.IDNumber}>
                            {d.BillNo}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.BillNoID && <ErrorText />}
                  </Col>
                ) : (
                  ""
                )}
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
    contractorPaymentRequest: state.contractorPaymentRequest,
  };
};

export default connect(mapStateToProps, {
  getContractorPaymentRequest,
  getContractorPaymentRequestDropDown,
  addContractorPaymentRequest,
})(ContractorPaymentRequestNew);
