import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getDieselPurchase,
  addDieselPurchase,
  getDieselPurchaseDropDown,
} from "../../../../redux/actions/Diesel/DieselPurchase";

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
import { Eye } from "react-feather";

class DieselPurchaseNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      SupplierList: [],
      VehicleList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getDieselPurchaseDropDown(postData);
    this.props.getDieselPurchase(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.dieselPurchase.error !== this.props.dieselPurchase.error &&
      this.props.dieselPurchase.error
    ) {
      toast.error(this.props.dieselPurchase.error);
    }
    if (
      prevProps.dieselPurchase.successMsg !==
        this.props.dieselPurchase.successMsg &&
      this.props.dieselPurchase.successMsg
    ) {
      toast.success(this.props.dieselPurchase.successMsg);
    }

    if (
      prevProps.dieselPurchase.ProjectList !==
      this.props.dieselPurchase.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.dieselPurchase.ProjectList &&
          this.props.dieselPurchase.ProjectList.length
            ? this.props.dieselPurchase.ProjectList
            : [],
      });
    }
    if (
      prevProps.dieselPurchase.SupplierList !==
      this.props.dieselPurchase.SupplierList
    ) {
      this.setState({
        SupplierList:
          this.props.dieselPurchase.SupplierList &&
          this.props.dieselPurchase.SupplierList.length
            ? this.props.dieselPurchase.SupplierList
            : [],
      });
    }
    if (
      prevProps.dieselPurchase.VehicleList !==
      this.props.dieselPurchase.VehicleList
    ) {
      this.setState({
        VehicleList:
          this.props.dieselPurchase.VehicleList &&
          this.props.dieselPurchase.VehicleList.length
            ? this.props.dieselPurchase.VehicleList
            : [],
      });
    }

    if (
      prevProps.dieselPurchase.data !== this.props.dieselPurchase.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.dieselPurchase.data &&
        this.props.dieselPurchase.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        ProjectID: filterData?.ProjectID,
        SupplierID: filterData?.SupplierID,
        VehicleID: filterData?.VehicleID,
        OnDate: filterData?.OnDate,
        PetrolPump: filterData?.PetrolPump,
        Qty: filterData?.Qty,
        Rate: filterData?.Rate,
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
      ProjectID,
      SupplierID,
      VehicleID,
      OnDate,
      PetrolPump,
      Qty,
      Rate,
      Remarks,
      itemData,
    } = this.state;

    if (
      ProjectID &&
      SupplierID &&
      VehicleID &&
      OnDate &&
      PetrolPump &&
      Qty &&
      Rate
    ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,

        ProjectID,
        SupplierID,
        VehicleID,
        OnDate:
          typeof OnDate === "object"
            ? moment(OnDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.OnDate,
        PetrolPump,
        Qty,
        Rate,
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
        await this.props.addDieselPurchase({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addDieselPurchase(postData);
      }
      await this.resetState();
      await history.push("/Diesel/DieselPurchase");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Diesel Purchase</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Diesel/DieselPurchase")}
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
                <Col>
                  <Label>Supplier</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="SupplierIDSelect"
                    name="SupplierIDSelect"
                    value={this.state?.SupplierID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.SupplierID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        SupplierID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Supplier</option>
                    {this.state.SupplierList &&
                      this.state.SupplierList?.length > 0 &&
                      this.state.SupplierList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.SupplierName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.SupplierID && <ErrorText />}
                </Col>
                <Col>
                  <Label>Vehicle</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="VehicleIDSelect"
                    name="VehicleIDSelect"
                    value={this.state?.VehicleID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.VehicleID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        VehicleID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Vehicle</option>
                    {this.state.VehicleList &&
                      this.state.VehicleList?.length > 0 &&
                      this.state.VehicleList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.VehicleNo}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.VehicleID && <ErrorText />}
                </Col>

                <Col>
                  <Label>On Date</Label>
                  <Flatpickr
                    value={this.state.OnDate}
                    onChange={(date) => {
                      this.setState({ OnDate: date });
                    }}
                    placeholder="On Date"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.OnDate ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.OnDate && <ErrorText />}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>Petrol Pump</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.PetrolPump ? this.state.PetrolPump : ""}
                    onChange={(e) => this.onChange(e, "PetrolPump")}
                    name="PetrolPump"
                    id="PetrolPump"
                    placeholder="PetrolPump"
                    className={
                      btnFlg &&
                      (!this.state.PetrolPump || this.state.PetrolPump === "")
                        ? "invalid-input"
                        : ""
                    }
                  />
                  {btnFlg &&
                    (!this.state.PetrolPump ||
                      this.state.PetrolPump === "") && <ErrorText />}
                </Col>
                <Col>
                  <Label>Quantity</Label>
                  <Input
                    bsSize="sm"
                    type="numeric"
                    value={this.state.Qty ? this.state.Qty : ""}
                    onChange={(e) =>
                      this.setState({ Qty: parseInt(e.target.value) })
                    }
                    name="Qty"
                    id="Qty"
                    placeholder="Qty"
                    className={
                      btnFlg && (!this.state.Qty || this.state.Qty === "")
                        ? "invalid-input"
                        : ""
                    }
                  />
                  {btnFlg && (!this.state.Qty || this.state.Qty === "") && (
                    <ErrorText />
                  )}
                </Col>
                <Col>
                  <Label>Rate</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.Rate ? this.state.Rate : ""}
                    onChange={(e) =>
                      this.setState({ Rate: parseInt(e.target.value) })
                    }
                    name="Rate"
                    id="Rate"
                    placeholder="Rate"
                    className={
                      btnFlg && (!this.state.Rate || this.state.Rate === "")
                        ? "invalid-input"
                        : ""
                    }
                  />
                  {btnFlg && (!this.state.Rate || this.state.Rate === "") && (
                    <ErrorText />
                  )}
                </Col>

                <Col>
                  <Label>Remarks</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.Remarks ? this.state.Remarks : ""}
                    onChange={(e) => this.onChange(e, "Remarks")}
                    name="Remarks"
                    id="Remarks"
                    placeholder="Remarks"
                  />
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
    dieselPurchase: state.dieselPurchase,
  };
};

export default connect(mapStateToProps, {
  getDieselPurchase,
  getDieselPurchaseDropDown,
  addDieselPurchase,
})(DieselPurchaseNew);
