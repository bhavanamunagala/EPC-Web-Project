import React from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "../../style.css";
import { getPurchaseIndentById } from "../../../../redux/actions/Purchase/PurchaseIndent";
import {
  getPurchaseOrder,
  getPurchaseOrderDropDown,
  addPurchaseOrder,
  getPurchaseOrderById,
  getPOAttchment,
} from "../../../../redux/actions/Purchase/PurchaseOrder";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Row,
  CardHeader,
  CardTitle,
  CustomInput,
  Button,
  Input,
  Label,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Eye, Plus, Trash } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import "flatpickr/dist/themes/material_green.css";
import { history } from "../../../../history";
import ErrorText from "../../../../views/ui-elements/text-utilities/ErrorText";
import { Comparision } from "../../../../constant/commonDS";

class PurchaseOrderNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      projectList: [],
      supplierList: [],
      SpecialInstructionList: [],
      taxList: [],
      itemList: [],
      unitList: [],
      basedOnList: [],
      PODetails: [],
      DeletedPODetails: "",
      TaxModal: false,
      selectedPurchaseIndent: {},
      selectedItemForTax: {},
      POExcises: [],
      ItemTotal: 0,
      TaxTotal: 0,
      file: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    // this.props.getPurchaseOrder(postData);
    this.props.getPurchaseOrderDropDown(postData);

    if (history?.location?.state?.id) {
      this.props.getPurchaseOrderById({
        IDNumber: history?.location?.state?.id,
      });
      this.props.getPOAttchment({
        IDNumber: history?.location?.state?.id,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.purchaseOrder.error !== this.props.purchaseOrder.error &&
      this.props.purchaseOrder.error
    ) {
      toast.error(this.props.purchaseOrder.error);
    }
    if (
      prevProps.purchaseOrder.successMsg !==
        this.props.purchaseOrder.successMsg &&
      this.props.purchaseOrder.successMsg
    ) {
      toast.success(this.props.purchaseOrder.successMsg);
    }
    if (prevProps.purchaseOrder.data !== this.props.purchaseOrder.data) {
      this.setState({
        response:
          this.props.purchaseOrder.data && this.props.purchaseOrder.data.length
            ? this.props.purchaseOrder.data
            : [],
        random: this.props.purchaseOrder.random,
      });
    }
    if (
      prevProps.purchaseOrder.projectList !==
      this.props.purchaseOrder.projectList
    ) {
      let projectData = [];
      this.props.purchaseOrder.projectList.forEach((item) => {
        projectData.push({ value: item.IDNumber, label: item.ProjectName });
      });

      this.setState({
        projectList:
          this.props.purchaseOrder.projectList &&
          this.props.purchaseOrder.projectList.length
            ? projectData
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.supplierList !==
      this.props.purchaseOrder.supplierList
    ) {
      let supplierData = [];
      this.props.purchaseOrder.supplierList.forEach((item) => {
        supplierData.push({ value: item.IDNumber, label: item.SupplierName });
      });

      this.setState({
        supplierList:
          this.props.purchaseOrder.supplierList &&
          this.props.purchaseOrder.supplierList.length
            ? supplierData
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.basedOnList !==
      this.props.purchaseOrder.basedOnList
    ) {
      let basedOnData = [];
      this.props.purchaseOrder.basedOnList.forEach((item) => {
        basedOnData.push({ value: item.IDNumber, label: item.Name });
      });

      this.setState({
        basedOnList:
          this.props.purchaseOrder.basedOnList &&
          this.props.purchaseOrder.basedOnList.length
            ? basedOnData
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.purchaseIndentList !==
      this.props.purchaseOrder.purchaseIndentList
    ) {
      let purchaseIndentData = [];
      this.props.purchaseOrder.purchaseIndentList.forEach((item) => {
        purchaseIndentData.push({
          value: item.IDNumber,
          label: item.IndentNo,
        });
      });

      this.setState({
        purchaseIndentList:
          this.props.purchaseOrder.purchaseIndentList &&
          this.props.purchaseOrder.purchaseIndentList.length
            ? purchaseIndentData
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.departmentList !==
      this.props.purchaseOrder.departmentList
    ) {
      let departmentData = [];
      this.props.purchaseOrder.departmentList.forEach((item) => {
        departmentData.push({ value: item.IDNumber, label: item.Department });
      });

      this.setState({
        departmentList:
          this.props.purchaseOrder.departmentList &&
          this.props.purchaseOrder.departmentList.length
            ? departmentData
            : [],
      });
    }
    if (prevProps.purchaseOrder.taxList !== this.props.purchaseOrder.taxList) {
      let taxData = [];
      this.props.purchaseOrder.taxList.forEach((item) => {
        taxData.push({ ...item, TaxID: item.IDNumber });
      });
      this.setState({
        taxList:
          this.props.purchaseOrder.taxList &&
          this.props.purchaseOrder.taxList.length
            ? taxData
            : [],
      });
    }

    if (
      prevProps.purchaseOrder.itemList !== this.props.purchaseOrder.itemList
    ) {
      this.setState({
        itemList:
          this.props.purchaseOrder.itemList &&
          this.props.purchaseOrder.itemList.length
            ? this.props.purchaseOrder.itemList
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.unitList !== this.props.purchaseOrder.unitList
    ) {
      let unitData = [];
      this.props.purchaseOrder.unitList.forEach((item) => {
        unitData.push({ value: item.IDNumber, label: item.UnitName });
      });

      this.setState({
        unitList:
          this.props.purchaseOrder.unitList &&
          this.props.purchaseOrder.unitList.length
            ? unitData
            : [],
      });
    }
    if (prevProps.purchaseOrder.file !== this.props.purchaseOrder.file) {
      this.setState({
        file:
          this.props.purchaseOrder.file && this.props.purchaseOrder.file.length
            ? this.props.purchaseOrder.file
            : [],
      });
    }

    if (
      prevProps.purchaseIndent.PODetails !== this.props.purchaseIndent.PODetails
    ) {
      let POData = [];
      this.props.purchaseIndent.PODetails.forEach((item) => {
        POData.push({
          ...item,
          IDNumber: 0,
          ItemIDNumber: item.ItemID,
          UnitIDNumber: item.UnitID,
          Quantity: item.Qty,
          POExcises: [],
        });
      });
      this.setState({
        ProjectID: this.props.purchaseIndent.selectedPurchaseIndent.ProjectID,
        PODetails: this.props.purchaseIndent.PODetails ? POData : [],
      });
    }

    if (
      prevProps.purchaseOrder.selectedPO !==
        this.props.purchaseOrder.selectedPO &&
      history?.location?.state?.id
    ) {
      const filterData = this.props.purchaseOrder.selectedPO;
      this.setState({ itemData: filterData });
      this.setState({
        parentIDNumber: filterData?.IDNumber,
        BasedOn: filterData?.BasedOn,
        IndentID: filterData?.IndentID,
        SupplierID: filterData?.SupplierID,
        ProjectID: filterData?.ProjectID,
        DepartmentID: filterData?.DepartmentID,
        PODate: filterData?.PODate,
        DeliveyDate: filterData?.DeliveyDate,
        SpecialInstruction: filterData?.SpecialInstruction,
        PODetails: filterData?.PODetails,
        ItemTotal: filterData?.ItemTotal,
        TaxTotal: filterData?.TaxTotal,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  toggleModal = (data) => {
    // document.getElementsByClassName("taxDetail").style.display = "none";
    document.getElementById("taxDetail" + data.ItemID).style.display = "flex";
  };

  onInputChange = (value, name, id) => {
    const exist = this.state.PODetails?.filter((data) => {
      return data.IDNumber === id;
    })?.[0];
    const unique = this.state.PODetails?.filter((data) => {
      return data.IDNumber !== id;
    });
    exist[name] = value;

    exist["BaseQty"] = exist?.Qty * exist?.ConvFactor;
    exist["BaseRate"] = (
      (exist?.Qty * exist?.Rate) /
      (exist?.Qty * exist?.ConvFactor)
    ).toFixed(3);
    exist["BaseAmount"] = exist?.BaseQty * exist?.BaseRate;

    exist["DISCAMT"] = exist?.DISCPERC
      ? (exist?.Rate * exist?.Qty * exist?.DISCPERC) / 100
      : 0;

    exist["DISCPERC"] = exist?.DISCAMT
      ? Math.ceil((100 * exist?.DISCAMT) / (exist?.Rate * exist?.Qty))
      : 0;

    exist["Amount"] = exist?.Rate * exist?.Qty - exist?.DISCAMT;

    this.setState({
      PODetails: [
        {
          ...exist,
          [name]: value,
        },
        ...unique,
      ],
    });
  };

  onTaxInputChange = (value, name, id) => {
    const exist = this.state.POExcises?.filter((data) => {
      return data.IDNumber === id;
    })?.[0];
    const unique = this.state.POExcises?.filter((data) => {
      return data.IDNumber !== id;
    });
    exist[name] = value;

    this.setState({
      POExcises: [
        ...unique,
        {
          ...exist,
          [name]: value,
        },
      ],
    });
  };

  handleTaxOperation = (data) => {
    let { PODetails } = this.state;
    let index = PODetails.findIndex((d) => d.ItemID === data.ItemID);

    let tmpPOExcises = PODetails[index].POExcises
      ? [...PODetails[index].POExcises]
      : [];

    if (tmpPOExcises && tmpPOExcises.length > 0) {
      PODetails[index]["POExcises"].push({
        IDNumber: 0,
        ItemID: data.ItemID,
        TaxID: this.state.TaxID,
        PODetailID: this.state.PODetailID,
        AccountID: this.state.AccountID,
        Percentage: this.state.Percentage,
        Amount: this.state.TaxAmount,
        AmountBase: this.state.TaxAmount,
        AmountWithIT: 0,
        ValueType: this.state.ValueType,
        ValueTypeName: this.state.ValueTypeName,
        Remarks: this.state.TaxRemarks,
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        CreatedDate: moment(),
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedDate: moment(),
      });
    } else {
      PODetails[index]["POExcises"] = [
        {
          IDNumber: 0,
          ItemID: data.ItemID,
          TaxID: this.state.TaxID,
          PODetailID: this.state.PODetailID,
          AccountID: this.state.AccountID,
          Percentage: this.state.Percentage,
          Amount: this.state.TaxAmount,
          AmountBase: this.state.TaxAmount,
          AmountWithIT: 0,
          ValueType: this.state.ValueType,
          ValueTypeName: this.state.ValueTypeName,
          Remarks: this.state.TaxRemarks,
          CreatedBy:
            localStorage.getItem("userData") &&
            JSON.parse(localStorage.getItem("userData")).IDNumber,
          CreatedDate: moment(),
          UpdatedBy:
            localStorage.getItem("userData") &&
            JSON.parse(localStorage.getItem("userData")).IDNumber,
          UpdatedDate: moment(),
        },
      ];
    }

    this.setState({
      PODetails,
      TaxTotal: this.state.TaxTotal + this.state.TaxAmount,
      TaxID: 0,
      PODetailID: "",
      AccountID: "",
      Percentage: "",
      TaxAmount: "",
      ValueType: "",
      ValueTypeName: "",
      TaxRemarks: "",
    });
  };

  handleItemOperation = () => {
    const exist = this.state.PODetails?.filter((data) => {
      return data.IDNumber === this.state.id;
    })?.[0];
    if (exist) {
      let objectIndex = this.state.PODetails.findIndex(
        (d) => d.IDNumber === this.state.id
      );
      let tmpPODetails = [...this.state.PODetails];

      tmpPODetails[objectIndex] = {
        ...tmpPODetails[objectIndex],
        ItemID: this.state.ItemID,
        ItemIDNumber: this.state.ItemIDNumber,
        Qty: this.state.Qty,
        Quantity: this.state.Quantity,
        UnitID: this.state.UnitID,
        UnitIDNumber: this.state.UnitIDNumber,
        Rate: this.state.Rate,
        Amount: this.state.Amount,
        Remarks: this.state.Remarks,
        BaseQty: this.state.BaseQty,
        BaseRate: this.state.BaseRate,
        BaseAmount: this.state.BaseAmount,
        RatePerUnit: this.state.BaseRate,
        DISCPERC: this.state.DISCPERC,
        DISCAMT: this.state.DISCAMT,
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        CreatedDate: moment(),
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedDate: moment(),
      };
      this.setState({
        PODetails: tmpPODetails,
      });
    } else {
      if (this.state.PODetails !== null && this.state.PODetails.length > 0) {
        this.setState({
          PODetails: [
            ...this.state.PODetails,
            {
              IDNumber: 0,
              POTranMastIDNumber: 0,
              ItemID: this.state.ItemID,
              ItemIDNumber: this.state.ItemIDNumber,
              Qty: this.state.Qty,
              Quantity: this.state.Quantity,
              UnitID: this.state.UnitID,
              UnitIDNumber: this.state.UnitIDNumber,
              Rate: this.state.Rate,
              Amount: this.state.Amount,
              Remarks: this.state.Remarks,
              Rec_Quantity: 0,
              InwardQty: 0,
              IndentDetailID: 0,
              ConversionRate: 1,
              BaseQty: this.state.BaseQty,
              BaseRate: this.state.BaseRate,
              BaseAmount: this.state.BaseAmount,
              TotalIndentQty: 0,
              QtyPerUnit: this.state.ConvFactor,
              Ref_QtyUnitID: 1,
              RatePerUnit: this.state.BaseRate,
              DISCPERC: this.state.DISCPERC,
              DISCAMT: this.state.DISCAMT,
              DetailID: 0,
              CreatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              CreatedDate: moment(),
              UpdatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              UpdatedDate: moment(),
            },
          ],
        });
      } else {
        this.setState({
          PODetails: [
            {
              IDNumber: 0,
              POTranMastIDNumber: 0,
              ItemID: this.state.ItemID,
              ItemIDNumber: this.state.ItemIDNumber,
              Qty: this.state.Qty,
              Quantity: this.state.Quantity,
              UnitID: this.state.UnitID,
              UnitIDNumber: this.state.UnitIDNumber,
              Rate: this.state.Rate,
              Amount: this.state.Amount,
              Remarks: this.state.Remarks,
              Rec_Qty: 0,
              InwardQty: 0,
              IndentDetailID: 0,
              ConversionRate: 1,
              BaseQty: this.state.BaseQty,
              BaseRate: this.state.BaseRate,
              BaseAmount: this.state.BaseAmount,
              TotalIndentQty: 0,
              QtyPerUnit: this.state.ConvFactor,
              Ref_QtyUnitID: 1,
              RatePerUnit: this.state.BaseRate,
              DISCPERC: this.state.DISCPERC,
              DISCAMT: this.state.DISCAMT,
              DetailID: 0,
              CreatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              CreatedDate: moment(),
              UpdatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              UpdatedDate: moment(),
            },
          ],
        });
      }
    }
    this.setState({
      ItemTotal: this.state.ItemTotal + this.state.Amount,
      ItemID: 0,
      ItemIDNumber: 0,
      Qty: "",
      Quantity: "",
      UnitID: 0,
      UnitIDNumber: 0,
      Rate: "",
      Rec_Qty: "",
      InwardQty: "",
      TotalIndentQty: "",
      QtyPerUnit: "",
      RatePerUnit: "",
      BaseQty: "",
      BaseRate: "",
      BaseAmount: "",
      DISCPERC: "",
      DISCAMT: "",
      Amount: "",
      Remarks: "",
    });
  };

  copyTaxesToAllItems = () => {
    let { PODetails } = this.state;
    let tmpPOExcises = PODetails?.[0].POExcises;
    let a = [];
    PODetails.forEach((d, itemIndex) => {
      tmpPOExcises.forEach((td, i) => {
        console.log("td", td);
        a.push({
          ...td,
          ItemID: d.ItemID,
          Amount: (d.Amount * td.Percentage) / 100,
          AmountBase: (d.Amount * td.Percentage) / 100,
        });
      });
    });
    let tmp = PODetails.map((d, i) => {
      let POE = [];
      a.forEach((td, j) => {
        if (d.ItemID === td.ItemID) {
          POE.push(td);
        }
      });
      return { ...d, POExcises: POE };
    });

    this.setState({
      PODetails: tmp,
      TaxTotal: parseInt(
        PODetails.map((data) =>
          data?.POExcises
            ? data?.POExcises.reduce((d, b) => d + b.Amount, 0)
            : 0
        )
      ),
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
      IndentID,
      SupplierID,
      SpecialInstruction,
      PODate,
      DeliveyDate,
      BasedOn,
      ProjectID,
      DepartmentID,
      PODetails,
      DeletedPODetails,
      file,
      itemData,
    } = this.state;
    if (
      SupplierID &&
      SpecialInstruction &&
      PODate &&
      DeliveyDate &&
      BasedOn &&
      ProjectID &&
      DepartmentID &&
      PODetails.length > 0
    ) {
      let ItemTotal = parseInt(PODetails.reduce((d, b) => d + b.Amount, 0)),
        ItemTotalBase = parseInt(
          PODetails.reduce((d, b) => d + b.BaseAmount, 0)
        ),
        TaxTotal = parseInt(
          PODetails.map((data) =>
            data?.POExcises
              ? data?.POExcises.reduce((d, b) => d + b.Amount, 0)
              : 0
          )
        ),
        TaxTotalBase = parseInt(
          PODetails.map((data) =>
            data?.POExcises
              ? data?.POExcises.reduce((d, b) => d + b.AmountBase, 0)
              : 0
          )
        ),
        ExpenseTotal = 0,
        ExpenseTotalBase = 0,
        NetTotal = ItemTotal + TaxTotal,
        NetTotalBase = ItemTotalBase + TaxTotalBase,
        ExciseTotal = 0,
        ExciseTotalBase = 0;

      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        ItemTotal,
        ItemTotalBase,
        TaxTotal,
        TaxTotalBase,
        ExpenseTotal,
        ExpenseTotalBase,
        NetTotal,
        NetTotalBase,
        ExciseTotal,
        ExciseTotalBase,
        IndentID,
        SupplierID,
        CustomerID: SupplierID,
        BasedOn,
        ProjectID,
        DepartmentID,
        SpecialInstruction,
        file,
        PODate:
          typeof PODate === "object"
            ? moment(PODate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : PODate,
        DeliveyDate:
          typeof DeliveyDate === "object"
            ? moment(DeliveyDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : DeliveyDate,
        POStatus: 1,
        PODetails,
        DeletedPODetails,
        IndPrepBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        Year_ID: parseInt(localStorage.getItem("yearId")),
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        CreatedDate: moment(),
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedDate: moment(),
      };
      if (history?.location?.state?.id) {
        await this.props.addPurchaseOrder({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addPurchaseOrder(postData);
      }
      await this.resetState();
      await history.push("/Purchase/PurchaseOrder");
    }
  };

  resetState = () => {
    this.setState({
      SupplierID: 0,
      LocationID: 0,
      PODate: null,
      IndentTime: null,
      ItemID: null,
      PODetails: [],
    });
  };

  render() {
    const { btnFlg, itemList, taxList, PODetails, file } = this.state;

    let filteredItemList =
      PODetails.length > 0
        ? itemList.filter(Comparision(PODetails, "ItemID"))
        : itemList;
    // let filteredTaxList =
    //   PODetails?.POExcises?.length > 0
    //     ? taxList.filter(Comparision(PODetails.POExcises, "TaxID"))
    //     : taxList;

    // console.log("taxList", taxList);
    // console.log("filteredTaxList", filteredTaxList);
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Purchase Order</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Purchase/PurchaseOrder")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form>
              <div
                style={{
                  height: "320px",
                  overflowY: "auto",
                }}
                className="pl-2 pr-2"
              >
                <FormGroup row>
                  <Col>
                    <Label>Base On</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="BasedOnSelect"
                      name="BasedOnSelect"
                      value={this.state?.BasedOn}
                      className={`p-0 pl-1 ${
                        btnFlg && !this.state?.BasedOn ? "invalid-input" : ""
                      }`}
                      onChange={(e) => {
                        this.setState({
                          BasedOn: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="">Select Base On</option>
                      {this.state.basedOnList &&
                        this.state.basedOnList?.length > 0 &&
                        this.state.basedOnList.map((d, i) => (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.BasedOn && <ErrorText />}
                  </Col>

                  {this.state.BasedOn === 2 ? (
                    <Col>
                      <Label>Purchase Indent</Label>
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="IndentIDSelect"
                        name="IndentIDSelect"
                        value={this.state?.IndentID}
                        className={`p-0 pl-1 ${
                          btnFlg && !this.state?.IndentID ? "invalid-input" : ""
                        }`}
                        onChange={(e) => {
                          this.setState({
                            IndentID: parseInt(e.target.value),
                          });
                          this.props.getPurchaseIndentById({
                            IDNumber: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Select Purchase Indent</option>
                        {this.state.purchaseIndentList &&
                          this.state.purchaseIndentList?.length > 0 &&
                          this.state.purchaseIndentList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                    </Col>
                  ) : (
                    ""
                  )}

                  <Col>
                    <Label>Project</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="ProjectIDSelect"
                      name="ProjectIDSelect"
                      value={this.state?.ProjectID ? this.state?.ProjectID : 0}
                      className={`p-0 pl-1 `}
                      onChange={(e) =>
                        this.setState({ ProjectID: parseInt(e.target.value) })
                      }
                    >
                      <option value="0">Select Project</option>
                      {this.state.projectList &&
                        this.state.projectList?.length > 0 &&
                        this.state.projectList.map((d, i) => (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.ProjectID && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Supplier</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="SupplierIDSelect"
                      name="SupplierIDSelect"
                      value={
                        this.state?.SupplierID ? this.state?.SupplierID : 0
                      }
                      className={`p-0 pl-1 ${
                        btnFlg && !this.state?.SupplierID ? "invalid-input" : ""
                      }`}
                      onChange={(e) => {
                        this.setState({
                          SupplierID: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">Select Supplier</option>
                      {this.state.supplierList &&
                        this.state.supplierList?.length > 0 &&
                        this.state.supplierList.map((d, i) => (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.SupplierID && <ErrorText />}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col>
                    <Label>PO Date</Label>
                    <Flatpickr
                      value={this.state.PODate}
                      onChange={(date) => {
                        this.setState({ PODate: date });
                      }}
                      placeholder="PO Date"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.PODate?.[0]
                          ? "invalid-input"
                          : ""
                      }`}
                    />
                    {btnFlg && !this.state?.PODate?.[0] && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Delivery Date</Label>
                    <Flatpickr
                      value={this.state.DeliveyDate}
                      onChange={(date) => {
                        this.setState({ DeliveyDate: date });
                      }}
                      placeholder="Delivery Date"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.DeliveyDate?.[0]
                          ? "invalid-input"
                          : ""
                      }`}
                    />
                    {btnFlg && !this.state?.DeliveyDate?.[0] && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Department</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="DepartmentIDSelect"
                      name="DepartmentIDSelect"
                      value={this.state?.DepartmentID}
                      className={`p-0 pl-1 ${
                        btnFlg && !this.state?.DepartmentID
                          ? "invalid-input"
                          : ""
                      }`}
                      onChange={(e) => {
                        this.setState({
                          DepartmentID: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">Select Department</option>
                      {this.state.departmentList &&
                        this.state.departmentList?.length > 0 &&
                        this.state.departmentList.map((d, i) => (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.DepartmentID && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Spec Instruction</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={
                        this.state.SpecialInstruction
                          ? this.state.SpecialInstruction
                          : ""
                      }
                      onChange={(e) => this.onChange(e, "SpecialInstruction")}
                      name="SpecialInstruction"
                      placeholder="SpecialInstruction"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm="8">
                    <FormGroup>
                      <Label for="POAttchment">PO Attachment</Label>
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

                {/* itemdetail ::start */}
                <FormGroup row id="itemdetail">
                  <div className="d-flex w-100 pl-2 pr-2 justify-content-between">
                    <CardTitle>Item Details</CardTitle>
                    {PODetails[0]?.POExcises?.length > 0 ? (
                      <Button
                        color="primary"
                        size="sm"
                        className="cursor-pointer action-btn"
                        onClick={() => this.copyTaxesToAllItems()}
                      >
                        Apply Tax on Other Items
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>

                  <Col sm="12" className="text-center">
                    {btnFlg && !this.state?.PODetails.length && (
                      <ErrorText text="There must be at least one item detail" />
                    )}
                  </Col>

                  <div className="d-flex w-100">
                    <Col sm="2">
                      <Label className="m-0"></Label>
                    </Col>
                    <Col sm="2">
                      <Label className="m-0">Item</Label>
                    </Col>
                    <Col sm="1">
                      <Label className="m-0">Qty</Label>
                    </Col>
                    <Col sm="2">
                      <Label className="m-0">Unit</Label>
                    </Col>
                    <Col sm="1">
                      <Label className="m-0">Rate</Label>
                    </Col>
                    <Col sm="1">
                      <Label className="m-0">BaseQty</Label>
                    </Col>
                    <Col sm="1">
                      <Label className="m-0">Base Rate</Label>
                    </Col>
                    <Col sm="2">
                      <Label className="m-0">Base Amount</Label>
                    </Col>
                    <Col sm="1">
                      <Label className="m-0">DISCPERC</Label>
                    </Col>
                    <Col sm="1">
                      <Label className="m-0">DISCAMT</Label>
                    </Col>
                    <Col sm="1">
                      <Label className="m-0">Amount</Label>
                    </Col>
                    <Col sm="1">
                      <Label className="m-0">Remarks</Label>
                    </Col>
                  </div>

                  {this.state.PODetails?.length > 0 &&
                    this.state.PODetails?.map((data, i) => {
                      return (
                        <React.Fragment key={"PODetails" + i}>
                          <div
                            className="d-flex w-100 mt-1"
                            key={"PODetails" + i}
                          >
                            <Col sm="2" className=" text-center">
                              <Button
                                color="primary"
                                className="cursor-pointer action-btn mr-1"
                                size="sm"
                                onClick={() => this.toggleModal(data)}
                                style={{ height: "24px" }}
                              >
                                Add Tax
                              </Button>
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

                            <Col sm="2">
                              <CustomInput
                                bsSize="sm"
                                type="select"
                                id={"ItemIDSelect" + i}
                                name={"ItemIDSelect" + i}
                                value={
                                  data?.ItemIDNumber ? data?.ItemIDNumber : 0
                                }
                                className={"p-0 pl-1"}
                                onChange={(e) => {
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "ItemID",
                                    data?.IDNumber
                                  );
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "ItemIDNumber",
                                    data?.IDNumber
                                  );
                                }}
                                disabled
                              >
                                <option value="0">Select Item</option>
                                {this.state.itemList &&
                                  this.state.itemList?.length > 0 &&
                                  this.state.itemList.map((d, i) => (
                                    <option value={d.ItemID} key={d.ItemID}>
                                      {d.ItemName}
                                    </option>
                                  ))}
                              </CustomInput>
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.Quantity ? data?.Quantity : ""}
                                onChange={(e) => {
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "Qty",
                                    data?.IDNumber
                                  );
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "Quantity",
                                    data?.IDNumber
                                  );
                                }}
                                name={"quantity" + i}
                                placeholder="Qty"
                              />
                            </Col>

                            <Col sm="2">
                              <CustomInput
                                bsSize="sm"
                                type="select"
                                id={"UnitIDSelect" + i}
                                name={"UnitIDSelect" + i}
                                value={
                                  data?.UnitIDNumber ? data?.UnitIDNumber : ""
                                }
                                className={`p-0 pl-1`}
                                onChange={(e) => {
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "UnitID",
                                    data?.IDNumber
                                  );
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "UnitIDNumber",
                                    data?.IDNumber
                                  );
                                }}
                              >
                                <option value="0">Select Unit</option>
                                {this.state.unitList &&
                                  this.state.unitList?.length > 0 &&
                                  this.state.unitList.map((d, i) => (
                                    <option value={d.value} key={d.value}>
                                      {d.label}
                                    </option>
                                  ))}
                              </CustomInput>
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.Rate ? data?.Rate : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "Rate",
                                    data?.IDNumber
                                  )
                                }
                                name={"Rate" + i}
                                placeholder="Rate"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.BaseQty ? data?.BaseQty : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "BaseQty",
                                    data?.IDNumber
                                  )
                                }
                                name={"BaseQty" + i}
                                placeholder="BaseQty"
                                disabled
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.BaseRate ? data?.BaseRate : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "BaseRate",
                                    data?.IDNumber
                                  )
                                }
                                name={"BaseRate" + i}
                                placeholder="BaseRate"
                                disabled
                              />
                            </Col>

                            <Col sm="2">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.BaseAmount ? data?.BaseAmount : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "BaseAmount",
                                    data?.IDNumber
                                  )
                                }
                                name={"BaseAmount" + i}
                                placeholder="BaseAmount"
                                disabled
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.DISCPERC}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "DISCPERC",
                                    data?.IDNumber
                                  )
                                }
                                name={"DISCPERC" + i}
                                placeholder="Discount(%)"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.DISCAMT}
                                onChange={(e) =>
                                  this.onInputChange(
                                    parseInt(e.target.value),
                                    "DISCAMT",
                                    data?.IDNumber
                                  )
                                }
                                name={"DISCAMT" + i}
                                placeholder="Discount in Amount"
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="number"
                                value={data?.Amount ? data?.Amount : ""}
                                onChange={(e) => this.onChange(e, "Amount")}
                                name={"Amount" + i}
                                placeholder="Amount"
                                disabled
                              />
                            </Col>

                            <Col sm="1">
                              <Input
                                bsSize="sm"
                                type="text"
                                value={data?.Remarks ? data?.Remarks : ""}
                                onChange={(e) =>
                                  this.onInputChange(
                                    e.target.value,
                                    "Remarks",
                                    data?.IDNumber
                                  )
                                }
                                name="Remarks"
                                placeholder="Remarks"
                              />
                            </Col>
                          </div>
                          <div
                            className="w-100 mt-1 taxDetail"
                            id={"taxDetail" + data?.ItemID}
                            style={{ display: "none" }}
                          >
                            <FormGroup className="mt-1 pl-2 pr-2">
                              <Row key={"POExcises" + data?.ItemID}>
                                <Col sm="1"></Col>
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
                              {data?.POExcises?.length > 0 &&
                                data?.POExcises.map((txtData, i) => (
                                  <React.Fragment
                                    key={"POExcises" + txtData.IDNumber}
                                  >
                                    <Row className="mt-1">
                                      <Col sm="1"></Col>
                                      <Col className=" text-center">
                                        <Button
                                          color="danger"
                                          className="cursor-pointer action-btn"
                                          size="sm"
                                          onClick={() => {
                                            let itemIndex =
                                              this.state.PODetails.map(
                                                (d, i) =>
                                                  d.ItemID === data.ItemID
                                              );
                                            let objectIndex =
                                              data?.POExcises.findIndex(
                                                (d) =>
                                                  d.IDNumber ===
                                                  txtData.IDNumber
                                              );
                                            data.POExcises.splice(
                                              objectIndex,
                                              1
                                            );
                                            let tmpPODetails = [
                                              ...this.state.PODetails,
                                            ];
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
                                          value={
                                            txtData?.TaxID ? txtData?.TaxID : 0
                                          }
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
                                          {taxList &&
                                            taxList?.length > 0 &&
                                            taxList.map((d, i) => (
                                              <option
                                                value={d.IDNumber}
                                                key={d.IDNumber}
                                              >
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
                                            txtData?.Percentage
                                              ? txtData?.Percentage
                                              : ""
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
                                            txtData.ValueType === 1
                                              ? true
                                              : false
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
                                          value={
                                            txtData?.Amount
                                              ? txtData?.Amount
                                              : ""
                                          }
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
                                          value={
                                            txtData?.Amount
                                              ? txtData?.Amount
                                              : ""
                                          }
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
                                          value={
                                            txtData?.Remarks
                                              ? txtData?.Remarks
                                              : ""
                                          }
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
                                <Col sm="1"></Col>
                                <Col className=" text-center">
                                  <Button
                                    size="sm"
                                    color="primary"
                                    className="cursor-pointer action-btn mr-1"
                                    style={{ height: "24px" }}
                                    onClick={() =>
                                      this.handleTaxOperation(data)
                                    }
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
                                    value={
                                      this.state?.TaxID ? this.state?.TaxID : 0
                                    }
                                    className={"p-0 pl-1"}
                                    onChange={(e) => {
                                      let index = taxList.findIndex(
                                        (d) =>
                                          d.IDNumber ===
                                          parseInt(e.target.value)
                                      );

                                      this.setState({
                                        TaxID: parseInt(e.target.value),
                                        AccountID: taxList[index]?.AccountID,
                                        Percentage: taxList[index]?.Percentage,
                                        ValueType: taxList[index]?.ValueType,
                                        ValueTypeName:
                                          taxList[index]?.ValueTypeName,
                                        TaxAmount:
                                          (data.Amount *
                                            taxList[index]?.Percentage) /
                                          100,
                                      });
                                    }}
                                  >
                                    <option value="0">Select Tax</option>
                                    {taxList &&
                                      taxList?.length > 0 &&
                                      taxList.map((d, i) => (
                                        <option
                                          value={d.IDNumber}
                                          key={d.IDNumber}
                                        >
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
                                      this.state?.Percentage
                                        ? this.state?.Percentage
                                        : ""
                                    }
                                    onChange={(e) =>
                                      this.setState({
                                        Percentage: parseInt(e.target.value),
                                        TaxAmount:
                                          (data.Amount *
                                            parseInt(e.target.value)) /
                                          100,
                                      })
                                    }
                                    name={"Percentage"}
                                    placeholder="Percentage"
                                    disabled={
                                      this.state.ValueType === 1 ? true : false
                                    }
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
                                      this.state?.TaxAmount
                                        ? this.state?.TaxAmount
                                        : ""
                                    }
                                    onChange={(e) =>
                                      this.onChange(e, "TaxAmount")
                                    }
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
                                      this.state?.TaxAmount
                                        ? this.state?.TaxAmount
                                        : ""
                                    }
                                    onChange={(e) =>
                                      this.onChange(e, "TaxAmount")
                                    }
                                    name={"TaxAmount"}
                                    placeholder="TaxAmount"
                                  />
                                </Col>
                                <Col>
                                  <Input
                                    bsSize="sm"
                                    type="text"
                                    value={
                                      this.state?.TaxRemarks
                                        ? this.state?.TaxRemarks
                                        : ""
                                    }
                                    onChange={(e) =>
                                      this.onChange(e, "TaxRemarks")
                                    }
                                    name="TaxRemarks"
                                    placeholder="TaxRemarks"
                                  />
                                </Col>
                              </Row>
                            </FormGroup>
                          </div>
                        </React.Fragment>
                      );
                    })}

                  <div className="d-flex w-100 mt-1">
                    <Col sm="2" className="text-center">
                      <Button
                        size="sm"
                        color="primary"
                        className="cursor-pointer action-btn mr-1"
                        onClick={() => this.handleItemOperation()}
                      >
                        <Plus size={14} />
                      </Button>
                    </Col>

                    <Col sm="2">
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id={"ItemIDSelect"}
                        name={"ItemIDSelect"}
                        value={this.state?.ItemID ? this.state?.ItemID : 0}
                        className={"p-0 pl-1"}
                        onChange={(e) => {
                          let index = itemList.findIndex(
                            (d) => d.ItemID === parseInt(e.target.value)
                          );
                          this.setState({
                            ItemIDNumber: parseInt(e.target.value),
                            ItemID: parseInt(e.target.value),
                            ConvFactor: itemList[index].ConvFactor,
                          });
                        }}
                      >
                        <option value="0">Select Item</option>
                        {filteredItemList &&
                          filteredItemList?.length > 0 &&
                          filteredItemList.map((itemData, i) => (
                            <option
                              value={itemData.ItemID}
                              key={itemData.ItemID}
                            >
                              {itemData.ItemName}
                            </option>
                          ))}
                      </CustomInput>
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.Qty ? this.state?.Qty : ""}
                        onChange={(e) => {
                          this.setState({
                            Qty: parseInt(e.target.value),
                            Quantity: parseInt(e.target.value),
                            BaseQty:
                              this.state.ConvFactor * parseInt(e.target.value),
                            Amount: parseInt(e.target.value) * this.state.Rate,
                          });
                        }}
                        name={"quantity"}
                        placeholder="Qty"
                      />
                    </Col>

                    <Col sm="2">
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="defaultUnit"
                        value={this.state?.UnitID ? this.state?.UnitID : ""}
                        className={`p-0 pl-1`}
                        onChange={(e) => {
                          this.setState({
                            UnitIDNumber: parseInt(e.target.value),
                            UnitID: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Unit</option>
                        {this.state.unitList &&
                          this.state.unitList?.length > 0 &&
                          this.state.unitList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.Rate ? this.state?.Rate : ""}
                        onChange={(e) => {
                          this.setState({
                            Rate: parseInt(e.target.value),
                            BaseRate: (
                              (this.state.Qty * parseInt(e.target.value)) /
                              this.state.BaseQty
                            ).toFixed(3),
                            BaseAmount:
                              this.state.BaseQty *
                              ((this.state.Qty * parseInt(e.target.value)) /
                                this.state.BaseQty),
                            Amount: parseInt(e.target.value) * this.state.Qty,
                          });
                        }}
                        name={"Rate"}
                        placeholder="Rate"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.BaseQty ? this.state?.BaseQty : ""}
                        onChange={(e) =>
                          this.setState({
                            BaseQty: parseInt(e.target.value),
                          })
                        }
                        name={"BaseQty"}
                        placeholder="BaseQty"
                        disabled
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.BaseRate ? this.state?.BaseRate : ""}
                        onChange={(e) =>
                          this.setState({
                            BaseRate: parseInt(e.target.value),
                          })
                        }
                        name={"BaseRate"}
                        placeholder="BaseRate"
                        disabled
                      />
                    </Col>

                    <Col sm="2">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={
                          this.state?.BaseAmount ? this.state?.BaseAmount : ""
                        }
                        onChange={(e) =>
                          this.setState({
                            BaseAmount: parseInt(e.target.value),
                          })
                        }
                        name={"BaseAmount"}
                        placeholder="BaseAmount"
                        disabled
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.DISCPERC ? this.state?.DISCPERC : ""}
                        onChange={(e) => {
                          this.setState({
                            DISCPERC: parseInt(e.target.value),
                            DISCAMT:
                              (this.state.Amount * parseInt(e.target.value)) /
                              100,
                            Amount:
                              this.state.Rate * this.state.Qty -
                              Math.ceil(
                                (100 * e.target.value) /
                                  (this.state.Rate * this.state.Qty)
                              ),
                          });
                        }}
                        name="DISCPERC"
                        placeholder="Discount(%)"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.DISCAMT ? this.state?.DISCAMT : ""}
                        onChange={(e) => {
                          this.setState({
                            DISCAMT: parseInt(e.target.value),
                            DISCPERC: Math.ceil(
                              (100 * parseInt(e.target.value)) /
                                (this.state.Rate * this.state.Qty)
                            ),
                            Amount:
                              this.state.Rate * this.state.Qty -
                              parseInt(e.target.value),
                          });
                        }}
                        name="DISCAMT"
                        placeholder="Discount in Amount"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state?.Amount ? this.state?.Amount : ""}
                        name={"Amount"}
                        placeholder="Amount"
                        disabled
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="text"
                        value={this.state?.Remarks ? this.state?.Remarks : ""}
                        onChange={(e) =>
                          this.setState({
                            Remarks: e.target.value,
                          })
                        }
                        name="Remarks"
                        placeholder="Remarks"
                      />
                    </Col>
                  </div>
                </FormGroup>

                {/* itemdetail ::end */}
              </div>

              <div row="true" className="mt-1 mb-1">
                <FormGroup row className="pl-2 pr-2">
                  <Col>
                    <Label>Item Total</Label>
                    <Input
                      bsSize="sm"
                      type="number"
                      name="ItemTotal"
                      id="ItemTotal"
                      placeholder="Item Total"
                      value={this.state.ItemTotal ? this.state.ItemTotal : ""}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Label>Tax/Duty Total</Label>
                    <Input
                      bsSize="sm"
                      type="number"
                      name="TaxTotal"
                      id="TaxTotal"
                      placeholder="Amount"
                      value={this.state.TaxTotal ? this.state.TaxTotal : ""}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Label>Total Amount</Label>
                    <Input
                      bsSize="sm"
                      type="number"
                      name="NetTotal"
                      id="NetTotal"
                      placeholder="Net Total"
                      value={toString(
                        parseInt(this.state.ItemTotal) +
                          parseInt(this.state.TaxTotal)
                      )}
                      disabled
                    />
                  </Col>
                </FormGroup>
                <Button.Ripple
                  size="sm"
                  color="primary"
                  className="mr-1 ml-2"
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
                >
                  Reset
                </Button.Ripple>
              </div>
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
    purchaseIndent: state.purchaseIndent,
    purchaseOrder: state.purchaseOrder,
  };
};

export default connect(mapStateToProps, {
  getPurchaseIndentById,
  getPurchaseOrder,
  getPurchaseOrderDropDown,
  addPurchaseOrder,
  getPurchaseOrderById,
  getPOAttchment,
})(PurchaseOrderNew);
