import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getInsurance,
  addInsurance,
  getInsuranceDropDown,
  getInsuranceAttachment,
} from "../../../../redux/actions/Account/Insurance";

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
import { Eye, Trash } from "react-feather";

class InsuranceNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      ProjectList: [],
      SupplierList: [],
      VehicleList: [],
      UnitList: [],
      IsBillable: false,
      Days: false,
      file: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getInsuranceDropDown(postData);
    this.props.getInsurance(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.insurance.error !== this.props.insurance.error &&
      this.props.insurance.error
    ) {
      toast.error(this.props.insurance.error);
    }
    if (
      prevProps.insurance.successMsg !== this.props.insurance.successMsg &&
      this.props.insurance.successMsg
    ) {
      toast.success(this.props.insurance.successMsg);
    }

    if (
      prevProps.insurance.VehicleTypeList !==
      this.props.insurance.VehicleTypeList
    ) {
      this.setState({
        VehicleTypeList:
          this.props.insurance.VehicleTypeList &&
          this.props.insurance.VehicleTypeList.length
            ? this.props.insurance.VehicleTypeList
            : [],
      });
    }

    if (prevProps.insurance.VehicleList !== this.props.insurance.VehicleList) {
      this.setState({
        VehicleList:
          this.props.insurance.VehicleList &&
          this.props.insurance.VehicleList.length
            ? this.props.insurance.VehicleList
            : [],
      });
    }

    if (prevProps.insurance.file !== this.props.insurance.file) {
      this.setState({
        file:
          this.props.insurance.file && this.props.insurance.file.length
            ? this.props.insurance.file
            : [],
      });
    }

    if (
      prevProps.insurance.data !== this.props.insurance.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
 
      const filterData =
        this.props.insurance.data &&
        this.props.insurance.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        PolicyNo: filterData?.PolicyNo,
        StartDate: filterData?.StartDate,
        EndDate: filterData?.EndDate,
        VehicleType: filterData?.VehicleType,
        VehicleID: filterData?.VehicleID,
        InsuranceCompany: filterData?.InsuranceCompany,
        Amount: filterData?.Amount,
        ReminderDate: filterData?.ReminderDate,
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
      PolicyNo,
      StartDate,
      EndDate,
      VehicleType,
      VehicleID,
      InsuranceCompany,
      Amount,
      ReminderDate,
      file,
      itemData,
    } = this.state;

    if (
      PolicyNo &&
      StartDate &&
      EndDate &&
      VehicleType &&
      VehicleID &&
      InsuranceCompany &&
      Amount &&
      ReminderDate
    ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,

        PolicyNo,
        StartDate:
          typeof StartDate === "object"
            ? moment(StartDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.StartDate,
        EndDate:
          typeof EndDate === "object"
            ? moment(EndDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.EndDate,
        VehicleType,
        VehicleID,
        InsuranceCompany,
        Amount,
        ReminderDate:
          typeof ReminderDate === "object"
            ? moment(ReminderDate?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.ReminderDate,
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
        await this.props.addInsurance({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addInsurance(postData);
      }
      await this.resetState();
      await history.push("/Account/Insurance");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Insurance Master</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Account/Insurance")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col>
                  <Label>PolicyNo</Label>
                  <Input
                    // bsSize="sm"
                    type="text"
                    value={this.state.PolicyNo ? this.state.PolicyNo : ""}
                    onChange={(e) =>
                      this.setState({ PolicyNo: e.target.value })
                    }
                    name="PolicyNo"
                    id="PolicyNo"
                    placeholder="PolicyNo"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.PolicyNo ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.PolicyNo && <ErrorText />}
                </Col>
                <Col>
                  <Label>Start Date</Label>
                  <Flatpickr
                    value={this.state.StartDate}
                    onChange={(date) => {
                      this.setState({ StartDate: date });
                    }}
                    placeholder="On Date"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.StartDate ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.StartDate && <ErrorText />}
                </Col>
                <Col>
                  <Label>End Date</Label>
                  <Flatpickr
                    value={this.state.EndDate}
                    onChange={(date) => {
                      this.setState({ EndDate: date });
                    }}
                    placeholder="On Date"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.EndDate ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.EndDate && <ErrorText />}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label>Vehicle Type</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="VehicleTypeSelect"
                    name="VehicleTypeSelect"
                    value={this.state?.VehicleType}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.VehicleType === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        VehicleType: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">VehicleType</option>
                    {this.state.VehicleTypeList &&
                      this.state.VehicleTypeList?.length > 0 &&
                      this.state.VehicleTypeList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.VehicleType}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.VehicleType && <ErrorText />}
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
                  <Label>Insurance Company</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.InsuranceCompany
                        ? this.state.InsuranceCompany
                        : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.InsuranceCompany
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ InsuranceCompany: e.target.value })
                    }
                    name="InsuranceCompany"
                    id="InsuranceCompany"
                    placeholder="Insurance Company"
                  />
                  {btnFlg && !this.state?.InsuranceCompany && <ErrorText />}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>Amount</Label>
                  <Input
                    bsSize="sm"
                    type="number"
                    value={this.state.Amount ? this.state.Amount : ""}
                    onChange={(e) => this.setState({ Amount: e.target.value })}
                    name="Amount"
                    id="Amount"
                    placeholder="Amount"
                    className={
                      btnFlg && (!this.state.Amount || this.state.Amount === "")
                        ? "invalid-input"
                        : ""
                    }
                  />
                  {btnFlg &&
                    (!this.state.Amount || this.state.Amount === "") && (
                      <ErrorText />
                    )}
                </Col>
                <Col>
                  <Label>Reminder Date</Label>
                  <Flatpickr
                    value={this.state.ReminderDate}
                    onChange={(date) => {
                      this.setState({ ReminderDate: date });
                    }}
                    placeholder="On Date"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.ReminderDate ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.ReminderDate && <ErrorText />}
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
    insurance: state.insurance,
  };
};

export default connect(mapStateToProps, {
  getInsurance,
  getInsuranceDropDown,
  addInsurance,
  getInsuranceAttachment,
})(InsuranceNew);
