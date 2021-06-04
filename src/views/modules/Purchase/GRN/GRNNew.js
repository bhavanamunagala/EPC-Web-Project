import React from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "../../style.css";
import { getPurchaseOrderById } from "../../../../redux/actions/Purchase/PurchaseOrder";
import {
  getGRN,
  getGRNDropDown,
  addGRN,
} from "../../../../redux/actions/Purchase/GRN";
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

class GRNNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      projectList: [],
      supplierList: [],
      locationList: [],
      itemList: [],
      unitList: [],
      purchaseOrderList: [],
      INWDetails: [],
      DeletedINWDetails: "",
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getGRN(postData);
    this.props.getGRNDropDown(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.grn.error !== this.props.grn.error && this.props.grn.error) {
      toast.error(this.props.grn.error);
    }
    if (
      prevProps.grn.successMsg !== this.props.grn.successMsg &&
      this.props.grn.successMsg
    ) {
      toast.success(this.props.grn.successMsg);
    }
    if (prevProps.grn.data !== this.props.grn.data) {
      this.setState({
        response:
          this.props.grn.data && this.props.grn.data.length
            ? this.props.grn.data
            : [],
        random: this.props.grn.random,
      });
    }
    if (prevProps.grn.projectList !== this.props.grn.projectList) {
      let projectData = [];
      this.props.grn.projectList.forEach((item) => {
        projectData.push({ value: item.IDNumber, label: item.ProjectName });
      });

      this.setState({
        projectList:
          this.props.grn.projectList && this.props.grn.projectList.length
            ? projectData
            : [],
      });
    }
    if (prevProps.grn.supplierList !== this.props.grn.supplierList) {
      let supplierData = [];
      this.props.grn.supplierList.forEach((item) => {
        supplierData.push({ value: item.IDNumber, label: item.SupplierName });
      });

      this.setState({
        supplierList:
          this.props.grn.supplierList && this.props.grn.supplierList.length
            ? supplierData
            : [],
      });
    }
    if (prevProps.grn.locationList !== this.props.grn.locationList) {
      let itemData = [];
      this.props.grn.locationList.forEach((item) => {
        itemData.push({ value: item.IDNumber, label: item.LocationName });
      });

      this.setState({
        locationList:
          this.props.grn.locationList && this.props.grn.locationList.length
            ? itemData
            : [],
      });
    }
    if (prevProps.grn.itemList !== this.props.grn.itemList) {
      this.setState({
        itemList:
          this.props.grn.itemList && this.props.grn.itemList.length
            ? this.props.grn.itemList
            : [],
      });
    }
    if (prevProps.grn.unitList !== this.props.grn.unitList) {
      let unitData = [];
      this.props.grn.unitList.forEach((item) => {
        unitData.push({ value: item.IDNumber, label: item.UnitName });
      });

      this.setState({
        unitList:
          this.props.grn.unitList && this.props.grn.unitList.length
            ? unitData
            : [],
      });
    }
    if (prevProps.grn.purchaseOrderList !== this.props.grn.purchaseOrderList) {
      let purchaseOrderData = [];
      this.props.grn.purchaseOrderList.forEach((item) => {
        purchaseOrderData.push({ value: item.IDNumber, label: item.PONo });
      });

      this.setState({
        purchaseOrderList:
          this.props.grn.purchaseOrderList &&
          this.props.grn.purchaseOrderList.length
            ? purchaseOrderData
            : [],
      });
    }
    if (
      prevProps.purchaseOrder.inwList !== this.props.purchaseOrder.inwList &&
      !history?.location?.state?.id
    ) {
      let INWData = [];
      this.props.purchaseOrder.inwList.forEach((item) => {
        INWData.push({
          IDNumber: 0,
          ItemID: item.ItemIDNumber,
          UnitID: item.UnitIDNumber,
          Quantity: item.Quantity,
          ReceivedQty: parseInt(item.Rec_Quantity),
          ApprovedQty: parseInt(item.Rec_Quantity),
          PODetailid: item.IDNumber,
          Amount: item.Amount,
          BaseRate: item.BaseRate,
          Rate: item.Rate,
        });
      });
      this.setState({
        ProjectID: this.props.purchaseOrder.selectedPO.ProjectID,
        INWDetails:
          this.props.purchaseOrder.inwList &&
          this.props.purchaseOrder.inwList.length
            ? INWData
            : [],
      });
    }

    if (
      prevProps.grn.data !== this.props.grn.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.grn.data &&
        this.props.grn.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.props.getPurchaseOrderById({
        IDNumber: filterData?.POID,
      });

      this.setState({
        POID: filterData?.POID,
        SupplierID: filterData?.SupplierID,
        ProjectID: filterData?.ProjectID,
        InwardDate: filterData?.InwardDate,
        BillNo: filterData?.BillNo,
        BillDate: filterData?.BillDate,
        ChallanNo: filterData?.ChallanNo,
        ChallanDate: filterData?.ChallanDate,
        INWDetails: filterData?.INWDetails,
        Remarks: filterData?.Remarks,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  onInputINWListChange = (value, name, id) => {
    const exist = this.state.INWDetails?.filter((data) => {
      return data.IDNumber === id;
    })?.[0];
    const unique = this.state.INWDetails?.filter((data) => {
      return data.IDNumber !== id;
    });

    exist[name] = value;
    exist["INWARDID"] = exist.INWARDID ? exist.INWARDID : 0;
    exist["QtyRemain"] = exist.Quantity - exist.ReceivedQty;
    exist["BaseUnitQty"] = exist.ReceivedQty * 1;
    exist["BaseUnitApprovedQty"] = exist.ReceivedQty * 1;
    exist["MLN"] = "";
    exist["UnitConvRate"] = "";
    exist["CreatedBy"] =
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData")).IDNumber;
    exist["CreatedDate"] = moment();
    exist["UpdatedBy"] =
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData")).IDNumber;
    exist["UpdatedDate"] = moment();

    this.setState({
      INWDetails: [
        {
          ...exist,
          [name]: value,
        },
        ...unique,
      ],
    });
  };

  handleINWListOperation = () => {
    let { INWDetails } = this.state;
    const exist = INWDetails?.filter((data) => {
      return data.IDNumber === this.state.id;
    })?.[0];
    if (exist) {
      let objectIndex = INWDetails.findIndex(
        (d) => d.IDNumber === this.state.id
      );
      let tmpINWList = [...INWDetails];

      tmpINWList[objectIndex] = {
        ...tmpINWList[objectIndex],
        LocationID: this.state.LocationID,
        ItemID: this.state.ItemID,
        UnitID: this.state.UnitID,
        ReceivedQty: this.state.ReceivedQty,
        Rate: this.state.Rate,
        Remarks: this.state.INWRemarks,
        INWARDID: 0,
        QtyRemain: 0,
        BaseUnitQty: this.state.ReceivedQty * this.state.ConvFactor,
        BaseUnitApprovedQty: exist.ReceivedQty * this.state.ConvFactor,
        MLN: "",
        UnitConvRate: "",
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
        INWDetails: tmpINWList,
      });
    } else {
      if (this.state.INWDetails !== null && this.state.INWDetails.length > 0) {
        this.setState({
          INWDetails: [
            ...this.state.INWDetails,
            {
              IDNumber: 0,
              LocationID: this.state.LocationID,
              ItemID: this.state.ItemID,
              UnitID: this.state.UnitID,
              ReceivedQty: this.state.ReceivedQty,
              Rate: this.state.Rate,
              Remarks: this.state.INWRemarks,
              INWARDID: 0,
              QtyRemain: 0,
              BaseUnitQty: this.state.ReceivedQty * this.state.ConvFactor,
              BaseUnitApprovedQty: exist.ReceivedQty * this.state.ConvFactor,
              MLN: "",
              UnitConvRate: "",
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
          INWDetails: [
            {
              IDNumber: 0,
              LocationID: this.state.LocationID,
              ItemID: this.state.ItemID,
              UnitID: this.state.UnitID,
              ReceivedQty: this.state.ReceivedQty,
              Rate: this.state.Rate,
              Remarks: this.state.INWRemarks,
              INWARDID: 0,
              QtyRemain: 0,
              BaseUnitQty: this.state.ReceivedQty * this.state.ConvFactor,
              BaseUnitApprovedQty:
                this.state.ReceivedQty * this.state.ConvFactor,
              MLN: "",
              UnitConvRate: "",
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
      LocationID: 0,
      ItemID: 0,
      UnitID: 0,
      ReceivedQty: "",
      Rate: "",
      INWRemarks: "",
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const {
      POID,
      ProjectID,
      SupplierID,
      InwardDate,
      BillNo,
      BillDate,
      ChallanNo,
      ChallanDate,
      Remarks,
      INWDetails,
      DeletedINWDetails,
      itemData,
    } = this.state;
    if (
      POID &&
      ProjectID &&
      SupplierID &&
      InwardDate &&
      BillNo &&
      BillDate &&
      ChallanNo &&
      ChallanDate &&
      INWDetails.length > 0
    ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        POID,
        ProjectID,
        SupplierID,
        InwardDate:
          typeof InwardDate === "object"
            ? moment(InwardDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : InwardDate,
        BillNo,
        BillDate:
          typeof BillDate === "object"
            ? moment(BillDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : BillDate,
        ChallanNo,
        ChallanDate:
          typeof ChallanDate === "object"
            ? moment(ChallanDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : ChallanDate,
        Remarks,
        INWDetails,
        DeletedINWDetails,
        InwardType: 1,
        PurchaseType: 1,
        Approved: 1,
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
        await this.props.addGRN({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addGRN(postData);
      }
      await this.resetState();
      await history.push("/Purchase/GRN");
    }
  };

  resetState = () => {
    this.setState({
      SupplierID: 0,
      LocationID: 0,
      PODate: null,
      IndentTime: null,
      ItemID: null,
      INWDetails: [],
    });
  };

  render() {
    const { btnFlg } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>GRN</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Purchase/GRN")}
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
                    <Label>Purhcase Order</Label>
                    <CustomInput
                      bsSize="sm"
                      type="select"
                      id="POIDSelect"
                      name="POIDSelect"
                      value={this.state?.POID ? this.state?.POID : 0}
                      className={`p-0 pl-1 `}
                      onChange={(e) => {
                        this.setState({ POID: parseInt(e.target.value) });
                        this.props.getPurchaseOrderById({
                          IDNumber: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">Select Purchase Order</option>
                      {this.state.purchaseOrderList &&
                        this.state.purchaseOrderList?.length > 0 &&
                        this.state.purchaseOrderList.map((d, i) => (
                          <option value={d.value} key={d.value}>
                            {d.label}
                          </option>
                        ))}
                    </CustomInput>
                    {btnFlg && !this.state?.POID && <ErrorText />}
                  </Col>
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
                    <Label>Inward Date</Label>
                    <Flatpickr
                      value={this.state.InwardDate}
                      onChange={(date) => {
                        this.setState({ InwardDate: date });
                      }}
                      placeholder="Inward Date"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.InwardDate?.[0]
                          ? "invalid-input"
                          : ""
                      }`}
                    />
                    {btnFlg && !this.state?.InwardDate?.[0] && <ErrorText />}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col>
                    <Label>Bill No</Label>
                    <Input
                      bsSize="sm"
                      type="text"
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
                    <Label>Challan No</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.ChallanNo ? this.state.ChallanNo : ""}
                      onChange={(e) => this.onChange(e, "ChallanNo")}
                      name="ChallanNo"
                      placeholder="ChallanNo"
                    />
                  </Col>
                  <Col>
                    <Label>Challan Date</Label>
                    <Flatpickr
                      value={this.state.ChallanDate}
                      onChange={(date) => {
                        this.setState({ ChallanDate: date });
                      }}
                      placeholder="Challan Date"
                      className={`form-control form-control-sm ${
                        btnFlg && !this.state?.ChallanDate?.[0]
                          ? "invalid-input"
                          : ""
                      }`}
                    />
                    {btnFlg && !this.state?.ChallanDate?.[0] && <ErrorText />}
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

                {/* itemdetail ::start */}
                <FormGroup row id="itemdetail">
                  <Col sm="12">
                    <CardTitle>INW Details</CardTitle>
                  </Col>

                  <Col sm="12" className="text-center">
                    {btnFlg && !this.state?.INWDetails.length && (
                      <ErrorText text="There must be at least one item detail" />
                    )}
                  </Col>

                  <div className="d-flex w-100">
                    <Col sm="1">
                      <Label></Label>
                    </Col>
                    <Col sm="2">
                      <Label>Location</Label>
                    </Col>
                    <Col sm="2">
                      <Label>Item</Label>
                    </Col>
                    <Col sm="1">
                      <Label>ReceivedQty</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Unit</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Rate</Label>
                    </Col>
                    <Col sm="1">
                      <Label>Remarks</Label>
                    </Col>
                  </div>

                  {this.state.INWDetails?.length > 0 &&
                    this.state.INWDetails.map((data, i) => (
                      <div className="d-flex w-100 mt-1" key={"INWDetails" + i}>
                        <Col sm="1" className=" text-center">
                          <Button
                            color="danger"
                            className="cursor-pointer action-btn"
                            size="sm"
                            onClick={() => {
                              let objectIndex = this.state.INWDetails.findIndex(
                                (d) => d.IDNumber === data.IDNumber
                              );
                              this.state.INWDetails.splice(objectIndex, 1);
                              this.setState({
                                DeletedINWDetails:
                                  this.state.DeletedINWDetails +
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
                                <option value={d.value} key={d.value}>
                                  {d.label}
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
                              this.onInputINWListChange(
                                parseInt(e.target.value),
                                "ItemID",
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
                            value={data?.ReceivedQty ? data?.ReceivedQty : ""}
                            onChange={(e) =>
                              this.onInputINWListChange(
                                parseInt(e.target.value),
                                "ReceivedQty",
                                data?.IDNumber
                              )
                            }
                            name={"quantity" + i}
                            placeholder="ReceivedQty"
                          />
                        </Col>

                        <Col sm="1">
                          <CustomInput
                            bsSize="sm"
                            type="select"
                            id={"UnitID" + i}
                            value={data?.UnitID ? data?.UnitID : ""}
                            className={`p-0 pl-1`}
                            onChange={(e) => {
                              this.onInputINWListChange(
                                parseInt(e.target.value),
                                "UnitID",
                                data?.IDNumber
                              );
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
                            value={data?.Rate ? data?.Rate : ""}
                            onChange={(e) =>
                              this.onInputINWListChange(
                                parseInt(e.target.value),
                                "Rate",
                                data?.IDNumber
                              )
                            }
                            name={"Rate"}
                            placeholder="Rate"
                          />
                        </Col>

                        <Col sm="1">
                          <Input
                            bsSize="sm"
                            type="text"
                            value={data?.Remarks ? data?.Remarks : ""}
                            onChange={(e) =>
                              this.onInputINWListChange(
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
                    ))}

                  <div className="d-flex w-100 mt-1">
                    <Col sm="1" className="text-center">
                      <Button
                        size="sm"
                        color="primary"
                        className="cursor-pointer action-btn "
                        onClick={() => this.handleINWListOperation()}
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
                            <option value={d.value} key={d.value}>
                              {d.label}
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
                        value={
                          this.state?.ReceivedQty ? this.state?.ReceivedQty : ""
                        }
                        onChange={(e) => this.onChange(e, "ReceivedQty")}
                        name={"ReceivedQty"}
                        placeholder="ReceivedQty"
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
                        onChange={(e) =>
                          this.setState({
                            Rate: parseInt(e.target.value),
                          })
                        }
                        name={"Rate"}
                        placeholder="Rate"
                      />
                    </Col>

                    <Col sm="1">
                      <Input
                        bsSize="sm"
                        type="text"
                        value={
                          this.state?.INWRemarks ? this.state?.INWRemarks : ""
                        }
                        onChange={(e) =>
                          this.setState({
                            INWRemarks: e.target.value,
                          })
                        }
                        name="Remarks"
                        placeholder="Remarks"
                      />
                    </Col>
                  </div>
                  {/* </Col> */}
                </FormGroup>

                {/* itemdetail ::end */}
              </div>

              <div row="true" className="mt-1 mb-1">
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
  };
};

export default connect(mapStateToProps, {
  getGRN,
  getGRNDropDown,
  addGRN,
  getPurchaseOrderById,
})(GRNNew);
