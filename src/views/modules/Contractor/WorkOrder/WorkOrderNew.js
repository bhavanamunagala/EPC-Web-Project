import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getWorkOrder,
  addWorkOrder,
  getWorkOrderDropDown,
} from "../../../../redux/actions/Contractor/WorkOrder";

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

class WorkOrderNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      ContractorList: [],
      ItemList: [],
      UnitList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getWorkOrderDropDown(postData);
    this.props.getWorkOrder(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.workOrder.error !== this.props.workOrder.error &&
      this.props.workOrder.error
    ) {
      toast.error(this.props.workOrder.error);
    }
    if (
      prevProps.workOrder.successMsg !== this.props.workOrder.successMsg &&
      this.props.workOrder.successMsg
    ) {
      toast.success(this.props.workOrder.successMsg);
    }

    if (prevProps.workOrder.ProjectList !== this.props.workOrder.ProjectList) {
      this.setState({
        ProjectList:
          this.props.workOrder.ProjectList &&
          this.props.workOrder.ProjectList.length
            ? this.props.workOrder.ProjectList
            : [],
      });
    }
    if (
      prevProps.workOrder.ContractorList !== this.props.workOrder.ContractorList
    ) {
      this.setState({
        ContractorList:
          this.props.workOrder.ContractorList &&
          this.props.workOrder.ContractorList.length
            ? this.props.workOrder.ContractorList
            : [],
      });
    }
    if (prevProps.workOrder.ItemList !== this.props.workOrder.ItemList) {
      this.setState({
        ItemList:
          this.props.workOrder.ItemList && this.props.workOrder.ItemList.length
            ? this.props.workOrder.ItemList
            : [],
      });
    }
    if (prevProps.workOrder.UnitList !== this.props.workOrder.UnitList) {
      this.setState({
        UnitList:
          this.props.workOrder.UnitList && this.props.workOrder.UnitList.length
            ? this.props.workOrder.UnitList
            : [],
      });
    }

    if (
      prevProps.workOrder.data !== this.props.workOrder.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.workOrder.data &&
        this.props.workOrder.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        ProjectID: filterData?.ProjectID,
        ContractorID: filterData?.ContractorID,
        ItemID: filterData?.ItemID,
        UnitID: filterData?.UnitID,
        Qty: filterData?.Qty,
        Rate: filterData?.Rate,
        Amount: filterData?.Amount,
        Remarks: filterData?.Remarks,
        MachineryIsBillable:
          filterData?.MachineryIsBillable === 1 ? true : false,
        DieselForMachinery: filterData?.DieselForMachinery === 1 ? true : false,
        InventoryItem: filterData?.InventoryItem === 1 ? true : false,
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
    const {
      Date,
      ProjectID,
      ContractorID,
      ItemID,
      UnitID,
      Qty,
      Rate,
      Amount,
      Remarks,
      MachineryIsBillable,
      DieselForMachinery,
      InventoryItem,
      file,
      itemData,
    } = this.state;

    if (
      Date &&
      ProjectID &&
      ContractorID &&
      ItemID &&
      UnitID &&
      Qty &&
      Rate &&
      Amount &&
      Remarks
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
        ItemID,
        UnitID,
        Qty,
        Rate,
        Amount,
        Remarks,
        MachineryIsBillable: MachineryIsBillable ? 1 : 0,
        DieselForMachinery: DieselForMachinery ? 1 : 0,
        InventoryItem: InventoryItem ? 1 : 0,
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
        await this.props.addWorkOrder({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addWorkOrder(postData);
      }
      await this.resetState();
      await history.push("/Contractor/WorkOrder");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, ProjectList, ContractorList, ItemList, UnitList } =
      this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Work Order</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Contractor/WorkOrder")}
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
                <Col sm="8">
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
                <Col sm="4">
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
                    onChange={(e) =>
                      this.setState({
                        Qty: parseInt(e.target.value),
                        Amount:
                          parseInt(e.target.value) * parseInt(this.state.Rate),
                      })
                    }
                    name="Qty"
                    id="Qty"
                    placeholder="Qty"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Qty ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.Amount && <ErrorText />}
                </Col>
                <Col>
                  <Label>Rate</Label>
                  <Input
                    type="text"
                    value={this.state.Rate ? this.state.Rate : ""}
                    onChange={(e) =>
                      this.setState({
                        Rate: parseInt(e.target.value),
                        Amount:
                          parseInt(e.target.value) * parseInt(this.state.Qty),
                      })
                    }
                    name="Rate"
                    id="Rate"
                    placeholder="Rate"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Rate ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.Rate && <ErrorText />}
                </Col>
                <Col>
                  <Label>Amount</Label>
                  <Input
                    type="text"
                    value={this.state.Amount ? this.state.Amount : ""}
                    // onChange={(e) => this.setState({ Amount: e.target.value })}
                    name="Amount"
                    id="Amount"
                    placeholder="Amount"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Amount ? "invalid-input" : ""
                    }`}
                    disabled
                  />
                </Col>
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
                <Col sm="12">
                  <FormGroup check inline>
                    <Input
                      size="sm"
                      type="checkbox"
                      onChange={(e) =>
                        this.setState({
                          MachineryIsBillable: e.target.checked,
                        })
                      }
                      checked={this.state.MachineryIsBillable}
                    />
                    <Label className="mb-0">
                      Diesel for machinary is billable
                    </Label>
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup check inline>
                    <Input
                      size="sm"
                      type="checkbox"
                      onChange={(e) =>
                        this.setState({
                          DieselForMachinery: e.target.checked,
                        })
                      }
                      checked={this.state.DieselForMachinery}
                    />
                    <Label className="mb-0">Inventory item is billable</Label>
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup check inline>
                    <Input
                      size="sm"
                      type="checkbox"
                      onChange={(e) =>
                        this.setState({
                          InventoryItem: e.target.checked,
                        })
                      }
                      checked={this.state.InventoryItem}
                    />
                    <Label className="mb-0">Inventory Item</Label>
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
    workOrder: state.workOrder,
  };
};

export default connect(mapStateToProps, {
  getWorkOrder,
  getWorkOrderDropDown,
  addWorkOrder,
})(WorkOrderNew);
