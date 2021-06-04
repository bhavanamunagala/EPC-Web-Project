import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";

import "../../style.css";
import { getStateData } from "../../../../redux/actions/Administration/state";
import { getDistrict } from "../../../../redux/actions/Administration/district";
import { getCity } from "../../../../redux/actions/Administration/city";
import {
  getSupplier,
  getSupplierMetaData,
  getSupplierItemData,
  addSupplier,
} from "../../../../redux/actions/Administration/supplier";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Form,
  Col,
  Nav,
  NavItem,
  NavLink,
  Badge,
  CustomInput,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Button, Input, Label } from "reactstrap";

import { Eye, Trash, Plus } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { history } from "../../../../history";
// import Select from "react-select";
import classnames from "classnames";
import ErrorText from "../../../../views/ui-elements/text-utilities/ErrorText";

class SupplierNewView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      CountryID: "",
      successMsg: "",
      deleteAlert: false,
      CountryName: "",
      SupplierCode: "",
      SupplierName: "",
      GroupID: "",
      Cre_Days: "",
      BaseunitID: "",
      PANNo: "",
      TransUnt: "",
      ZipCode: "",
      WorkAddress: "",
      ISBaseUpperUnit: false,
      ISTranUpperUnit: false,
      itemData: null,
      ItemGroupList: [],
      ItemUnitList: [],
      activeTab: "1",
      modal: false,
      itemmodal: false,
      ContactDetails: [],
      id: null,
      SupplierItemDetails: [],
      btnFlg: false,
      filteredcityList: [],
      filtereddistrictList: [],
      filteredstateList: [],
      DeletedItemDetails: "",
      ISBillable: false,
      IsQCPassReq: false,
      IsAlliasForPrinting: false,
      categoryList: [],
      DeletedContactDetails: "",
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };

    if (history?.location?.state?.id) {
      this.props.getSupplierItemData({
        SupplierID: history?.location?.state?.id,
      });
    }
    this.props.getSupplierMetaData(postData);
    this.props.getSupplier(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.supplier.error !== this.props.supplier.error &&
      this.props.supplier.error
    ) {
      toast.error(this.props.supplier.error);
    }
    if (
      prevProps.supplier.successMsg !== this.props.supplier.successMsg &&
      this.props.supplier.successMsg
    ) {
      toast.success(this.props.supplier.successMsg);
    }
    if (prevProps.supplier.data !== this.props.supplier.data) {
      this.setState({
        response:
          this.props.supplier.data && this.props.supplier.data.length
            ? this.props.supplier.data
            : [],
        random: this.props.supplier.random,
      });
    }
    if (
      prevProps.supplier.supplierMetaData !==
      this.props.supplier.supplierMetaData
    ) {
      let CountryData = [];
      this.props.supplier.supplierMetaData.Countries &&
        this.props.supplier.supplierMetaData.Countries.forEach((Country) => {
          CountryData.push({
            value: Country.IDNumber,
            label: Country.CountryName,
          });
        });

      let CategoryData = [];
      this.props.supplier.supplierMetaData.Categories &&
        this.props.supplier.supplierMetaData.Categories.forEach((item) => {
          CategoryData.push({ value: item.IDNumber, label: item.LookupDesc });
        });
      this.setState({
        countryList:
          this.props.supplier.supplierMetaData &&
          this.props.supplier.supplierMetaData.Countries &&
          this.props.supplier.supplierMetaData.Countries.length
            ? CountryData
            : [],

        categoryList:
          this.props.supplier.supplierMetaData &&
          this.props.supplier.supplierMetaData.Categories &&
          this.props.supplier.supplierMetaData.Categories.length
            ? CategoryData
            : [],
      });
    }
    if (prevProps.state.stateList !== this.props.state.stateList) {
      let stateData = [];
      this.props.state.stateList.forEach((item) => {
        stateData.push({
          value: item.IDNumber,
          label: item.StateName,
          CountryID: item.CountryID,
        });
      });
      this.setState({
        stateList:
          this.props.state.stateList && this.props.state.stateList.length
            ? stateData
            : [],
      });
    }
    if (prevProps.district.districtList !== this.props.district.districtList) {
      let districtData = [];
      this.props.district.districtList.forEach((item) => {
        districtData.push({
          value: item.IDNumber,
          label: item.DistrictName,
          StateID: item.StateID,
        });
      });
      this.setState({
        districtList:
          this.props.district.districtList &&
          this.props.district.districtList.length
            ? districtData
            : [],
      });
    }
    if (prevProps.city.cityList !== this.props.city.cityList) {
      let cityData = [];
      this.props.city.cityList.forEach((item) => {
        cityData.push({
          value: item.IDNumber,
          label: item.CityName,
          DistrictID: item.DistrictID,
        });
      });
      this.setState({
        cityList:
          this.props.city.cityList && this.props.city.cityList.length
            ? cityData
            : [],
      });
    }

    if (prevProps.supplier.itemList !== this.props.supplier.itemList) {
      let itemData = [];
      this.props.supplier.itemList.forEach((item) => {
        itemData.push({ value: item.ItemID, label: item.ItemName });
      });
      this.setState({
        itemList:
          this.props.supplier.itemList && this.props.supplier.itemList.length
            ? itemData
            : [],
      });
    }
    if (
      prevProps.supplier.supplierMetaData.Units !==
      this.props.supplier.supplierMetaData.Units
    ) {
      let unitData = [];
      this.props.supplier.supplierMetaData.Units.forEach((item) => {
        unitData.push({ value: item.IDNumber, label: item.UnitName });
      });
      this.setState({
        unitList:
          this.props.supplier.supplierMetaData.Units &&
          this.props.supplier.supplierMetaData.Units.length
            ? unitData
            : [],
      });
    }

    if (
      prevProps.supplier.data !== this.props.supplier.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.supplier.data &&
        this.props.supplier.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.props.getStateData({ CountryID: filterData?.CountryID });
      this.props.getDistrict({ StateID: filterData?.StateID });
      this.props.getCity({ CityID: filterData?.cityID });
      this.setState({ itemData: filterData });
      this.setState({
        parentIDNumber: filterData?.IDNumber,
        SupplierCode: filterData?.SupplierCode,
        SupplierName: filterData?.SupplierName,
        Cre_Days: filterData?.Cre_Days,
        PANNo: filterData?.PANNo,
        ZipCode: filterData?.ZipCode,
        WorkAddress: filterData?.WorkAddress,
        OPBAL: filterData?.OPBAL,
        GSTNo: filterData?.GSTNo,
        Address: filterData?.Address,
        city: filterData?.CityID,
        district: filterData?.DistrictID,
        state: filterData?.StateID,
        country: filterData?.CountryID,
        category: filterData?.CategoryID,
        // city: {
        //   value: filterData?.CityID,
        //   label: filterData?.CityName,
        // },
        // district: {
        //   value: filterData?.DistrictID,
        //   label: filterData?.DistrictName,
        // },
        // state: {
        //   value: filterData?.StateID,
        //   label: filterData?.StateName,
        // },
        // country: {
        //   value: filterData?.CountryID,
        //   label: filterData?.CountryName,
        // },
        // category: {
        //   value: filterData?.CategoryID,
        //   label: filterData?.CategoryName,
        // },
        BankAcNo: filterData?.BankAcNo,
        BankName: filterData?.BankName,
        BranchName: filterData?.BranchName,
        IFSCCode: filterData?.IFSCCode,
        ContactDetails: filterData?.ContactDetails,
        SupplierItemDetails: this.props.supplier.supplierItemData,
      });
    }
  }

  onChange = (event, name) => {
    let pattern = /^[a-zA-Z ]*$/,
      moNo = /^[0-9]{0,10}$/;

    switch (name) {
      // case "SupplierName":
      //   if (pattern.test(event.target.value)) {
      //     this.setState({ [name]: event.target.value });
      //   }
      //   break;
      case "MobileNo":
        if (moNo.test(event.target.value)) {
          this.setState({ [name]: event.target.value });
        }
        break;
      case "BankName":
        if (pattern.test(event.target.value)) {
          this.setState({ [name]: event.target.value });
        }
        break;
      case "BranchName":
        if (pattern.test(event.target.value)) {
          this.setState({ [name]: event.target.value });
        }
        break;
      // case "ContactPerson":
      //   if (pattern.test(event.target.value)) {
      //     this.setState({ [name]: event.target.value });
      //   }
      // break;
      default:
        this.setState({ [name]: event.target.value });
        break;
    }
  };

  onInputChange = (event, name, id) => {
    //this.setState({ [name]: event.target.value });

    // const {
    //   EditedContactPerson,
    //   EditedEmail,
    //   EditedPhoneNo,
    //   EditedMobileNo,
    // } = this.state;
    const exist = this.state.ContactDetails?.filter((data) => {
      return data.id === id;
    })?.[0];
    const unique = this.state.ContactDetails?.filter((data) => {
      return data.id !== id;
    });
    this.setState({
      ContactDetails: [
        {
          ...exist,
          [name]: event.target.value,
        },
        ...unique,
      ],
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const {
      SupplierCode,
      SupplierName,
      // GroupID,
      Cre_Days,
      // BaseunitID,
      PANNo,
      // TransUnt,
      ZipCode,
      WorkAddress,
      // ISBaseUpperUnit,
      // ISTranUpperUnit,
      itemData,
      category,
      Address,
      city,
      state,
      district,
      country,
      GSTNo,
      BankAcNo,
      BankName,
      BranchName,
      IFSCCode,
      ContactDetails,
      SupplierItemDetails,
      OPBAL,
      DeletedItemDetails,
      DeletedContactDetails,
    } = this.state;

    if (
      SupplierName &&
      category &&
      Address &&
      city &&
      district &&
      state &&
      country &&
      ZipCode
    ) {
      // SupplierItemDetails.map((data) => {
      //   delete data["id"];
      //   data["ItemID"] = data.item.value;
      //   data["UnitID"] = data.unit.value;
      //   data["IsAlliasForPrinting"] = data.IsAlliasForPrinting ? 1 : 0;
      //   data["IsQCPassReq"] = data.IsQCPassReq ? 1 : 0;
      //   data["ISBillable"] = data.ISBillable ? 1 : 0;
      //   data["YearID"] = 1;
      //   delete data["item"];
      //   delete data["unit"];
      //   return null;
      // });
      let postData = {
        IDNumber: itemData?.IDNumber ?? 0,
        SupplierCode,
        SupplierName,
        CategoryID: category,
        Address,
        CityID: city,
        DistrictID: district,
        StateID: state,
        CountryID: country,
        WorkAddress,
        PANNo,
        GSTNo,
        BankAcNo,
        BankName,
        BranchName,
        IFSCCode,
        ContactDetails: ContactDetails,
        SupplierItemDetails,
        CreatedDate: moment(),
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        DeletedContactDetails: DeletedContactDetails,
        Cre_Days,
        OPBAL,
        ZipCode,
        YearID: 1,
        AccountID: itemData?.AccountID ?? 0.0,
        CurrencyIDNumber: itemData?.AccountID ?? 1.0,
        ActGrpIDNumber: itemData?.ActGrpIDNumber ?? 22.0,
        Entrytype: itemData?.Entrytype ?? "S",
        NOPID: itemData?.NOPID ?? 0.0,
        IsTDS: itemData?.IsTDS ?? 0,
        TDSSectionID: itemData?.TDSSectionID ?? 0,
        IsActive: itemData?.IsActive ?? 0,
        TDSSectionName: itemData?.TDSSectionName ?? null,
        AccountOpeningID: itemData?.AccountOpeningID ?? 13,
        DeletedItemDetails: DeletedItemDetails,
      };
      if (history?.location?.state?.id) {
        await this.props.addSupplier({
          ...itemData,
          ...postData,
        });
        await this.resetState();
      } else {
        await this.props.addSupplier(postData);
        await this.resetState();
      }
      await history.push("/Administrator/SupplierMaster");
    }
  };

  resetState = () => {
    this.setState({
      CountryName: "",
      SupplierCode: "",
      SupplierName: "",
      GroupID: "",
      Cre_Days: "",
      BaseunitID: "",
      PANNo: "",
      TransUnt: "",
      ZipCode: "",
      WorkAddress: "",
      ISBaseUpperUnit: false,
      ISTranUpperUnit: false,
      btnFlg: false,
      OPBAL: "",
      GSTNo: "",
      Address: "",
      city: null,
      district: null,
      state: null,
      country: null,
      category: null,
      BankAcNo: "",
      BankName: "",
      BranchName: "",
      IFSCCode: "",
      ContactDetails: [],
      SupplierItemDetails: [],
      ContactPerson: "",
      Email: "",
      PhoneNo: "",
      MobileNo: "",
      id: null,
      item: null,
      AlliasForItem: "",
      AlliasForItemCode: "",
      Remarks: "",
      Rate: "",
      unit: null,
    });
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab)
      this.setState({
        activeTab: tab,
      });
  };

  toggleModal = () =>
    this.setState({
      modal: !this.state.modal,
    });

  toggleItemModal = () =>
    this.setState({
      itemmodal: !this.state.itemmodal,
    });
  render() {
    const {
      ContactPerson,
      Email,
      PhoneNo,
      MobileNo,
      activeTab,
      item,
      IsAlliasForPrinting,
      AlliasForItem,
      AlliasForItemCode,
      Remarks,
      Rate,
      unit,
      IsQCPassReq,
      ISBillable,
      btnFlg,
    } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Supplier Master</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Administrator/SupplierMaster")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="supplier-container">
            <Nav tabs>
              <NavItem className="customNavStyle">
                <NavLink
                  className={classnames(
                    { active: activeTab === "1" },
                    "text-center"
                  )}
                  onClick={() => {
                    this.toggle("1");
                  }}
                  href="#supplierdetail"
                >
                  Supplier Detail
                </NavLink>
              </NavItem>
              <NavItem className="customNavStyle">
                <NavLink
                  className={classnames(
                    { active: activeTab === "2" },
                    "text-center"
                  )}
                  onClick={() => {
                    this.toggle("2");
                  }}
                  href="#addressdetail"
                >
                  Address Detail
                </NavLink>
              </NavItem>
              <NavItem className="customNavStyle">
                <NavLink
                  className={classnames(
                    { active: activeTab === "3" },
                    "text-center"
                  )}
                  onClick={() => {
                    this.toggle("3");
                  }}
                  href="#bankdetail"
                >
                  Bank Detail
                </NavLink>
              </NavItem>
              <NavItem className="customNavStyle">
                <NavLink
                  className={classnames(
                    { active: activeTab === "4" },
                    "text-center"
                  )}
                  onClick={() => {
                    this.toggle("4");
                  }}
                  href="#contactdetail"
                >
                  Contact Detail
                </NavLink>
              </NavItem>
              <NavItem className="customNavStyle">
                <NavLink
                  className={classnames(
                    { active: activeTab === "5" },
                    "text-center"
                  )}
                  onClick={() => {
                    this.toggle("5");
                  }}
                  href="#supplieritemdetail"
                >
                  Supplier Item Detail
                </NavLink>
              </NavItem>
            </Nav>

            <Form>
              <div
                style={{
                  height: "410px",
                  overflowY: "auto",
                }}
              >
                <FormGroup row id="supplierdetail">
                  <Col sm="12">
                    <Badge color="info" pill className="tabTitle badge-border">
                      Supplier Detail
                    </Badge>
                  </Col>

                  <div className="pl-2 pr-2 d-flex w-100">
                    {/* <Col>
                      <Label>Supplier Code</Label>
                      <Input
                      bsSize="sm"
                        type="text"
                        value={
                          this.state.SupplierCode ? this.state.SupplierCode : ""
                        }
                        onChange={(e) => this.onChange(e, "SupplierCode")}
                        name="supCode"
                        placeholder="Supplier Code"
                        className={
                          btnFlg &&
                          (!this.state.SupplierCode ||
                            this.state.SupplierCode === "")
                            ? "invalid-input"
                            : ""
                        }
                      />
                      {btnFlg &&
                        (!this.state.SupplierCode ||
                          this.state.SupplierCode === "") && <ErrorText />}
                    </Col> */}

                    <Col>
                      <Label>Supplier Name</Label>
                      <Input
                        bsSize="sm"
                        type="text"
                        value={
                          this.state.SupplierName ? this.state.SupplierName : ""
                        }
                        onChange={(e) => this.onChange(e, "SupplierName")}
                        name="supName"
                        placeholder="Supplier Name"
                        className={
                          btnFlg &&
                          (!this.state.SupplierName ||
                            this.state.SupplierName === "")
                            ? "invalid-input"
                            : ""
                        }
                      />
                      {btnFlg &&
                        (!this.state.SupplierName ||
                          this.state.SupplierName === "") && <ErrorText />}
                    </Col>

                    {/* <Col
                    className={`${
                      btnFlg && !this.state?.category?.value
                        ? "invalid-input"
                        : ""
                    }`}
                  >
                    <Label>Category</Label>
                    <Select
                      className="React-Select"
                      classNamePrefix="select"
                      onChange={(e) => this.setState({ category: e })}
                      value={this.state.category}
                      name="category"
                      options={this.state.categoryList}
                      placeholder="Category"
                    />
                    {btnFlg && !this.state?.category?.value && <ErrorText />}
                  </Col> */}

                    <Col
                      className={`${
                        btnFlg && !this.state?.category ? "invalid-input" : ""
                      }`}
                    >
                      <Label>Category</Label>
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="categorySelect"
                        name="categorySelect"
                        value={this.state?.category}
                        className="p-0 pl-1"
                        onChange={(e) => {
                          this.setState({ category: e.target.value });
                        }}
                      >
                        <option value="0">Select Category</option>
                        {this.state.categoryList.length > 0 &&
                          this.state.categoryList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                      {btnFlg && !this.state?.category && <ErrorText />}
                    </Col>

                    <Col>
                      <Label>Credit Days</Label>
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state.Cre_Days ? this.state.Cre_Days : ""}
                        onChange={(e) => this.onChange(e, "Cre_Days")}
                        name="creditDays"
                        placeholder="Credit Days"
                      />
                    </Col>
                  </div>
                </FormGroup>
                <FormGroup row className="pl-2 pr-2">
                  <Col>
                    <Label>Opening Balance</Label>
                    <Input
                      bsSize="sm"
                      type="number"
                      value={this.state.OPBAL ? this.state.OPBAL : ""}
                      onChange={(e) => this.onChange(e, "OPBAL")}
                      name="openingBalance"
                      placeholder="Opening Balance"
                    />
                  </Col>

                  <Col>
                    <Label>GSTNO</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.GSTNo ? this.state.GSTNo : ""}
                      onChange={(e) => this.onChange(e, "GSTNo")}
                      name="gstNo"
                      placeholder="GSTNO"
                    />
                  </Col>

                  <Col>
                    <Label>PANNo</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.PANNo ? this.state.PANNo : ""}
                      onChange={(e) => this.onChange(e, "PANNo")}
                      name="panNo"
                      placeholder="PANNo"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row id="addressdetail">
                  <Col sm={12}>
                    <Badge color="info" pill className="tabTitle badge-border">
                      Address Detail
                    </Badge>
                  </Col>
                  <div className="pl-2 pr-2 d-flex w-100">
                    <Col>
                      <Label>Address</Label>
                      <Input
                        bsSize="sm"
                        type="text"
                        value={this.state.Address ? this.state.Address : ""}
                        onChange={(e) => this.onChange(e, "Address")}
                        name="address"
                        placeholder="Address"
                        className={
                          btnFlg &&
                          (!this.state.Address || this.state.Address === "")
                            ? "invalid-input"
                            : ""
                        }
                      />
                      {btnFlg &&
                        (!this.state.Address || this.state.Address === "") && (
                          <ErrorText />
                        )}
                    </Col>

                    <Col>
                      <Label>Country</Label>
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="countrySelect"
                        name="countrySelect"
                        value={this.state?.country}
                        className={`p-0 pl-1 ${
                          btnFlg && !this.state?.country ? "invalid-input" : ""
                        }`}
                        onChange={(e) => {
                          this.props.getStateData({
                            CountryID: parseInt(e.target.value),
                          });
                          this.setState({
                            country: parseInt(e.target.value),
                            stateList: [],
                            districtList: [],
                            cityList: [],
                          });
                        }}
                      >
                        <option value="0">Country</option>
                        {this.state.countryList?.length > 0 &&
                          this.state.countryList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                      {btnFlg && !this.state?.country && <ErrorText />}
                    </Col>
                    <Col>
                      <Label>State</Label>
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="stateSelect"
                        name="stateSelect"
                        value={this.state?.state}
                        className={`p-0 pl-1 ${
                          btnFlg && !this.state?.state ? "invalid-input" : ""
                        }`}
                        onChange={(e) => {
                          this.props.getDistrict({
                            StateID: parseInt(e.target.value),
                          });
                          this.setState({
                            state: parseInt(e.target.value),
                            districtList: [],
                            cityList: [],
                          });
                        }}
                      >
                        <option value="0">State</option>
                        {this.state.stateList &&
                          this.state.stateList?.length > 0 &&
                          this.state?.stateList.map((d, i) => {
                            return (
                              <option value={d.value} key={d.value}>
                                {d.label}
                              </option>
                            );
                          })}
                      </CustomInput>
                      {btnFlg && !this.state?.state && <ErrorText />}
                    </Col>
                    <Col>
                      <Label>District</Label>
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="dsistrictSelect"
                        name="districtSelect"
                        value={this.state?.district}
                        className={`p-0 pl-1 ${
                          btnFlg && !this.state?.district ? "invalid-input" : ""
                        }`}
                        onChange={(e) => {
                          this.props.getCity({
                            DistrictID: parseInt(e.target.value),
                          });
                          this.setState({
                            district: parseInt(e.target.value),
                            cityList: [],
                          });
                        }}
                      >
                        <option value="0">District</option>
                        {this.state.districtList &&
                          this.state.districtList?.length > 0 &&
                          this.state.districtList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                      {btnFlg && !this.state?.district && <ErrorText />}
                    </Col>
                    <Col>
                      <Label>City</Label>
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="citySelect"
                        name="citySelect"
                        value={this.state?.city}
                        className={`p-0 pl-1 ${
                          btnFlg && !this.state?.city ? "invalid-input" : ""
                        }`}
                        onChange={(e) => {
                          this.setState({
                            city: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">City</option>
                        {this.state.cityList &&
                          this.state.cityList?.length > 0 &&
                          this.state.cityList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                      {btnFlg && !this.state?.city && <ErrorText />}
                    </Col>

                    <Col>
                      <Label>Zipcode</Label>
                      <Input
                        bsSize="sm"
                        type="text"
                        value={this.state.ZipCode ? this.state.ZipCode : ""}
                        onChange={(e) => this.onChange(e, "ZipCode")}
                        name="zipcode"
                        placeholder="Zipcode"
                        className={
                          btnFlg &&
                          (!this.state.ZipCode || this.state.ZipCode === "")
                            ? "invalid-input"
                            : ""
                        }
                      />
                      {btnFlg &&
                        (!this.state.ZipCode || this.state.ZipCode === "") && (
                          <ErrorText />
                        )}
                    </Col>
                  </div>
                </FormGroup>
                <FormGroup row className="pl-2 pr-2">
                  <Col sm="2">
                    <Label>Work Address</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={
                        this.state.WorkAddress ? this.state.WorkAddress : ""
                      }
                      onChange={(e) => this.onChange(e, "WorkAddress")}
                      name="workAddress"
                      placeholder="Work Address"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row id="bankdetail">
                  <Col sm="12">
                    <Badge color="info" pill className="tabTitle badge-border">
                      Bank Detail
                    </Badge>
                  </Col>
                  <div className="pl-2 pr-2 d-flex w-100">
                    <Col>
                      <Label>Bank Account No</Label>
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state.BankAcNo ? this.state.BankAcNo : ""}
                        onChange={(e) => this.onChange(e, "BankAcNo")}
                        name="bankAcNo"
                        placeholder="Bank Account No"
                      />
                    </Col>

                    <Col>
                      <Label>Bank Name</Label>
                      <Input
                        bsSize="sm"
                        type="text"
                        value={this.state.BankName ? this.state.BankName : ""}
                        onChange={(e) => this.onChange(e, "BankName")}
                        name="bankName"
                        placeholder="Bank Name"
                      />
                    </Col>

                    <Col>
                      <Label>Branch Name</Label>
                      <Input
                        bsSize="sm"
                        type="text"
                        value={
                          this.state.BranchName ? this.state.BranchName : ""
                        }
                        onChange={(e) => this.onChange(e, "BranchName")}
                        name="branchName"
                        placeholder="Branch Name"
                      />
                    </Col>

                    <Col>
                      <Label>IFSC Code</Label>
                      <Input
                        bsSize="sm"
                        type="text"
                        value={this.state.IFSCCode ? this.state.IFSCCode : ""}
                        onChange={(e) => this.onChange(e, "IFSCCode")}
                        name="ifscCode"
                        placeholder="IFSC Code"
                      />
                    </Col>
                  </div>
                </FormGroup>

                {/* contactDetails ::start */}
                <FormGroup row id="contactdetail">
                  <Col sm="12">
                    <Badge color="info" pill className="tabTitle badge-border">
                      Contact Detail
                    </Badge>
                  </Col>
                  <Col sm="12">
                    {this.state?.ContactDetails?.length > 0 &&
                      this.state?.ContactDetails?.map((data, i) => (
                        <FormGroup row key={"supplierContacts" + i}>
                          <Col sm="1" className="mt-2 text-center">
                            <Button
                              color="danger"
                              className="cursor-pointer action-btn"
                              size="sm"
                              onClick={() => {
                                let objectIndex = this.state.ContactDetails.findIndex(
                                  (d) => d.IDNumber === data.IDNumber
                                );
                                this.state.ContactDetails.splice(
                                  objectIndex,
                                  1
                                );
                                this.setState({
                                  DeletedContactDetails:
                                    this.state.DeletedContactDetails +
                                    "," +
                                    data.IDNumber,
                                });
                              }}
                            >
                              <Trash size={16} />
                            </Button>
                          </Col>

                          <Col>
                            <Label>Contact Person</Label>
                            <Input
                              bsSize="sm"
                              type="text"
                              value={
                                data?.EditedContactPerson ?? data.ContactPerson
                              }
                              onChange={(e) =>
                                this.onInputChange(
                                  e,
                                  "EditedContactPerson",
                                  data?.id
                                )
                              }
                              name="contactPerson"
                              placeholder="Contact Person"
                              disabled
                            />
                          </Col>

                          <Col>
                            <Label>Email</Label>
                            <Input
                              bsSize="sm"
                              type="email"
                              value={data?.EditedEmail ?? data.Email}
                              onChange={(e) =>
                                this.onInputChange(e, "EditedEmail", data?.id)
                              }
                              name="email"
                              placeholder="Email"
                              disabled
                            />
                          </Col>

                          <Col>
                            <Label>PhoneNo</Label>
                            <Input
                              bsSize="sm"
                              type="text"
                              value={data?.EditedPhoneNo ?? data.PhoneNo}
                              onChange={(e) =>
                                this.onInputChange(e, "EditedPhoneNo", data?.id)
                              }
                              name="phoneNo"
                              placeholder="PhoneNo"
                              disabled
                            />
                          </Col>

                          <Col>
                            <Label>Mobile No</Label>
                            <Input
                              bsSize="sm"
                              type="text"
                              value={data?.EditedMobileNo ?? data.MobileNo}
                              onChange={(e) =>
                                this.onInputChange(
                                  e,
                                  "EditedMobileNo",
                                  data?.id
                                )
                              }
                              name="moNo"
                              placeholder="Mobile No"
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      ))}
                    {this.state.ContactDetails?.length > 0 && (
                      <div className="border"></div>
                    )}
                  </Col>

                  <Col sm="1" className="mt-2 text-center">
                    <Button
                      color="primary"
                      className="cursor-pointer action-btn"
                      size="sm"
                      onClick={() => {
                        if (
                          this.state.ContactDetails !== null &&
                          this.state.ContactDetails.length > 0
                        ) {
                          this.setState({
                            ContactDetails: [
                              ...this.state.ContactDetails,
                              {
                                id: this.state.ContactDetails.length + 1,
                                ContactPerson,
                                Email,
                                PhoneNo,
                                MobileNo,
                              },
                            ],
                          });
                        } else {
                          this.setState({
                            ContactDetails: [
                              {
                                id: 1,
                                ContactPerson,
                                Email,
                                PhoneNo,
                                MobileNo,
                              },
                            ],
                          });
                        }

                        this.setState({
                          ContactPerson: null,
                          Email: null,
                          PhoneNo: null,
                          MobileNo: null,
                          id: null,
                        });
                      }}
                      disabled={!ContactPerson || !Email || !PhoneNo}
                    >
                      <Plus size={16} />
                    </Button>
                  </Col>

                  <Col>
                    <Label>Contact Person</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.ContactPerson ?? ""}
                      onChange={(e) => this.onChange(e, "ContactPerson")}
                      name="contactPerson"
                      placeholder="Contact Person"
                    />
                  </Col>

                  <Col>
                    <Label>Email</Label>
                    <Input
                      bsSize="sm"
                      type="email"
                      value={this.state.Email ?? ""}
                      onChange={(e) => this.onChange(e, "Email")}
                      name="email"
                      placeholder="Email"
                    />
                  </Col>

                  <Col>
                    <Label>PhoneNo</Label>
                    <Input
                      bsSize="sm"
                      type="number"
                      value={this.state.PhoneNo ?? ""}
                      onChange={(e) => this.onChange(e, "PhoneNo")}
                      name="phoneNo"
                      placeholder="PhoneNo"
                    />
                  </Col>

                  <Col>
                    <Label>Mobile No</Label>
                    <Input
                      bsSize="sm"
                      type="number"
                      value={this.state.MobileNo ?? ""}
                      onChange={(e) => this.onChange(e, "MobileNo")}
                      name="moNo"
                      placeholder="Mobile No"
                    />
                  </Col>
                </FormGroup>
                {/* contactDetails ::end */}

                {/* supplieritemdetail ::start */}
                <FormGroup row id="supplieritemdetail">
                  <Col sm="12">
                    <Badge color="info" pill className="tabTitle badge-border">
                      Supplier Item Detail
                    </Badge>
                  </Col>

                  {/* <Col sm="12"> */}
                  {this.state.SupplierItemDetails?.length > 0 &&
                    this.state.SupplierItemDetails?.map((data, i) => {
                      return (
                        <div
                          className="d-flex w-100"
                          key={"supplierItemDetails" + i}
                        >
                          <Col sm="1" className="mt-2 text-center">
                            <Button
                              color="danger"
                              className="cursor-pointer action-btn"
                              size="sm"
                              onClick={() => {
                                let objectIndex = this.state.SupplierItemDetails.findIndex(
                                  (d) => d.IDNumber === data.IDNumber
                                );
                                this.state.SupplierItemDetails.splice(
                                  objectIndex,
                                  1
                                );

                                // const filter = this.state.SupplierItemDetails.filter(
                                //   (item) => {
                                //     return item.id !== data.id;
                                //   }
                                // );
                                this.setState({
                                  DeletedItemDetails:
                                    this.state.DeletedItemDetails +
                                    "," +
                                    data.IDNumber,
                                  // SupplierItemDetails: filter,
                                  item: 0,
                                  IsAlliasForPrinting: null,
                                  AlliasForItem: null,
                                  AlliasForItemCode: null,
                                  Remarks: null,
                                  Rate: null,
                                  unit: null,
                                  IsQCPassReq: null,
                                  ISBillable: null,
                                  id: null,
                                });
                              }}
                            >
                              <Trash size={16} />
                            </Button>
                          </Col>

                          <Col sm="2">
                            <Label>Item</Label>
                            {/* <Input
                      bsSize="sm"
                                  type="text"
                                  value={
                                    data.ItemName
                                      ? data.ItemName
                                      : data.item.label
                                  }
                                  onChange={(e) =>
                                    this.onChange(e, "AlliasForItem")
                                  }
                                  name="ItemName"
                                  placeholder="Allias For Item"
                                  disabled
                                /> */}
                            <CustomInput
                              bsSize="sm"
                              type="select"
                              id="itemSelect"
                              name="itemSelect"
                              value={data?.ItemID}
                              className="p-0 pl-1"
                              onChange={(e) => {
                                this.setState({
                                  item: parseInt(e.target.value),
                                });
                              }}
                              disabled
                            >
                              <option value="0">Item</option>
                              {this.state.itemList?.length > 0 &&
                                this.state.itemList.map((d, i) => (
                                  <option value={d.value} key={d.value}>
                                    {d.label}
                                  </option>
                                ))}
                            </CustomInput>
                          </Col>

                          <Col sm="2">
                            <Label>Allias For Item</Label>
                            <Input
                              bsSize="sm"
                              type="text"
                              value={data.AlliasForItem}
                              onChange={(e) =>
                                this.onChange(e, "AlliasForItem")
                              }
                              name="name"
                              placeholder="Allias For Item"
                              disabled
                            />
                          </Col>

                          <Col sm="2">
                            <Label>Allias For Item Code</Label>
                            <Input
                              bsSize="sm"
                              type="text"
                              value={data.AlliasForItemCode}
                              onChange={(e) =>
                                this.onChange(e, "AlliasForItemCode")
                              }
                              name="name"
                              placeholder="Allias For Item Code"
                              disabled
                            />
                          </Col>

                          <Col sm="2">
                            <Label>Unit</Label>
                            {/* <Input
                      bsSize="sm"
                                  type="text"
                                  value={
                                    data.UnitName
                                      ? data.UnitName
                                      : data.unit.label
                                  }
                                  onChange={(e) =>
                                    this.onChange(e, "AlliasForItem")
                                  }
                                  name="name"
                                  placeholder="Allias For Item"
                                  disabled
                                /> */}
                            <CustomInput
                              bsSize="sm"
                              type="select"
                              id="unitSelect"
                              name="unitSelect"
                              value={data?.UnitID}
                              className="p-0 pl-1"
                              onChange={(e) => {
                                this.setState({
                                  unit: parseInt(e.target.value),
                                });
                              }}
                              disabled
                            >
                              <option value="0">Unit</option>
                              {this.state.unitList?.length > 0 &&
                                this.state.unitList.map((d, i) => (
                                  <option value={d.value} key={d.value}>
                                    {d.label}
                                  </option>
                                ))}
                            </CustomInput>
                          </Col>

                          <Col sm="2">
                            <Label>Rate</Label>
                            <Input
                              bsSize="sm"
                              type="number"
                              value={data.Rate}
                              onChange={(e) => this.onChange(e, "Rate")}
                              name="name"
                              placeholder="Rate"
                              disabled
                            />
                          </Col>

                          {/* </FormGroup>
                      <FormGroup row> */}

                          <Col sm="2">
                            <Label>Remarks</Label>
                            <Input
                              bsSize="sm"
                              type="text"
                              value={data.Remarks}
                              onChange={(e) => this.onChange(e, "Remarks")}
                              name="name"
                              placeholder="Remarks"
                              disabled
                            />
                          </Col>

                          <Col sm="1">
                            <Label
                              className="d-block"
                              style={{ width: "max-content" }}
                            >
                              Is Allias For Printing
                            </Label>
                            <FormGroup row>
                              <FormGroup check inline>
                                <Input
                                  bsSize="sm"
                                  type="radio"
                                  name={"isAliasForPrintingyes" + i}
                                  onChange={(e) =>
                                    this.setState({
                                      IsAlliasForPrinting: true,
                                    })
                                  }
                                  checked={
                                    data.IsAlliasForPrinting === 1
                                      ? true
                                      : false
                                  }
                                  disabled
                                />
                                <Label className="mb-0">Yes</Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Input
                                  bsSize="sm"
                                  type="radio"
                                  name={"isAliasForPrintingno" + i}
                                  onChange={(e) =>
                                    this.setState({
                                      IsAlliasForPrinting: false,
                                    })
                                  }
                                  checked={
                                    data.IsAlliasForPrinting === 0
                                      ? true
                                      : false
                                  }
                                  disabled
                                />
                                <Label className="mb-0">No</Label>
                              </FormGroup>
                            </FormGroup>
                          </Col>

                          <Col sm="1">
                            <Label className="d-block">Is QC Pass Req</Label>
                            <FormGroup row>
                              <FormGroup check inline>
                                <Input
                                  bsSize="sm"
                                  type="radio"
                                  name={"isQCPassReqYes" + i}
                                  onChange={(e) =>
                                    this.setState({
                                      IsQCPassReq: true,
                                    })
                                  }
                                  checked={
                                    data.IsQCPassReq === 1 ? true : false
                                  }
                                  disabled
                                />
                                <Label className="mb-0">Yes</Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Input
                                  bsSize="sm"
                                  type="radio"
                                  name={"isQCPassReqNo" + i}
                                  onChange={(e) =>
                                    this.setState({
                                      IsQCPassReq: false,
                                    })
                                  }
                                  checked={
                                    data.IsQCPassReq === 0 ? true : false
                                  }
                                  disabled
                                />
                                <Label className="mb-0"> No</Label>
                              </FormGroup>
                            </FormGroup>
                          </Col>

                          <Col sm="1">
                            <Label>IS Billable</Label>
                            <FormGroup row>
                              <FormGroup check inline>
                                <Input
                                  bsSize="sm"
                                  type="radio"
                                  name={"isBillableYes" + i}
                                  onChange={(e) =>
                                    this.setState({
                                      ISBillable: true,
                                    })
                                  }
                                  checked={data.ISBillable === 1 ? true : false}
                                  disabled
                                />
                                <Label className="mb-0"> Yes</Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Input
                                  bsSize="sm"
                                  type="radio"
                                  name={"isBillableNo" + i}
                                  onChange={(e) =>
                                    this.setState({
                                      ISBillable: false,
                                    })
                                  }
                                  checked={data.ISBillable === 0 ? true : false}
                                  disabled
                                />
                                <Label className="mb-0">No</Label>
                              </FormGroup>
                            </FormGroup>
                          </Col>
                        </div>
                      );
                    })}
                  {/* </Col> */}

                  {/* <Col sm="12"> */}
                  <div className="d-flex w-100">
                    <Col sm="1" className="mt-2 text-center">
                      <Button
                        color="primary"
                        className="cursor-pointer action-btn"
                        size="sm"
                        onClick={() => {
                          const exist = this.state.SupplierItemDetails?.filter(
                            (data) => {
                              return data.IDNumber === this.state.id;
                            }
                          )?.[0];
                          if (exist) {
                            let objectIndex = this.state.SupplierItemDetails.findIndex(
                              (d) => d.IDNumber === this.state.id
                            );
                            let tmpSupplierDetails = [
                              ...this.state.SupplierItemDetails,
                            ];

                            tmpSupplierDetails[objectIndex] = {
                              ...tmpSupplierDetails[objectIndex],
                              item,
                              ItemID: this.state.item,
                              ItemName: this.state.item.label,
                              IsAlliasForPrinting,
                              AlliasForItem,
                              AlliasForItemCode,
                              Remarks,
                              Rate,
                              UnitID: this.state.unit,
                              UnitName: this.state.unit.label,
                              IsQCPassReq,
                              ISBillable,
                            };
                            this.setState({
                              SupplierItemDetails: tmpSupplierDetails,
                            });
                          } else {
                            if (
                              this.state.SupplierItemDetails !== null &&
                              this.state.SupplierItemDetails.length > 0
                            ) {
                              this.setState({
                                SupplierItemDetails: [
                                  ...this.state.SupplierItemDetails,
                                  {
                                    IDNumber: 0,
                                    item,
                                    ItemID: this.state.item,
                                    IsAlliasForPrinting: this.state
                                      .IsAlliasForPrinting
                                      ? 1
                                      : 0,
                                    AlliasForItem,
                                    AlliasForItemCode,
                                    Remarks,
                                    Rate,
                                    unit,
                                    UnitID: this.state.unit,
                                    IsQCPassReq: this.state.IsQCPassReq ? 1 : 0,
                                    ISBillable: this.state.ISBillable ? 1 : 0,
                                    YearID: 1,
                                    SupplierID: this.state.parentIDNumber,
                                  },
                                ],
                              });
                            } else {
                              this.setState({
                                SupplierItemDetails: [
                                  {
                                    IDNumber: 0,
                                    item,
                                    ItemID: this.state.item,
                                    IsAlliasForPrinting: this.state
                                      .IsAlliasForPrinting
                                      ? 1
                                      : 0,
                                    AlliasForItem,
                                    AlliasForItemCode,
                                    Remarks,
                                    Rate,
                                    unit,
                                    UnitID: this.state.unit,
                                    IsQCPassReq: this.state.IsQCPassReq ? 1 : 0,
                                    ISBillable: this.state.ISBillable ? 1 : 0,
                                    YearID: 1,
                                    SupplierID: this.state.parentIDNumber,
                                  },
                                ],
                              });
                            }
                          }

                          // this.toggleItemModal();
                          this.setState({
                            item: {},
                            IsAlliasForPrinting: false,
                            AlliasForItem: "",
                            AlliasForItemCode: "",
                            Remarks: "",
                            Rate: "",
                            unit: {},
                            IsQCPassReq: false,
                            ISBillable: false,
                          });
                        }}
                        disabled={
                          !item ||
                          // !AlliasForItem ||
                          // !AlliasForItemCode ||
                          // !Remarks ||
                          !Rate ||
                          !unit
                        }
                      >
                        <Plus size={16} />
                      </Button>
                    </Col>

                    <Col sm="2">
                      <Label>Item</Label>
                      {/* <Select
                        className="React-Select"
                        classNamePrefix="select"
                        onChange={(e) => this.setState({ item: e })}
                        value={this.state.item}
                        name="item"
                        options={this.state.itemList}
                        placeholder="Select Item"
                      /> */}
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="itemSelect"
                        name="itemSelect"
                        value={this.state?.item ? this.state?.item : 0}
                        className="p-0 pl-1"
                        onChange={(e) => {
                          this.setState({
                            item: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Item</option>
                        {this.state.itemList?.length > 0 &&
                          this.state.itemList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                    </Col>

                    <Col sm="2">
                      <Label>Allias For Item</Label>
                      <Input
                        bsSize="sm"
                        type="text"
                        value={
                          this.state.AlliasForItem
                            ? this.state.AlliasForItem
                            : ""
                        }
                        onChange={(e) => this.onChange(e, "AlliasForItem")}
                        name="aliasForItem"
                        placeholder="Allias For Item"
                      />
                    </Col>

                    <Col sm="2">
                      <Label>Allias For Item Code</Label>
                      <Input
                        bsSize="sm"
                        type="text"
                        value={this.state.AlliasForItemCode}
                        onChange={(e) => this.onChange(e, "AlliasForItemCode")}
                        name="aliasForItemCode"
                        placeholder="Allias For Item Code"
                      />
                    </Col>

                    <Col sm="2">
                      <Label>Unit</Label>
                      {/* <Select
                        className="React-Select"
                        classNamePrefix="select"
                        onChange={(e) => this.setState({ unit: e })}
                        value={this.state.unit}
                        name="unit"
                        options={this.state.unitList}
                        placeholder="Select Unit"
                      /> */}
                      <CustomInput
                        bsSize="sm"
                        type="select"
                        id="unitSelect"
                        name="unitSelect"
                        value={this.state?.unit}
                        className="p-0 pl-1"
                        onChange={(e) => {
                          this.setState({
                            unit: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="0">Unit</option>
                        {this.state.unitList?.length > 0 &&
                          this.state.unitList.map((d, i) => (
                            <option value={d.value} key={d.value}>
                              {d.label}
                            </option>
                          ))}
                      </CustomInput>
                    </Col>

                    <Col sm="2">
                      <Label>Rate</Label>
                      <Input
                        bsSize="sm"
                        type="number"
                        value={this.state.Rate}
                        onChange={(e) => this.onChange(e, "Rate")}
                        name="rate"
                        placeholder="Rate"
                      />
                    </Col>
                    {/* </FormGroup>
                <FormGroup row> */}
                    <Col sm="2">
                      <Label>Remarks</Label>
                      <Input
                        bsSize="sm"
                        type="text"
                        value={this.state.Remarks}
                        onChange={(e) => this.onChange(e, "Remarks")}
                        name="remarks"
                        placeholder="Remarks"
                      />
                    </Col>

                    <Col sm="1">
                      <Label
                        className="d-block"
                        style={{ width: "max-content" }}
                      >
                        Is Allias For Printing
                      </Label>
                      <FormGroup row>
                        <FormGroup check inline>
                          <Input
                            bsSize="sm"
                            type="radio"
                            name="isAliasForPrinting"
                            onChange={(e) =>
                              this.setState({
                                IsAlliasForPrinting: true,
                              })
                            }
                            checked={this.state.IsAlliasForPrinting}
                          />
                          <Label className="mb-0">Yes</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            bsSize="sm"
                            type="radio"
                            name="isAliasForPrinting"
                            onChange={(e) =>
                              this.setState({
                                IsAlliasForPrinting: false,
                              })
                            }
                            checked={!this.state.IsAlliasForPrinting}
                          />
                          <Label className="mb-0">No</Label>
                        </FormGroup>
                      </FormGroup>
                    </Col>

                    <Col sm="1">
                      <Label className="d-block">Is QC Pass Req</Label>
                      <FormGroup row>
                        <FormGroup check inline>
                          <Input
                            bsSize="sm"
                            type="radio"
                            name="isQCPassReq"
                            onChange={(e) =>
                              this.setState({
                                IsQCPassReq: true,
                              })
                            }
                            checked={this.state.IsQCPassReq}
                          />
                          <Label className="mb-0">Yes</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            bsSize="sm"
                            type="radio"
                            name="isQCPassReq"
                            onChange={(e) =>
                              this.setState({
                                IsQCPassReq: false,
                              })
                            }
                            checked={!this.state.IsQCPassReq}
                          />
                          <Label className="mb-0"> No</Label>
                        </FormGroup>
                      </FormGroup>
                    </Col>

                    <Col sm="1">
                      <Label>IS Billable</Label>
                      <FormGroup row>
                        <FormGroup check inline>
                          <Input
                            bsSize="sm"
                            type="radio"
                            name="isBillable"
                            onChange={(e) =>
                              this.setState({
                                ISBillable: true,
                              })
                            }
                            checked={this.state.ISBillable}
                          />
                          <Label className="mb-0"> Yes</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            bsSize="sm"
                            type="radio"
                            name="isBillable"
                            onChange={(e) =>
                              this.setState({
                                ISBillable: false,
                              })
                            }
                            checked={!this.state.ISBillable}
                          />
                          <Label className="mb-0">No</Label>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                  </div>
                  {/* </Col> */}
                </FormGroup>

                {/* supplieritemdetail ::end */}
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
    state: state.state,
    district: state.district,
    city: state.city,
    supplier: state.supplier,
  };
};

export default connect(mapStateToProps, {
  getStateData,
  getDistrict,
  getCity,
  addSupplier,
  getSupplierMetaData,
  getSupplier,
  getSupplierItemData,
})(SupplierNewView);
