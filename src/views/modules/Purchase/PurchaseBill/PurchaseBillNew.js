import React from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "../../style.css";
import { getPurchaseOrderById } from "../../../../redux/actions/Purchase/PurchaseOrder";
import { getGRNById } from "../../../../redux/actions/Purchase/GRN";
import {
  getPurchaseBill,
  getPurchaseBillDropDown,
  addPurchaseBill,
} from "../../../../redux/actions/Purchase/PurchaseBill";
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

class PurchaseBillNew extends React.Component {
  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      response: [],
      projectList: [],
      supplierList: [],
      RemarksList: [],
      taxList: [],
      itemList: [],
      unitList: [],
      basedOnList: [],
      PVDetails: [],
      DeletedPVDetails: "",
      TaxModal: false,
      selectedPurchaseIndent: {},
      selectedItemForTax: {},
      PVExcises: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getPurchaseBill(postData);
    this.props.getPurchaseBillDropDown(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.purchaseBill.error !== this.props.purchaseBill.error &&
      this.props.purchaseBill.error
    ) {
      toast.error(this.props.purchaseBill.error);
    }
    if (
      prevProps.purchaseBill.successMsg !==
        this.props.purchaseBill.successMsg &&
      this.props.purchaseBill.successMsg
    ) {
      toast.success(this.props.purchaseBill.successMsg);
    }
    if (prevProps.purchaseBill.data !== this.props.purchaseBill.data) {
      this.setState({
        response:
          this.props.purchaseBill.data && this.props.purchaseBill.data.length
            ? this.props.purchaseBill.data
            : [],
        random: this.props.purchaseBill.random,
      });
    }
    if (
      prevProps.purchaseBill.basedOnList !== this.props.purchaseBill.basedOnList
    ) {
      let basedOnData = [];
      this.props.purchaseBill.basedOnList.forEach((item) => {
        basedOnData.push({ value: item.IDNumber, label: item.Name });
      });

      this.setState({
        basedOnList:
          this.props.purchaseBill.basedOnList &&
          this.props.purchaseBill.basedOnList.length
            ? basedOnData
            : [],
      });
    }
    if (prevProps.purchaseBill.grnList !== this.props.purchaseBill.grnList) {
      this.setState({
        grnList:
          this.props.purchaseBill.grnList &&
          this.props.purchaseBill.grnList.length
            ? this.props.purchaseBill.grnList
            : [],
      });
    }
    if (
      prevProps.purchaseBill.projectList !== this.props.purchaseBill.projectList
    ) {
      let projectData = [];
      this.props.purchaseBill.projectList.forEach((item) => {
        projectData.push({ value: item.IDNumber, label: item.ProjectName });
      });

      this.setState({
        projectList:
          this.props.purchaseBill.projectList &&
          this.props.purchaseBill.projectList.length
            ? projectData
            : [],
      });
    }
    if (
      prevProps.purchaseBill.supplierList !==
      this.props.purchaseBill.supplierList
    ) {
      let supplierData = [];
      this.props.purchaseBill.supplierList.forEach((item) => {
        supplierData.push({ value: item.IDNumber, label: item.SupplierName });
      });

      this.setState({
        supplierList:
          this.props.purchaseBill.supplierList &&
          this.props.purchaseBill.supplierList.length
            ? supplierData
            : [],
      });
    }

    if (
      prevProps.purchaseBill.departmentList !==
      this.props.purchaseBill.departmentList
    ) {
      let departmentData = [];
      this.props.purchaseBill.departmentList.forEach((item) => {
        departmentData.push({ value: item.IDNumber, label: item.Department });
      });

      this.setState({
        departmentList:
          this.props.purchaseBill.departmentList &&
          this.props.purchaseBill.departmentList.length
            ? departmentData
            : [],
      });
    }
    if (prevProps.purchaseBill.taxList !== this.props.purchaseBill.taxList) {
      this.setState({
        taxList:
          this.props.purchaseBill.taxList &&
          this.props.purchaseBill.taxList.length
            ? this.props.purchaseBill.taxList
            : [],
      });
    }

    if (prevProps.purchaseBill.itemList !== this.props.purchaseBill.itemList) {
      this.setState({
        itemList:
          this.props.purchaseBill.itemList &&
          this.props.purchaseBill.itemList.length
            ? this.props.purchaseBill.itemList
            : [],
      });
    }
    if (prevProps.purchaseBill.unitList !== this.props.purchaseBill.unitList) {
      let unitData = [];
      this.props.purchaseBill.unitList.forEach((item) => {
        unitData.push({ value: item.IDNumber, label: item.UnitName });
      });

      this.setState({
        unitList:
          this.props.purchaseBill.unitList &&
          this.props.purchaseBill.unitList.length
            ? unitData
            : [],
      });
    }
    if (
      prevProps.purchaseBill.locationList !==
      this.props.purchaseBill.locationList
    ) {
      this.setState({
        locationList:
          this.props.purchaseBill.locationList &&
          this.props.purchaseBill.locationList.length
            ? this.props.purchaseBill.locationList
            : [],
      });
    }

    if (prevProps.grn.PVDetails !== this.props.grn.PVDetails) {
      let PVData = [];
      this.props.grn.PVDetails.forEach((item) => {
        PVData.push({
          IDNumber: 0,
          ApprovedQty: item.ApprovedQty,
          BaseRate: item.BaseRate,
          DetailID: item.DetailID,
          ItemIDNumber: item.ItemID,
          LocationIDNumber: item.LocationID,
          MLN: item.MLN,
          PODetailID: item.PODetailID,
          Rate: item.Rate,
          Remarks: item.Remarks,
          UnitConvRate: item.UnitConvRate,
          UnitIDNumber: item.UnitID,
          DeletedPVExcises: "",
          PurActID: 0,
          ReturnQty: 0,
          CreatedBy:
            localStorage.getItem("userData") &&
            JSON.parse(localStorage.getItem("userData")).IDNumber,
          CreatedDate: moment(),
          UpdatedBy:
            localStorage.getItem("userData") &&
            JSON.parse(localStorage.getItem("userData")).IDNumber,
          UpdatedDate: moment(),
          PVExcises: [],
        });
      });
      this.props.getPurchaseOrderById({
        IDNumber: this.props.grn.selectedGRN.POID,
      });
      this.setState({
        POID: this.props.grn.selectedGRN.POID,
        PVDetails: this.props.grn.PVDetails ? PVData : [],
      });
    }

    if (
      prevProps.purchaseOrder.PVDetails !== this.props.purchaseOrder.PVDetails
    ) {
      let PVData = [];
      this.props.purchaseOrder.PVDetails.forEach((item) => {
        PVData.push({
          IDNumber: 0,
          ActualQtyReceived: 0,
          BaseAmount: 0,
          BaseUnitReceivedQty: 0,
          ItemAmount: 0,
          ItemTotal: 10,
          ApprovedQty: item.ApprovedQty,
          BaseRate: item.BaseRate,
          DetailID: item.DetailID,
          ItemIDNumber: item.ItemID,
          LocationIDNumber: item.LocationID,
          MLN: item.MLN,
          PODetailID: item.PODetailID,
          Rate: item.Rate,
          Remarks: item.Remarks,
          UnitConvRate: item.UnitConvRate,
          UnitIDNumber: item.UnitID,
          DeletedPVExcises: "",
          PurActID: 0,
          ReturnQty: 0,
          CreatedBy:
            localStorage.getItem("userData") &&
            JSON.parse(localStorage.getItem("userData")).IDNumber,
          CreatedDate: moment(),
          UpdatedBy:
            localStorage.getItem("userData") &&
            JSON.parse(localStorage.getItem("userData")).IDNumber,
          UpdatedDate: moment(),
          PVExcises: [],
        });
      });
      this.props.getPurchaseOrderById({
        IDNumber: this.props.purchaseOrder.selectedGRN.POID,
      });
      this.setState({
        ProjectID: this.props.purchaseOrder.selectedGRN.ProjectID,
        SupplierID: this.props.purchaseOrder.selectedGRN.SupplierID,
        DepartmentID: this.props.purchaseOrder.selectedGRN.DepartmentID,
        POID: this.props.purchaseOrder.selectedGRN.POID,
        PVDetails: this.props.purchaseOrder.PVDetails ? PVData : [],
      });
    }

    if (
      prevProps.purchaseBill.data !== this.props.purchaseBill.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.purchaseBill.data &&
        this.props.purchaseBill.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        parentIDNumber: filterData?.IDNumber,
        GRNID: filterData?.GRNID,
        SupplierID: filterData?.SupplierID,
        ProjectID: filterData?.ProjectID,
        ReceiptDate: filterData?.ReceiptDate,
        BillDate: filterData?.BillDate,
        IndentTime: filterData?.IndentTime,
        PVDetails: filterData?.PVDetails,
        Remarks: filterData?.Remarks,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  toggleModal = (data) => {
    // document.getElementsByClassName("taxDetail").style.display = "none";
    document.getElementById("taxDetail" + data.IDNumber).style.display = "flex";
  };

  onInputChange = (value, name, id) => {
    const exist = this.state.PVDetails?.filter((data) => {
      return data.IDNumber === id;
    })?.[0];
    const unique = this.state.PVDetails?.filter((data) => {
      return data.IDNumber !== id;
    });
    exist[name] = value;

    exist["BaseQty"] = exist?.Qty * exist?.ConvFactor;
    exist["BaseRate"] =
      (exist?.Qty * exist?.Rate) / (exist?.Qty * exist?.ConvFactor);
    exist["BaseAmount"] = exist?.BaseQty * exist?.BaseRate;

    exist["DISCAMT"] = exist?.DISCPERC
      ? (exist?.Rate * exist?.Qty * exist?.DISCPERC) / 100
      : 0;

    exist["DISCPERC"] = exist?.DISCAMT
      ? Math.ceil((100 * exist?.DISCAMT) / (exist?.Rate * exist?.Qty))
      : 0;

    exist["Amount"] = exist?.Rate * exist?.Qty - exist?.DISCAMT;

    this.setState({
      PVDetails: [
        {
          ...exist,
          [name]: value,
        },
        ...unique,
      ],
    });
  };

  onTaxInputChange = (value, name, id) => {
    const exist = this.state.PVExcises?.filter((data) => {
      return data.IDNumber === id;
    })?.[0];
    const unique = this.state.PVExcises?.filter((data) => {
      return data.IDNumber !== id;
    });
    exist[name] = value;

    this.setState({
      PVExcises: [
        ...unique,
        {
          ...exist,
          [name]: value,
        },
      ],
    });
  };

  handleTaxOperation = (data) => {
    let { PVDetails } = this.state;
    let index = PVDetails.findIndex((d) => d.ItemID === data.ItemID);

    let tmpPVExcises = PVDetails[index].PVExcises
      ? [...PVDetails[index].PVExcises]
      : [];

    if (tmpPVExcises && tmpPVExcises.length > 0) {
      PVDetails[index]["PVExcises"].push({
        IDNumber: 0,
        AccessableValue: null,
        BaseCurrAmount: 1,
        BillDate: null,
        BillNo: null,
        CashBankID: 15,
        ChequeDate: null,
        ChequeNo: null,
        CurrencyIDNumber: 1,
        DebitExpAccountID: null,
        ExpenseAmount: 0,
        IsDebitActReq: null,
        PRIDNumber: 0,
        PurExpIDNumber: this.state.TaxID,
        ItemID: data.ItemID,
        TaxID: this.state.TaxID,
        PODetailID: this.state.PODetailID,
        AccountID: this.state.AccountID,
        Percentage: parseFloat(this.state.Percentage),
        Amount: this.state.TaxAmount,
        AmountBase: this.state.TaxAmount,
        AmountWithIT: 0,
        ValueType: this.state.ValueType,
        ValueTypeName: this.state.ValueTypeName,
        Remarks: this.state.TaxRemarks ? this.state.TaxRemarks : "",
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
      PVDetails[index]["PVExcises"] = [
        {
          IDNumber: 0,
          AccessableValue: null,
          BaseCurrAmount: 1,
          BillDate: null,
          BillNo: null,
          CashBankID: 15,
          ChequeDate: null,
          ChequeNo: null,
          CurrencyIDNumber: 1,
          DebitExpAccountID: null,
          ExpenseAmount: 0,
          IsDebitActReq: null,
          PRIDNumber: 0,
          PurExpIDNumber: this.state.TaxID,
          ItemID: data.ItemID,
          TaxID: this.state.TaxID,
          PODetailID: this.state.PODetailID,
          AccountID: this.state.AccountID,
          Percentage: parseInt(this.state.Percentage),
          Amount: this.state.TaxAmount,
          AmountBase: this.state.TaxAmount,
          AmountWithIT: 0,
          ValueType: this.state.ValueType,
          ValueTypeName: this.state.ValueTypeName,
          Remarks: this.state.TaxRemarks ? this.state.TaxRemarks : "",
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
      PVDetails,
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
    const exist = this.state.PVDetails?.filter((data) => {
      return data.IDNumber === this.state.id;
    })?.[0];
    if (exist) {
      let objectIndex = this.state.PVDetails.findIndex(
        (d) => d.IDNumber === this.state.id
      );
      let tmpPVDetails = [...this.state.PVDetails];

      tmpPVDetails[objectIndex] = {
        ...tmpPVDetails[objectIndex],
        LocationID: this.state.LocationID,
        LocationIDNumber: this.state.LocationIDNumber,
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
        PVDetails: tmpPVDetails,
      });
    } else {
      if (this.state.PVDetails !== null && this.state.PVDetails.length > 0) {
        this.setState({
          PVDetails: [
            ...this.state.PVDetails,
            {
              IDNumber: 0,
              ActualQtyReceived: null,
              ApprovedQty: 0,
              POTranMastIDNumber: 0,
              LocationID: this.state.LocationID,
              LocationIDNumber: this.state.LocationIDNumber,
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
              DISCPERC: this.state.DISCPERC ? this.state.DISCPERC : 0,
              DISCAMT: this.state.DISCAMT ? this.state.DISCAMT : 0,
              ItemTotal: this.state.Amount,
              ItemAmount: this.state.Rate,
              MLN: null,
              OrderedQty: 0,
              PODetailID: null,
              POUnitIDNumber: null,
              PRIDNumber: null,
              PurActID: 0,
              DetailID: 0,
              DeletedPVExcises: null,
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
          PVDetails: [
            {
              IDNumber: 0,
              ActualQtyReceived: null,
              ApprovedQty: 0,
              POTranMastIDNumber: 0,
              LocationID: this.state.LocationID,
              LocationIDNumber: this.state.LocationIDNumber,
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
              DISCPERC: this.state.DISCPERC ? this.state.DISCPERC : 0,
              DISCAMT: this.state.DISCAMT ? this.state.DISCAMT : 0,
              ItemTotal: this.state.Amount,
              ItemAmount: this.state.Rate,
              MLN: null,
              OrderedQty: 0,
              PODetailID: null,
              POUnitIDNumber: null,
              PRIDNumber: null,
              PurActID: 0,
              DetailID: 0,
              DeletedPVExcises: null,
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
      ItemID: 0,
      ItemIDNumber: 0,
      Qty: "",
      Quantity: "",
      UnitID: 0,
      UnitIDNumber: 0,
      Rate: "",
      Rec_Qty: "",
      InwardQty: "",
      BaseAmount: "",
      TotalIndentQty: "",
      QtyPerUnit: "",
      RatePerUnit: "",
      BaseQty: "",
      DISCPERC: "",
      DISCAMT: "",
      Remarks: "",
    });
  };

  copyTaxesToAllItems = () => {
    let { PVDetails } = this.state;
    PVDetails = PVDetails.map((d, i) => [
      ...d,
      (d.PVExcises = PVDetails[0]?.PVExcises),
    ]);
    this.setState({
      PVDetails,
    });
  };

  handlePOAttachment = (e) => {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
  };

  deletePOAttachment = (url) => {
    let { file } = this.state;
    file.splice(file.indexOf(url), 1);
    this.setState({ file });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const {
      BasedOn,
      GRNID,
      POID,
      ProjectID,
      SupplierID,
      DepartmentID,
      ReceiptDate,
      BillDate,
      BillNo,
      Remarks,
      PVDetails,
      DeletedPVDetails,
      file,
    } = this.state;
    if (
      BasedOn &&
      ProjectID &&
      SupplierID &&
      DepartmentID &&
      ReceiptDate &&
      BillDate &&
      BillNo &&
      PVDetails.length > 0
    ) {
      let ItemTotalAmount = parseInt(
          PVDetails.reduce((d, b) => d + b.Amount, 0)
        ),
        ItemTotalBaseAmount = parseInt(
          PVDetails.reduce((d, b) => d + b.BaseAmount, 0)
        ),
        TaxAmount = parseInt(
          PVDetails.map((data) =>
            data?.PVExcises
              ? data?.PVExcises.reduce((d, b) => d + b.Amount, 0)
              : 0
          )
        ),
        TaxBaseAmount = parseInt(
          PVDetails.map((data) =>
            data?.PVExcises
              ? data?.PVExcises.reduce((d, b) => d + b.AmountBase, 0)
              : 0
          )
        ),
        NetAmount = ItemTotalAmount + TaxAmount,
        NetBaseAmount = ItemTotalBaseAmount + TaxBaseAmount,
        DiscountAmount = 0,
        DiscountBaseAmount = 0,
        ExciseAmount = 0,
        ExciseBaseAmount = 0,
        ExpenseAmount = 0,
        ExpenseBaseAmount = 0;

      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        ItemTotalAmount,
        ItemTotalBaseAmount,
        TaxAmount,
        TaxBaseAmount,
        NetAmount,
        NetBaseAmount,
        DiscountAmount,
        DiscountBaseAmount,
        ExciseAmount,
        ExciseBaseAmount,
        ExpenseAmount,
        ExpenseBaseAmount,
        BasedOn,
        GRNID: GRNID ? GRNID : 0,
        POIDNumber: POID ? POID : 0,
        ProjectID,
        SupplierIDNumber: SupplierID,
        DepartmentID,
        PRNo: "",
        PurchaseAccount: 0,
        PurchaseType: 0,
        Remarks,
        file,
        ReceiptDate:
          typeof ReceiptDate === "object"
            ? moment(ReceiptDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : ReceiptDate,
        BillNo,
        BillDate:
          typeof BillDate === "object"
            ? moment(BillDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : BillDate,
        POStatus: 1,
        RoundOff: 0,
        RoundOffBaseAmount: null,
        PVDetails,
        DeletedPVDetails,
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
      console.log("postData", postData);

      if (history?.location?.state?.id) {
        await this.props.addPurchaseBill({
          ...postData,
        });
      } else {
        await this.props.addPurchaseBill(postData);
      }
      await this.resetState();
      await history.push("/Purchase/PurchaseBill");
    }
  };

  resetState = () => {
    this.setState({
      SupplierID: 0,
      LocationID: 0,
      ReceiptDate: null,
      IndentTime: null,
      ItemID: null,
      PVDetails: [],
    });
  };

  render() {
    const { btnFlg, PVDetails, taxList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Purchase Bill</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Purchase/PurchaseBill")}
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
                      <Label>GRN</Label>
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="GRNIDSelect"
                        name="GRNIDSelect"
                        value={this.state?.GRNID}
                        className={`p-0 pl-1 ${
                          btnFlg && !this.state?.GRNID ? "invalid-input" : ""
                        }`}
                        onChange={(e) => {
                          this.setState({
                            GRNID: parseInt(e.target.value),
                          });
                          this.props.getGRNById({
                            IDNumber: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Select GRN</option>
                        {this.state.grnList &&
                          this.state.grnList?.length > 0 &&
                          this.state.grnList.map((d, i) => (
                            <option value={d.IDNumber} key={d.IDNumber}>
                              {d.InwardNo}
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
                </FormGroup>

                <FormGroup row>
                  <Col>
                    <Label>Receipt Date</Label>
                    <Flatpickr
                      value={this.state.ReceiptDate}
                      onChange={(date) => {
                        this.setState({ ReceiptDate: date });
                      }}
                      placeholder="PO Date"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.ReceiptDate?.[0]
                          ? "invalid-input"
                          : ""
                      }`}
                    />
                    {btnFlg && !this.state?.ReceiptDate?.[0] && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Bill No</Label>
                    <Input
                      bsSize="sm"
                      type="numeric"
                      value={this.state.BillNo ? this.state.BillNo : ""}
                      onChange={(e) => this.onChange(e, "BillNo")}
                      name="BillNo"
                      placeholder="BillNo"
                    />
                  </Col>

                  <Col>
                    <Label>Bill Date</Label>
                    <Flatpickr
                      value={this.state.BillDate}
                      onChange={(date) => {
                        this.setState({ BillDate: date });
                      }}
                      placeholder="Bill Date"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.BillDate?.[0]
                          ? "invalid-input"
                          : ""
                      }`}
                    />
                    {btnFlg && !this.state?.BillDate?.[0] && <ErrorText />}
                  </Col>

                  <Col>
                    <Label>Remarks</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.Remarks ? this.state.Remarks : ""}
                      onChange={(e) => this.onChange(e, "Remarks")}
                      name="Remarks"
                      placeholder="Remarks"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm="8">
                    <FormGroup>
                      <Label for="PBAttchment">PB Attachment</Label>
                      <CustomInput
                        type="file"
                        bsSize="sm"
                        id="PBAttchment"
                        name="PBAttchment"
                        multiple
                        onChange={(e) => this.handlePOAttachment(e)}
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>

                <div className="d-flex w-100">
                  {(this.fileArray || []).map((url) => (
                    <>
                      <img
                        src={url}
                        alt="..."
                        style={{
                          width: "20%",
                          height: "100px",
                          marginTop: "5px",
                        }}
                      />
                      <Button
                        color="danger"
                        className="cursor-pointer action-btn mr-1 ml-1"
                        size="sm"
                        onClick={() => this.deletePOAttachment(url)}
                      >
                        <Trash size={16} />
                      </Button>
                    </>
                  ))}
                </div>

                {/* itemdetail ::start */}
                <FormGroup row id="itemdetail">
                  <div className="d-flex w-100 pl-2 pr-2 justify-content-between">
                    <CardTitle>Item Details</CardTitle>
                    {PVDetails[0]?.PVExcises?.length > 0 ? (
                      <Button
                        color="primary"
                        size="sm"
                        className="cursor-pointer action-btn"
                        onClick={() => this.copyTaxesToAllItems()}
                      >
                        Copy to All Items
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>

                  <Col sm="12" className="text-center">
                    {btnFlg && !this.state?.PVDetails.length && (
                      <ErrorText text="There must be at least one item detail" />
                    )}
                  </Col>

                  <div className="d-flex w-100">
                    <Col sm="2">
                      <Label className="m-0"></Label>
                    </Col>
                    <Col sm="2">
                      <Label className="m-0">Location</Label>
                    </Col>
                    <Col sm="2">
                      <Label className="m-0">Item</Label>
                    </Col>
                    <Col sm="1">
                      <Label className="m-0">Qty</Label>
                    </Col>
                    <Col sm="1">
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

                  {this.state.PVDetails?.length > 0 &&
                    this.state.PVDetails?.map((data, i) => {
                      return (
                        <React.Fragment key={"PVDetails" + i}>
                          <div
                            className="d-flex w-100 mt-1"
                            key={"PVDetails" + i}
                          >
                            <Col sm="2" className=" text-center">
                              <Button
                                color="primary"
                                className="cursor-pointer action-btn mr-1"
                                size="sm"
                                onClick={() => this.toggleModal(data)}
                              >
                                Add Tax
                              </Button>
                              <Button
                                color="danger"
                                className="cursor-pointer action-btn"
                                size="sm"
                                onClick={() => {
                                  let objectIndex = this.state.PVDetails.findIndex(
                                    (d) => d.IDNumber === data.IDNumber
                                  );
                                  this.state.PVDetails.splice(objectIndex, 1);
                                  this.setState({
                                    DeletedPVDetails:
                                      this.state.DeletedPVDetails +
                                      "," +
                                      data.IDNumber,
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
                                id={"LocationIDSelect" + i}
                                name={"LocationIDSelect" + i}
                                value={data?.LocationID ? data?.LocationID : 0}
                                className={"p-0 pl-1"}
                                onChange={(e) => {
                                  this.onInputINWListChange(
                                    parseInt(e.target.value),
                                    "LocationID",
                                    data?.IDNumber
                                  );
                                }}
                              >
                                <option value="0">Select Location</option>
                                {this.state.locationList &&
                                  this.state.locationList?.length > 0 &&
                                  this.state.locationList.map((d, i) => (
                                    <option value={d.IDNumber} key={d.IDNumber}>
                                      {d.LocationName}
                                    </option>
                                  ))}
                              </CustomInput>
                            </Col>

                            <Col sm="2">
                              <CustomInput
                                bsSize="sm"
                                type="select"
                                id={"ItemIDSelect" + i}
                                name={"ItemIDSelect" + i}
                                value={data?.ItemID ? data?.ItemID : 0}
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
                                value={data?.Qty ? data?.Qty : ""}
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

                            <Col sm="1">
                              <CustomInput
                                bsSize="sm"
                                type="select"
                                id={"UnitIDSelect" + i}
                                name={"UnitIDSelect" + i}
                                value={data?.UnitID ? data?.UnitID : ""}
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
                            id={"taxDetail" + data?.IDNumber}
                            style={{ display: "none" }}
                          >
                            <FormGroup className="mt-1 pl-2 pr-2">
                              <Row key={"PVExcises" + i}>
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
                              {data?.PVExcises?.length > 0 &&
                                data?.PVExcises.map((txtData, i) => (
                                  <React.Fragment
                                    key={"PVExcises" + txtData.IDNumber}
                                  >
                                    <Row className="mt-1">
                                      <Col className=" text-center">
                                        <Button
                                          color="danger"
                                          className="cursor-pointer action-btn"
                                          size="sm"
                                          onClick={() => {
                                            let objectIndex = this.state.PVExcises.findIndex(
                                              (d) =>
                                                d.IDNumber === txtData.IDNumber
                                            );
                                            this.state.PVExcises.splice(
                                              objectIndex,
                                              1
                                            );
                                            this.setState({
                                              DeletedPVExcises:
                                                this.state.DeletedPVExcises +
                                                "," +
                                                txtData.IDNumber,
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
                                <Col className=" text-center">
                                  <Button
                                    size="sm"
                                    color="primary"
                                    className="cursor-pointer action-btn mr-1"
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
                        id={"LocationIDSelect"}
                        name={"LocationIDSelect"}
                        value={
                          this.state?.LocationID ? this.state?.LocationID : 0
                        }
                        className={"p-0 pl-1"}
                        onChange={(e) => {
                          this.setState({
                            LocationID: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Select Location</option>
                        {this.state.locationList &&
                          this.state.locationList?.length > 0 &&
                          this.state.locationList.map((d, i) => (
                            <option value={d.IDNumber} key={d.IDNumber}>
                              {d.LocationName}
                            </option>
                          ))}
                      </CustomInput>
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
                          let index = this.state.itemList.findIndex(
                            (d) => d.ItemID === parseInt(e.target.value)
                          );
                          this.setState({
                            ItemIDNumber: parseInt(e.target.value),
                            ItemID: parseInt(e.target.value),
                            ConvFactor: this.state.itemList[index].ConvFactor,
                          });
                        }}
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

                    <Col sm="1">
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
                            BaseRate:
                              (this.state.Qty * parseInt(e.target.value)) /
                              this.state.BaseQty,
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
                      value={PVDetails.reduce((d, b) => d + b.Amount, 0)}
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
                      value={PVDetails.map((data, i) =>
                        data?.PVExcises
                          ? data?.PVExcises.reduce((d, b) => d + b.Amount, 0)
                          : 0
                      )}
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
                      value={
                        parseInt(PVDetails.reduce((d, b) => d + b.Amount, 0)) +
                        parseInt(
                          PVDetails.map((data, i) =>
                            data?.PVExcises
                              ? data?.PVExcises.reduce(
                                  (d, b) => d + b.Amount,
                                  0
                                )
                              : 0
                          )
                        )
                      }
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
    grn: state.grn,
    purchaseOrder: state.purchaseOrder,
    purchaseBill: state.purchaseBill,
  };
};

export default connect(mapStateToProps, {
  getPurchaseBill,
  getPurchaseBillDropDown,
  addPurchaseBill,
  getGRNById,
  getPurchaseOrderById,
})(PurchaseBillNew);
