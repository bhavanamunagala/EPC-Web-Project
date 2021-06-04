import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getDieselIssue,
  addDieselIssue,
  getDieselIssueDropDown,
} from "../../../../redux/actions/Diesel/DieselIssue";

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
import { parse } from "query-string";

class DieselIssueNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      SupplierList: [],
      VehicleList: [],
      UnitList: [],
      IsBillable: false,
      IsFreeIssue: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getDieselIssueDropDown(postData);
    this.props.getDieselIssue(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.dieselIssue.error !== this.props.dieselIssue.error &&
      this.props.dieselIssue.error
    ) {
      toast.error(this.props.dieselIssue.error);
    }
    if (
      prevProps.dieselIssue.successMsg !== this.props.dieselIssue.successMsg &&
      this.props.dieselIssue.successMsg
    ) {
      toast.success(this.props.dieselIssue.successMsg);
    }

    if (
      prevProps.dieselIssue.ProjectList !== this.props.dieselIssue.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.dieselIssue.ProjectList &&
          this.props.dieselIssue.ProjectList.length
            ? this.props.dieselIssue.ProjectList
            : [],
      });
    }
    if (
      prevProps.dieselIssue.SupplierList !== this.props.dieselIssue.SupplierList
    ) {
      this.setState({
        SupplierList:
          this.props.dieselIssue.SupplierList &&
          this.props.dieselIssue.SupplierList.length
            ? this.props.dieselIssue.SupplierList
            : [],
      });
    }
    if (
      prevProps.dieselIssue.VehicleList !== this.props.dieselIssue.VehicleList
    ) {
      this.setState({
        VehicleList:
          this.props.dieselIssue.VehicleList &&
          this.props.dieselIssue.VehicleList.length
            ? this.props.dieselIssue.VehicleList
            : [],
      });
    }
    if (prevProps.dieselIssue.UnitList !== this.props.dieselIssue.UnitList) {
      this.setState({
        UnitList:
          this.props.dieselIssue.UnitList &&
          this.props.dieselIssue.UnitList.length
            ? this.props.dieselIssue.UnitList
            : [],
      });
    }

    if (
      prevProps.dieselIssue.data !== this.props.dieselIssue.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.dieselIssue.data &&
        this.props.dieselIssue.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        ProjectID: filterData?.ProjectID,
        SupplierID: filterData?.SupplierID,
        VehicleID: filterData?.VehicleID,
        OnDate: filterData?.OnDate,
        IsBillable: filterData?.IsBillable === 1 ? true : false,
        IsFreeIssue: filterData?.IsFreeIssue === 1 ? true : false,
        DieselStock: filterData?.DieselStock,
        Qty: filterData?.Qty,
        UnitID: filterData?.UnitID,
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
      IsBillable,
      IsFreeIssue,
      DieselStock,
      Qty,
      UnitID,
      itemData,
    } = this.state;

    if (
      ProjectID &&
      SupplierID &&
      VehicleID &&
      OnDate &&
      DieselStock &&
      Qty &&
      UnitID
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
        IsBillable: IsBillable ? 1 : 0,
        IsFreeIssue: IsFreeIssue ? 1 : 0,
        DieselStock,
        Qty,
        UnitID,
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
        await this.props.addDieselIssue({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addDieselIssue(postData);
      }
      await this.resetState();
      await history.push("/Diesel/DieselIssue");
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
            <CardTitle>Diesel Issue</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Diesel/DieselIssue")}
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

                <Col>
                  <Label></Label>
                  <FormGroup row>
                    <FormGroup check inline>
                      <Input
                        size="sm"
                        type="checkbox"
                        onChange={(e) =>
                          this.setState({
                            IsBillable: e.target.checked,
                          })
                        }
                        checked={this.state.IsBillable}
                      />
                      <Label className="mb-0"> Is Billable</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        size="sm"
                        type="checkbox"
                        onChange={(e) =>
                          this.setState({
                            IsFreeIssue: e.target.checked,
                          })
                        }
                        checked={this.state.IsFreeIssue}
                      />
                      <Label className="mb-0"> Is FreeIssue</Label>
                    </FormGroup>
                  </FormGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>Diesel Stock</Label>
                  <Input
                    bsSize="sm"
                    type="numeric"
                    value={this.state.DieselStock ? this.state.DieselStock : ""}
                    onChange={(e) =>
                      this.setState({ DieselStock: parseInt(e.target.value) })
                    }
                    name="DieselStock"
                    id="DieselStock"
                    placeholder="DieselStock"
                    className={
                      btnFlg &&
                      (!this.state.DieselStock || this.state.DieselStock === "")
                        ? "invalid-input"
                        : ""
                    }
                  />
                  {btnFlg &&
                    (!this.state.DieselStock ||
                      this.state.DieselStock === "") && <ErrorText />}
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
                    <option value="0">Unit</option>
                    {this.state.UnitList &&
                      this.state.UnitList?.length > 0 &&
                      this.state.UnitList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.UnitName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.UnitID && <ErrorText />}
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
    dieselIssue: state.dieselIssue,
  };
};

export default connect(mapStateToProps, {
  getDieselIssue,
  getDieselIssueDropDown,
  addDieselIssue,
})(DieselIssueNew);
