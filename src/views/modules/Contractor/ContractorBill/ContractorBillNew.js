import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getContractorBill,
  addContractorBill,
  getContractorBillDropDown,
} from "../../../../redux/actions/Contractor/ContractorBill";

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

class ContractorBillNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      ContractorList: [],
      WorkOrderList: [],
      ItemList: [],
      UnitList: [],
      TaxList: [],
      AccountList: [],
      CBExcises: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getContractorBillDropDown(postData);
    this.props.getContractorBill(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.contractorBill.error !== this.props.contractorBill.error &&
      this.props.contractorBill.error
    ) {
      toast.error(this.props.contractorBill.error);
    }
    if (
      prevProps.contractorBill.successMsg !==
        this.props.contractorBill.successMsg &&
      this.props.contractorBill.successMsg
    ) {
      toast.success(this.props.contractorBill.successMsg);
    }

    if (
      prevProps.contractorBill.ProjectList !==
      this.props.contractorBill.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.contractorBill.ProjectList &&
          this.props.contractorBill.ProjectList.length
            ? this.props.contractorBill.ProjectList
            : [],
      });
    }
    if (
      prevProps.contractorBill.ContractorList !==
      this.props.contractorBill.ContractorList
    ) {
      this.setState({
        ContractorList:
          this.props.contractorBill.ContractorList &&
          this.props.contractorBill.ContractorList.length
            ? this.props.contractorBill.ContractorList
            : [],
      });
    }
    if (
      prevProps.contractorBill.WorkOrderList !==
      this.props.contractorBill.WorkOrderList
    ) {
      this.setState({
        WorkOrderList:
          this.props.contractorBill.WorkOrderList &&
          this.props.contractorBill.WorkOrderList.length
            ? this.props.contractorBill.WorkOrderList
            : [],
      });
    }
    if (
      prevProps.contractorBill.ItemList !== this.props.contractorBill.ItemList
    ) {
      this.setState({
        ItemList:
          this.props.contractorBill.ItemList &&
          this.props.contractorBill.ItemList.length
            ? this.props.contractorBill.ItemList
            : [],
      });
    }
    if (
      prevProps.contractorBill.UnitList !== this.props.contractorBill.UnitList
    ) {
      this.setState({
        UnitList:
          this.props.contractorBill.UnitList &&
          this.props.contractorBill.UnitList.length
            ? this.props.contractorBill.UnitList
            : [],
      });
    }
    if (
      prevProps.contractorBill.TaxList !== this.props.contractorBill.TaxList
    ) {
      this.setState({
        TaxList:
          this.props.contractorBill.TaxList &&
          this.props.contractorBill.TaxList.length
            ? this.props.contractorBill.TaxList
            : [],
      });
    }
    if (
      prevProps.contractorBill.AccountList !==
      this.props.contractorBill.AccountList
    ) {
      this.setState({
        AccountList:
          this.props.contractorBill.AccountList &&
          this.props.contractorBill.AccountList.length
            ? this.props.contractorBill.AccountList
            : [],
      });
    }

    if (
      prevProps.contractorBill.data !== this.props.contractorBill.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.contractorBill.data &&
        this.props.contractorBill.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        PolicyNo: filterData?.PolicyNo,
        Date: filterData?.Date,
        EndDate: filterData?.EndDate,
        VehicleType: filterData?.VehicleType,
        ProjectID: filterData?.ProjectID,
        ContractorBillCompany: filterData?.ContractorBillCompany,
        Amount: filterData?.Amount,
        ReminderDate: filterData?.ReminderDate,
        Remarks: filterData?.Remarks,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  onTaxInputChange = (value, name, id) => {
    const exist = this.state.CBExcises?.filter((data) => {
      return data.IDNumber === id;
    })?.[0];
    const unique = this.state.CBExcises?.filter((data) => {
      return data.IDNumber !== id;
    });
    exist[name] = value;

    this.setState({
      CBExcises: [
        ...unique,
        {
          ...exist,
          [name]: value,
        },
      ],
    });
  };

  handleTaxOperation = (data) => {
    let { CBExcises } = this.state;
    CBExcises.push({
      AccessableValue: null,
      AccountID: this.state.AccountID,
      Amount: this.state.TaxAmount,
      AmountBase: this.state.TaxAmount,
      AmountWithIT: 0,
      BaseCurrAmount: 1,
      BillDate: null,
      BillNo: null,
      CashBankID: 15,
      ChequeDate: null,
      ChequeNo: null,
      CurrencyIDNumber: 1,
      DebitExpAccountID: null,
      ExpenseAmount: 0,
      IDNumber: 0,
      IsDebitActReq: null,
      ItemID: this.state.ItemID,
      CBIDNumber: 0,
      Percentage: this.state.Percentage,
      PurExpIDNumber: 125,
      Remarks: this.state.TaxRemarks,
      TaxID: this.state.TaxID,
      ValueType: this.state.ValueType,
      ValueTypeName: this.state.ValueTypeName,
      CreatedDate: moment(),
      CreatedBy:
        localStorage.getItem("userData") &&
        JSON.parse(localStorage.getItem("userData")).IDNumber,
      UpdatedBy:
        localStorage.getItem("userData") &&
        JSON.parse(localStorage.getItem("userData")).IDNumber,
      UpdatedDate: moment(),
    });
    this.setState({
      CBExcises,
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
      PolicyNo,
      Date,
      EndDate,
      VehicleType,
      ProjectID,
      ContractorBillCompany,
      Amount,
      ReminderDate,
      Remarks,
      itemData,
    } = this.state;

    if (
      PolicyNo &&
      Date &&
      EndDate &&
      VehicleType &&
      ProjectID &&
      ContractorBillCompany &&
      Amount &&
      ReminderDate
    ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,

        PolicyNo,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
        EndDate:
          typeof EndDate === "object"
            ? moment(EndDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.EndDate,
        VehicleType,
        ProjectID,
        ContractorBillCompany,
        Amount,
        ReminderDate:
          typeof ReminderDate === "object"
            ? moment(ReminderDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.ReminderDate,
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
        await this.props.addContractorBill({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addContractorBill(postData);
      }
      await this.resetState();
      await history.push("/Contractor/ContractorBill");
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
      ItemList,
      UnitList,
      TaxList,
      AccountList,
      CBExcises,
      file,
    } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Contractor Bill</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Contractor/ContractorBill")}
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
                  <Label>WorkOrder No.</Label>
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
                    <option value="0">Select WorkOrder</option>
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
                  <Label>Item</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="ItemIDSelect"
                    name="ItemIDSelect"
                    value={this.state?.ItemID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.ItemID === 0 ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        ItemID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Item</option>
                    {ItemList &&
                      ItemList?.length > 0 &&
                      ItemList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.ItemName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.ItemID && <ErrorText />}
                </Col>
                <Col>
                  <Label>Unit</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="UnitIDSelect"
                    name="UnitIDSelect"
                    value={this.state?.UnitID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.UnitID === 0 ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        UnitID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Unit</option>
                    {UnitList &&
                      UnitList?.length > 0 &&
                      UnitList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.UnitName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.UnitID && <ErrorText />}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label>Qty</Label>
                  <Input
                    type="text"
                    value={this.state.Qty ? this.state.Qty : ""}
                    onChange={(e) => this.setState({ Qty: e.target.value })}
                    name="Qty"
                    id="Qty"
                    placeholder="Qty"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Qty ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.Qty && <ErrorText />}
                </Col>
                <Col>
                  <Label>Amount</Label>
                  <Input
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
                <div className="w-100 mt-1 taxDetail">
                  <FormGroup className="pr-2">
                    <Row key={"POExcises"}>
                      <Col>
                        <Label></Label>
                      </Col>
                      <Col>
                        <Label>Taxes/Duties</Label>
                      </Col>
                      <Col>
                        <Label>Percentage</Label>
                      </Col>
                      <Col>
                        <Label>Value Type</Label>
                      </Col>
                      <Col>
                        <Label>BaseAmount</Label>
                      </Col>
                      <Col>
                        <Label>Amount</Label>
                      </Col>
                      <Col>
                        <Label>Remarks</Label>
                      </Col>
                    </Row>
                    {CBExcises?.length > 0 &&
                      CBExcises.map((txtData, i) => (
                        <React.Fragment key={"POExcises" + txtData.IDNumber}>
                          <Row className="mt-1">
                            <Col className=" text-center">
                              <Button
                                color="danger"
                                className="cursor-pointer action-btn"
                                size="sm"
                                onClick={() => {
                                  let itemIndex = this.state.PODetails.map(
                                    (d, i) => d.ItemID === txtData.ItemID
                                  );
                                  let objectIndex = CBExcises.findIndex(
                                    (d) => d.IDNumber === txtData.IDNumber
                                  );
                                  txtData.POExcises.splice(objectIndex, 1);
                                  let tmpPODetails = [...this.state.PODetails];
                                  tmpPODetails[itemIndex] = {
                                    ...tmpPODetails[itemIndex],
                                    DeletedPOExcises:
                                      tmpPODetails[itemIndex]
                                        ?.DeletedPOExcises +
                                      "," +
                                      txtData.IDNumber,
                                  };
                                  this.setState({
                                    PODetails: tmpPODetails,
                                    TaxTotal:
                                      this.state.TaxTotal -
                                      tmpPODetails[itemIndex]?.Amount,
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
                                id={"TaxIDSelect" + i}
                                name={"TaxIDSelect" + i}
                                value={txtData?.TaxID ? txtData?.TaxID : 0}
                                className={"p-0 pl-1"}
                                onChange={(e) => {
                                  this.onTaxInputChange(
                                    e.target.value,
                                    "TaxID",
                                    txtData?.IDNumber
                                  );
                                }}
                                disabled
                              >
                                <option value="0">Select Tax</option>
                                {TaxList &&
                                  TaxList?.length > 0 &&
                                  TaxList.map((d, i) => (
                                    <option value={d.IDNumber} key={d.IDNumber}>
                                      {d.Name}
                                    </option>
                                  ))}
                              </CustomInput>
                            </Col>

                            <Col>
                              <Input
                                bsSize="sm"
                                type="number"
                                value={
                                  txtData?.Percentage ? txtData?.Percentage : ""
                                }
                                onChange={(e) =>
                                  this.onTaxInputChange(
                                    e.target.value,
                                    "Percentage",
                                    txtData?.IDNumber
                                  )
                                }
                                name={"value" + i}
                                placeholder="value"
                                disabled={
                                  txtData.ValueType === 1 ? true : false
                                }
                              />
                            </Col>

                            <Col>
                              <Input
                                bsSize="sm"
                                type="text"
                                value={
                                  txtData?.ValueTypeName
                                    ? txtData?.ValueTypeName
                                    : ""
                                }
                                onChange={(e) =>
                                  this.onTaxInputChange(
                                    e.target.value,
                                    "ValueTypeName",
                                    txtData?.IDNumber
                                  )
                                }
                                name={"ValueTypeName" + i}
                                placeholder="ValueTypeName"
                                disabled
                              />
                            </Col>

                            <Col>
                              <Input
                                bsSize="sm"
                                type="number"
                                value={txtData?.Amount ? txtData?.Amount : ""}
                                onChange={(e) =>
                                  this.onTaxInputChange(
                                    e.target.value,
                                    "Amount",
                                    txtData?.IDNumber
                                  )
                                }
                                name={"Amount" + i}
                                placeholder="Amount"
                                disabled
                              />
                            </Col>

                            <Col>
                              <Input
                                bsSize="sm"
                                type="number"
                                value={txtData?.Amount ? txtData?.Amount : ""}
                                onChange={(e) =>
                                  this.onTaxInputChange(
                                    e.target.value,
                                    "Amount",
                                    txtData?.IDNumber
                                  )
                                }
                                name={"Amount" + i}
                                placeholder="Amount"
                                disabled
                              />
                            </Col>
                            <Col>
                              <Input
                                bsSize="sm"
                                type="text"
                                value={txtData?.Remarks ? txtData?.Remarks : ""}
                                onChange={(e) =>
                                  this.onTaxInputChange(
                                    e.target.value,
                                    "Remarks",
                                    txtData?.IDNumber
                                  )
                                }
                                name="Remarks"
                                placeholder="Remarks"
                              />
                            </Col>
                          </Row>
                        </React.Fragment>
                      ))}
                    <Row className="mt-1">
                      <Col className=" text-center">
                        <Button
                          size="sm"
                          color="primary"
                          className="cursor-pointer action-btn mr-1"
                          style={{ height: "24px" }}
                          onClick={() => this.handleTaxOperation()}
                        >
                          Add Tax
                        </Button>
                      </Col>

                      <Col>
                        <CustomInput
                          bsSize="sm"
                          type="select"
                          id={"TaxIDSelect"}
                          name={"TaxIDSelect"}
                          value={this.state?.TaxID ? this.state?.TaxID : 0}
                          className={"p-0 pl-1"}
                          onChange={(e) => {
                            let index = TaxList.findIndex(
                              (d) => d.IDNumber === parseInt(e.target.value)
                            );

                            this.setState({
                              TaxID: parseInt(e.target.value),
                              AccountID: TaxList[index]?.AccountID,
                              Percentage: TaxList[index]?.Percentage,
                              ValueType: TaxList[index]?.ValueType,
                              ValueTypeName: TaxList[index]?.ValueTypeName,
                              // TaxAmount:
                              //   (this.state. * TaxList[index]?.Percentage) /
                              //   100,
                            });
                          }}
                        >
                          <option value="0">Select Tax</option>
                          {TaxList &&
                            TaxList?.length > 0 &&
                            TaxList.map((d, i) => (
                              <option value={d.IDNumber} key={d.IDNumber}>
                                {d.Name}
                              </option>
                            ))}
                        </CustomInput>
                      </Col>

                      <Col>
                        <Input
                          bsSize="sm"
                          type="number"
                          value={
                            this.state?.Percentage ? this.state?.Percentage : ""
                          }
                          onChange={(e) =>
                            this.setState({
                              Percentage: parseInt(e.target.value),
                              // TaxAmount:
                              //   (data.Amount * parseInt(e.target.value)) / 100,
                            })
                          }
                          name={"Percentage"}
                          placeholder="Percentage"
                          disabled={this.state.ValueType === 1 ? true : false}
                        />
                      </Col>

                      <Col>
                        <Input
                          bsSize="sm"
                          type="text"
                          value={
                            this.state?.ValueTypeName
                              ? this.state?.ValueTypeName
                              : ""
                          }
                          name={"ValueTypeName"}
                          placeholder="ValueTypeName"
                          disabled
                        />
                      </Col>

                      <Col>
                        <Input
                          bsSize="sm"
                          type="number"
                          value={
                            this.state?.TaxAmount ? this.state?.TaxAmount : ""
                          }
                          onChange={(e) => this.onChange(e, "TaxAmount")}
                          name={"TaxAmount"}
                          placeholder="TaxAmount"
                          disabled
                        />
                      </Col>

                      <Col>
                        <Input
                          bsSize="sm"
                          type="number"
                          value={
                            this.state?.TaxAmount ? this.state?.TaxAmount : ""
                          }
                          onChange={(e) => this.onChange(e, "TaxAmount")}
                          name={"TaxAmount"}
                          placeholder="TaxAmount"
                        />
                      </Col>
                      <Col>
                        <Input
                          bsSize="sm"
                          type="text"
                          value={
                            this.state?.TaxRemarks ? this.state?.TaxRemarks : ""
                          }
                          onChange={(e) => this.onChange(e, "TaxRemarks")}
                          name="TaxRemarks"
                          placeholder="TaxRemarks"
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </div>
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
                <Col>
                  <FormGroup check inline>
                    <Input
                      size="sm"
                      type="checkbox"
                      onChange={(e) =>
                        this.setState({
                          Approval: e.target.checked,
                        })
                      }
                      checked={this.state.Approval}
                    />
                    <Label className="mb-0"> Approval</Label>
                  </FormGroup>
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
    contractorBill: state.contractorBill,
  };
};

export default connect(mapStateToProps, {
  getContractorBill,
  getContractorBillDropDown,
  addContractorBill,
})(ContractorBillNew);
