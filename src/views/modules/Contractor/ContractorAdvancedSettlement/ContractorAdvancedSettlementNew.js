import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getContractorAdvancedSettlement,
  addContractorAdvancedSettlement,
  getContractorAdvancedSettlementDropDown,
} from "../../../../redux/actions/Contractor/ContractorAdvancedSettlement";

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

class ContractorAdvancedSettlementNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      ContractorList: [],
      WorkOrderList: [],
      RequestList: [],
      BillList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getContractorAdvancedSettlementDropDown(postData);
    this.props.getContractorAdvancedSettlement(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.contractorAdvancedSettlement.error !==
        this.props.contractorAdvancedSettlement.error &&
      this.props.contractorAdvancedSettlement.error
    ) {
      toast.error(this.props.contractorAdvancedSettlement.error);
    }
    if (
      prevProps.contractorAdvancedSettlement.successMsg !==
        this.props.contractorAdvancedSettlement.successMsg &&
      this.props.contractorAdvancedSettlement.successMsg
    ) {
      toast.success(this.props.contractorAdvancedSettlement.successMsg);
    }
    if (
      prevProps.contractorAdvancedSettlement.ProjectList !==
      this.props.contractorAdvancedSettlement.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.contractorAdvancedSettlement.ProjectList &&
          this.props.contractorAdvancedSettlement.ProjectList.length
            ? this.props.contractorAdvancedSettlement.ProjectList
            : [],
      });
    }
    if (
      prevProps.contractorAdvancedSettlement.ContractorList !==
      this.props.contractorAdvancedSettlement.ContractorList
    ) {
      this.setState({
        ContractorList:
          this.props.contractorAdvancedSettlement.ContractorList &&
          this.props.contractorAdvancedSettlement.ContractorList.length
            ? this.props.contractorAdvancedSettlement.ContractorList
            : [],
      });
    }
    if (
      prevProps.contractorAdvancedSettlement.WorkOrderList !==
      this.props.contractorAdvancedSettlement.WorkOrderList
    ) {
      this.setState({
        WorkOrderList:
          this.props.contractorAdvancedSettlement.WorkOrderList &&
          this.props.contractorAdvancedSettlement.WorkOrderList.length
            ? this.props.contractorAdvancedSettlement.WorkOrderList
            : [],
      });
    }
    if (
      prevProps.contractorAdvancedSettlement.RequestList !==
      this.props.contractorAdvancedSettlement.RequestList
    ) {
      this.setState({
        RequestList:
          this.props.contractorAdvancedSettlement.RequestList &&
          this.props.contractorAdvancedSettlement.RequestList.length
            ? this.props.contractorAdvancedSettlement.RequestList
            : [],
      });
    }
    if (
      prevProps.contractorAdvancedSettlement.BillList !==
      this.props.contractorAdvancedSettlement.BillList
    ) {
      this.setState({
        BillList:
          this.props.contractorAdvancedSettlement.BillList &&
          this.props.contractorAdvancedSettlement.BillList.length
            ? this.props.contractorAdvancedSettlement.BillList
            : [],
      });
    }

    if (
      prevProps.contractorAdvancedSettlement.data !==
        this.props.contractorAdvancedSettlement.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.contractorAdvancedSettlement.data &&
        this.props.contractorAdvancedSettlement.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        PolicyNo: filterData?.PolicyNo,
        Date: filterData?.Date,
        EndDate: filterData?.EndDate,
        VehicleType: filterData?.VehicleType,
        ProjectID: filterData?.ProjectID,
        ContractorAdvancedSettlementCompany:
          filterData?.ContractorAdvancedSettlementCompany,
        Amount: filterData?.Amount,
        ReminderDate: filterData?.ReminderDate,
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
      RequestID,
      BillID,
      Amount,
      Remarks,
      itemData,
    } = this.state;

    if (
      Date &&
      ProjectID &&
      ContractorID &&
      WorkOrderID &&
      RequestID &&
      BillID &&
      Amount
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
        ContractorID,
        WorkOrderID,
        RequestID,
        BillID,
        Amount,
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
        await this.props.addContractorAdvancedSettlement({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addContractorAdvancedSettlement(postData);
      }
      await this.resetState();
      await history.push("/Contractor/ContractorAdvanceSettlement");
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
      ProjectList,
      ContractorList,
      WorkOrderList,
      RequestList,
      BillList,
    } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Contractor Advanced Settlement</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() =>
                history.push("/Contractor/ContractorAdvanceSettlement")
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
                <Col>
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
                <Col>
                  <Label>Request No.</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="RequestIDSelect"
                    name="RequestIDSelect"
                    value={this.state?.RequestID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.RequestID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        RequestID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select RequestNo</option>
                    {RequestList &&
                      RequestList?.length > 0 &&
                      RequestList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.RequestNo}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.RequestID && <ErrorText />}
                </Col>
                <Col>
                  <Label>Bill No.</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="BillIDSelect"
                    name="BillIDSelect"
                    value={this.state?.BillID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.BillID === 0 ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        BillID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select BillNo</option>
                    {BillList &&
                      BillList?.length > 0 &&
                      BillList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.BillNo}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.BillID && <ErrorText />}
                </Col>
              </FormGroup>

              <FormGroup row>
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
    contractorAdvancedSettlement: state.contractorAdvancedSettlement,
  };
};

export default connect(mapStateToProps, {
  getContractorAdvancedSettlement,
  getContractorAdvancedSettlementDropDown,
  addContractorAdvancedSettlement,
})(ContractorAdvancedSettlementNew);
