import React from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "../../style.css";
import {
  getPurchaseIndent,
  getPurchaseIndentDropDown,
  addPurchaseIndent,
} from "../../../../redux/actions/Purchase/PurchaseIndent";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
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

class PurchaseIndentNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      projectList: [],
      locationList: [],
      itemList: [],
      unitList: [],
      // ItemID: 0,
      // Qty: 0,
      // UnitID: 0,
      ItemDetails: [],
      DeletedItemDetails: "",
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getPurchaseIndent(postData);
    this.props.getPurchaseIndentDropDown(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.purchaseIndent.error !== this.props.purchaseIndent.error &&this.props.purchaseIndent.error
    ) {
      toast.error(this.props.purchaseIndent.error);
    }
    if (
      prevProps.purchaseIndent.successMsg !==this.props.purchaseIndent.successMsg &&
      this.props.purchaseIndent.successMsg
    ) {
      toast.success(this.props.purchaseIndent.successMsg);
    }
    if (prevProps.purchaseIndent.data !== this.props.purchaseIndent.data) {
      this.setState({
        response:
          this.props.purchaseIndent.data &&
          this.props.purchaseIndent.data.length
            ? this.props.purchaseIndent.data
            : [],
        random: this.props.purchaseIndent.random,
      });
    }
    if (
      prevProps.purchaseIndent.projectList !==
      this.props.purchaseIndent.projectList
    ) {
      let projectData = [];
      this.props.purchaseIndent.projectList.forEach((item) => {
        projectData.push({ value: item.IDNumber, label: item.ProjectName });
      });

      this.setState({
        projectList:
          this.props.purchaseIndent.projectList &&
          this.props.purchaseIndent.projectList.length
            ? projectData
            : [],
      });
    }
    if (
      prevProps.purchaseIndent.locationList !==
      this.props.purchaseIndent.locationList
    ) {
      let locationData = [];
      this.props.purchaseIndent.locationList.forEach((item) => {
        locationData.push({ value: item.IDNumber, label: item.LocationName });
      });

      this.setState({
        locationList:
          this.props.purchaseIndent.locationList &&
          this.props.purchaseIndent.locationList.length
            ? locationData
            : [],
      });
    }
    if (
      prevProps.purchaseIndent.itemList !== this.props.purchaseIndent.itemList
    ) {
      let itemData = [];
      this.props.purchaseIndent.itemList.forEach((item) => {
        itemData.push({ value: item.ItemID, label: item.ItemName });
      });

      this.setState({
        itemList:
          this.props.purchaseIndent.itemList &&
          this.props.purchaseIndent.itemList.length
            ? itemData
            : [],
      });
    }
    if (
      prevProps.purchaseIndent.unitList !== this.props.purchaseIndent.unitList
    ) {
      let unitData = [];
      this.props.purchaseIndent.unitList.forEach((item) => {
        unitData.push({ value: item.IDNumber, label: item.UnitName });
      });

      this.setState({
        unitList:
          this.props.purchaseIndent.unitList &&
          this.props.purchaseIndent.unitList.length
            ? unitData
            : [],
      });
    }

    if (
      prevProps.purchaseIndent.data !== this.props.purchaseIndent.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.purchaseIndent.data &&
        this.props.purchaseIndent.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        parentIDNumber: filterData?.IDNumber,
        IndentNo: filterData?.IndentNo,
        ProjectID: filterData?.ProjectID,
        LocationID: filterData?.LocationID,
        IndentDate: filterData?.IndentDate,
        IndentTime: filterData?.IndentTime,
        ItemDetails: filterData?.ItemDetails,
        SpecInstruction: filterData?.SpecInstruction,
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
      ProjectID,
      LocationID,
      IndentDate,
      IndentTime,
      SpecInstruction,
      ItemDetails,
      DeletedItemDetails,
      IndentNo,
    } = this.state;
    if (
      ProjectID &&
      LocationID &&
      IndentDate &&
      IndentTime &&
      ItemDetails.length > 0
    ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        IndentNo: IndentNo ? IndentNo : "",
        ProjectID,
        LocationID,
        IndentDate:
          typeof IndentDate === "object"
            ? moment(IndentDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : IndentDate,
        IndentTime:
          typeof IndentTime === "object"
            ? moment(IndentTime?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : IndentTime,
        SpecInstruction,
        ItemDetails,
        DeletedItemDetails,
        IndPrepBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        Year_ID: parseInt(localStorage.getItem("yearId")),
        Status: 1,
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        CreatedDate: moment(),
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        updatedDate: moment(),
      };
      if (history?.location?.state?.id) {
        await this.props.addPurchaseIndent({
          ...postData,
        });
      } else {
        await this.props.addPurchaseIndent(postData);
      }
      await this.resetState();
      await history.push("/Purchase/PurchaseIndent");
    }
  };

  resetState = () => {
    this.setState({
      ProjectID: 0,
      LocationID: 0,
      IndentDate: null,
      IndentTime: null,
      ItemID: null,
      ItemDetails: [],
    });
  };

  toggleModal = () =>
    this.setState({
      modal: !this.state.modal,
    });

  render() {
    const { btnFlg } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Purchase Indent</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Purchase/PurchaseIndent")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
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
                      btnFlg && !this.state?.ProjectID ? "invalid-input" : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        ProjectID: parseInt(e.target.value),
                      });
                    }}
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
                  <Label>Location</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="LocationIDSelect"
                    name="LocationIDSelect"
                    value={this.state?.LocationID}
                    className={`p-0 pl-1
                      ${
                        btnFlg && !this.state?.LocationID ? "invalid-input" : ""
                      }`}
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
                  {btnFlg && !this.state?.LocationID && <ErrorText />}
                </Col>
                <Col>
                  <Label>Indent Date</Label>
                  <Flatpickr
                    value={this.state.IndentDate}
                    onChange={(date) => {
                      this.setState({ IndentDate: date });
                    }}
                    placeholder="Indent Date-Time"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.IndentDate?.[0]
                        ? "invalid-input"
                        : ""
                    }`}
                  />
                  {btnFlg && !this.state?.IndentDate?.[0] && <ErrorText />}
                </Col>
                <Col>
                  <Label>Indent Time</Label>
                  <Flatpickr
                    data-enable-time
                    value={this.state.IndentTime}
                    onChange={(date) => {
                      this.setState({ IndentTime: date });
                    }}
                    placeholder="Indent Time"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.IndentTime?.[0]
                        ? "invalid-input"
                        : ""
                    }`}
                  />
                  {btnFlg && !this.state?.IndentTime?.[0] && <ErrorText />}
                </Col>
                <Col>
                  <Label>Spec Instruction</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.SpecInstruction
                        ? this.state.SpecInstruction
                        : ""
                    }
                    onChange={(e) => this.onChange(e, "SpecInstruction")}
                    name="SpecInstruction"
                    placeholder="SpecInstruction"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm="12">
                  <CardTitle>Item Details</CardTitle>
                </Col>

                <Col sm="12" className="text-center">
                  {btnFlg && !this.state?.ItemDetails.length && (
                    <ErrorText text="There must be at least one item detail" />
                  )}
                </Col>
                <Col sm="12">
                  {this.state.ItemDetails?.length > 0 &&
                    this.state.ItemDetails?.map((data, i) => {
                      return (
                        <FormGroup row key={data.IDNumber}>
                          <Col sm="1" className="mt-2 text-center">
                            <Button
                              size="sm"
                              color="danger"
                              className="cursor-pointer action-btn"
                              onClick={() => {
                                let objectIndex = this.state.ItemDetails.findIndex(
                                  (d) => d.IDNumber === data.IDNumber
                                );
                                this.state.ItemDetails.splice(objectIndex, 1);

                                this.setState({
                                  DeletedItemDetails:
                                    this.state.DeletedItemDetails +
                                    "," +
                                    data.IDNumber,
                                  InsuranceDate: null,
                                  FitnessDate: null,
                                
                                  InsReminderDate: null,
                                  FitReminderDate: null,
                                  id: null,
                                });
                              }}
                            >
                              <Trash size={14} />
                            </Button>
                          </Col>

                          <Col>
                            <Label>Item</Label>
                            <CustomInput
                              bsSize="sm"
                              type="select"
                              id={"itemSelect" + i}
                              name={"itemSelect" + i}
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

                          <Col>
                            <Label>Quantity</Label>
                            <Input
                              bsSize="sm"
                              type="number"
                              value={data.Qty}
                              disabled
                            />
                          </Col>

                          <Col>
                            <Label>Unit</Label>
                            <CustomInput
                              bsSize="sm"
                              type="select"
                              id={"unitSelect" + i}
                              name={"unitSelect" + i}
                              value={data?.UnitID}
                              className={`p-0 pl-1`}
                              onChange={(e) => {
                                this.setState({
                                  UnitID: parseInt(e.target.value),
                                });
                              }}
                              disabled
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

                          <Col>
                            <Label>Reason</Label>
                            <Input
                              bsSize="sm"
                              type="text"
                          
                              name="remark"
                              placeholder="Reason"
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      );
                    })}
                </Col>

                <Col sm="1" className="mt-2 text-center">
                  <Button
                    size="sm"
                    color="primary"
                    className="cursor-pointer action-btn"
                    onClick={() => {
                      const exist = this.state.ItemDetails?.filter((data) => {
                        return data.IDNumber === this.state.id;
                      })?.[0];

                      if (exist) {
                        let objectIndex = this.state.ItemDetails.findIndex(
                          (d) => d.IDNumber === this.state.id
                        );
                        let tmpItemDetails = [...this.state.ItemDetails];
                        tmpItemDetails[objectIndex] = {
                          ...tmpItemDetails[objectIndex],
                          ItemID: this.state.ItemID,
                          UnitID: this.state.UnitID,
                          Qty: this.state.Qty,
                    
                        };
                        this.setState({
                          ItemDetails: tmpItemDetails,
                        });
                      } else {
                        if (this.state.ItemDetails.length > 0) {
                          this.setState({
                            ItemDetails: [
                              ...this.state.ItemDetails,
                              {
                                IDNumber: 0,
                                ItemID: this.state.ItemID,
                                UnitID: this.state.UnitID,
                                Qty: this.state.Qty,
                             
                                
                              },
                            ],
                          });
                        } else {
                          this.setState({
                            ItemDetails: [
                              {
                                IDNumber: 0,
                                ItemID: this.state.ItemID,
                                UnitID: this.state.UnitID,
                                Qty: this.state.Qty,
                            
                                
                              },
                            ],
                          });
                        }
                      }
                      // this.toggleModal();
                      this.setState({
                        ItemID: 0,
                        UnitID: 0,
                        Qty: "",
                        Reason: "",
                        id: null,
                      });
                    }}
                    disabled={
                      !this.state.ItemID ||
                      !this.state.Qty ||
                      !this.state.UnitID
                    }
                  >
                    <Plus size={14} />
                  </Button>
                </Col>

                <Col>
                  <Label>Item</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="ItemIDSelect"
                    name="ItemIDSelect"
                    value={this.state?.ItemID ? this.state?.ItemID : 0}
                    className={"p-0 pl-1"}
                    onChange={(e) => {
                      this.setState({
                        ItemID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Item</option>
                    {this.state.itemList &&
                      this.state.itemList?.length > 0 &&
                      this.state.itemList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                </Col>

                <Col>
                  <Label>Quantity</Label>
                  <Input
                    bsSize="sm"
                    type="number"
                    value={this.state.Qty ? this.state.Qty : ""}
                    onChange={(e) => this.onChange(e, "Qty")}
                    name="quantity"
                    placeholder="Quantity"
                  />
                </Col>

                <Col>
                  <Label>Unit</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="UnitIDSelect"
                    name="UnitIDSelect"
                    value={this.state?.UnitID}
                    className={`p-0 pl-1`}
                    onChange={(e) => {
                      this.setState({
                        UnitID: parseInt(e.target.value),
                      });
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

                <Col>
                  <Label>Reason</Label>
                  <Input
                    bsSize="sm"
                    type="text"
              
               
                    name="reason"
                    placeholder="Reason"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm="12">
                  <Button.Ripple
                    size="sm"
                    color="primary"
                    type="submit"
                    className="mr-1"
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
    purchaseIndent: state.purchaseIndent,
  };
};

export default connect(mapStateToProps, {
  getPurchaseIndent,
  getPurchaseIndentDropDown,
  addPurchaseIndent,
})(PurchaseIndentNew);
