import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../style.css";
import {
  getTrip,
  addTrip,
  getTripDropDown,
  getTripAttchment,
} from "../../../redux/actions/Trip/TripMaster";

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
import "../../../assets/scss/plugins/extensions/toastr.scss";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../assets/scss/pages/data-list.scss";
import { history } from "../../../history";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import ErrorText from "../../ui-elements/text-utilities/ErrorText";
import { Eye, Trash } from "react-feather";

class TripMasterNew extends React.Component {
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
    this.props.getTripDropDown(postData);
    this.props.getTrip(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.trip.error !== this.props.trip.error &&
      this.props.trip.error
    ) {
      toast.error(this.props.trip.error);
    }
    if (
      prevProps.trip.successMsg !== this.props.trip.successMsg &&
      this.props.trip.successMsg
    ) {
      toast.success(this.props.trip.successMsg);
    }

    if (prevProps.trip.ProjectList !== this.props.trip.ProjectList) {
      this.setState({
        ProjectList:
          this.props.trip.ProjectList && this.props.trip.ProjectList.length
            ? this.props.trip.ProjectList
            : [],
      });
    }
    if (prevProps.trip.SupplierList !== this.props.trip.SupplierList) {
      this.setState({
        SupplierList:
          this.props.trip.SupplierList && this.props.trip.SupplierList.length
            ? this.props.trip.SupplierList
            : [],
      });
    }
    if (prevProps.trip.VehicleList !== this.props.trip.VehicleList) {
      this.setState({
        VehicleList:
          this.props.trip.VehicleList && this.props.trip.VehicleList.length
            ? this.props.trip.VehicleList
            : [],
      });
    }

    if (
      prevProps.trip.data !== this.props.trip.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      this.props.getTripAttchment({ IDNumber: id });
      const filterData =
        this.props.trip.data &&
        this.props.trip.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        ProjectID: filterData?.ProjectID,
        SupplierID: filterData?.SupplierID,
        VehicleID: filterData?.VehicleID,
        OnDate: filterData?.OnDate,
        IsBillable: filterData?.IsBillable === 1 ? true : false,
        Days: filterData?.Days === 1 ? true : false,
        DetailsOfUsed: filterData?.DetailsOfUsed,
        Remarks: filterData?.Remarks,
        UnitID: filterData?.UnitID,
      });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleTripAttachment = (e) => {
    let fileArray = [];
    for (let i = 0; i < e.target.files.length; i++) {
      fileArray.push(URL.createObjectURL(e.target.files[i]));
    }
    this.setState({ file: fileArray, attchments: e.target.files });
  };

  deleteTripAttachment = (index) => {
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
      ProjectID,
      SupplierID,
      VehicleID,
      OnDate,
      IsBillable,
      Days,
      DetailsOfUsed,
      Remarks,
      file,
      itemData,
    } = this.state;

    if (ProjectID && SupplierID && VehicleID && OnDate && DetailsOfUsed) {
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
        Days: Days ? 1 : 0,
        DetailsOfUsed,
        Remarks,
        file: this.state.attchments,
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
        await this.props.addTrip({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addTrip(postData);
      }
      await this.resetState();
      await history.push("/Trip/TripMaster");
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
            <CardTitle>Trip Master</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Trip/TripMaster")}
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
                            Days: e.target.checked,
                          })
                        }
                        checked={this.state.Days}
                      />
                      <Label className="mb-0"> Days</Label>
                    </FormGroup>
                  </FormGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Label>DetailsOfUsed</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.DetailsOfUsed ? this.state.DetailsOfUsed : ""
                    }
                    onChange={(e) =>
                      this.setState({ DetailsOfUsed: e.target.value })
                    }
                    name="DetailsOfUsed"
                    id="DetailsOfUsed"
                    placeholder="DetailsOfUsed"
                    className={
                      btnFlg &&
                      (!this.state.DetailsOfUsed ||
                        this.state.DetailsOfUsed === "")
                        ? "invalid-input"
                        : ""
                    }
                  />
                  {btnFlg &&
                    (!this.state.DetailsOfUsed ||
                      this.state.DetailsOfUsed === "") && <ErrorText />}
                </Col>
                <Col>
                  <Label>Remarks</Label>
                  <Input
                    bsSize="sm"
                    type="test"
                    value={this.state.Remarks ? this.state.Remarks : ""}
                    onChange={(e) => this.setState({ Remarks: e.target.value })}
                    name="Remarks"
                    id="Remarks"
                    placeholder="Remarks"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <FormGroup>
                    <Label for="POAttchment">Attachment Document</Label>
                    <CustomInput
                      type="file"
                      bsSize="sm"
                      id="POAttchment"
                      name="POAttchment"
                      multiple
                      onChange={(e) => this.handleTripAttachment(e)}
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
                        onClick={() => this.deleteTripAttachment(url, index)}
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
    trip: state.trip,
  };
};

export default connect(mapStateToProps, {
  getTrip,
  getTripDropDown,
  addTrip,
  getTripAttchment,
})(TripMasterNew);
