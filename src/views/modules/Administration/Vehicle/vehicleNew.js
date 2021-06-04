import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import Flatpickr from "react-flatpickr";
// import SweetAlert from "react-bootstrap-sweetalert";
import "react-toastify/dist/ReactToastify.css";
import "../../style.css";
import {
  getVehicle,
  getVehicleMetaData,
  addVehicle,
} from "../../../../redux/actions/Administration/vehicle";
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

class VehicleNewView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      CountryID: "",
      successMsg: "",
      deleteAlert: false,
      itemData: null,
      ItemGroupList: [],
      ItemUnitList: [],
      modal: false,
      VehicleDetails: [],
      DeletedVehicleDetails: "",
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getVehicle(postData);
    // this.props.getProjectData(postData);
    this.props.getVehicleMetaData(postData);
    // this.props.getRoomMetaData(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.vehicle.error !== this.props.vehicle.error &&
      this.props.vehicle.error
    ) {
      toast.error(this.props.vehicle.error);
    }
    if (
      prevProps.vehicle.successMsg !== this.props.vehicle.successMsg &&
      this.props.vehicle.successMsg
    ) {
      toast.success(this.props.vehicle.successMsg);
    }
    if (prevProps.vehicle.data !== this.props.vehicle.data) {
      this.setState({
        response:
          this.props.vehicle.data && this.props.vehicle.data.length
            ? this.props.vehicle.data
            : [],
        random: this.props.vehicle.random,
      });
    }
    if (prevProps.vehicle.projectList !== this.props.vehicle.projectList) {
      let projectData = [];
      this.props.vehicle.projectList.forEach((item) => {
        projectData.push({ value: item.IDNumber, label: item.ProjectName });
      });

      this.setState({
        projectList:
          this.props.vehicle.projectList &&
          this.props.vehicle.projectList.length
            ? projectData
            : [],
      });
    }
    if (
      prevProps.vehicle.vehicleMetaData.VehicleTypes !==
      this.props.vehicle.vehicleMetaData.VehicleTypes
    ) {
      let vehicleData = [];
      this.props.vehicle.vehicleMetaData.VehicleTypes.forEach((item) => {
        vehicleData.push({ value: item.IDNumber, label: item.VehicleType });
      });

      this.setState({
        vehicleTypeList:
          this.props.vehicle.vehicleMetaData.VehicleTypes &&
          this.props.vehicle.vehicleMetaData.VehicleTypes.length
            ? vehicleData
            : [],
      });
    }
    if (
      prevProps.vehicle.vehicleMetaData.Owners !==
      this.props.vehicle.vehicleMetaData.Owners
    ) {
      let ownerData = [];
      this.props.vehicle.vehicleMetaData.Owners.forEach((item) => {
        ownerData.push({ value: item.IDNumber, label: item.SupplierName });
      });

      this.setState({
        ownerList:
          this.props.vehicle.vehicleMetaData.Owners &&
          this.props.vehicle.vehicleMetaData.Owners.length
            ? ownerData
            : [],
      });
    }
    if (
      prevProps.vehicle.vehicleMetaData.OwnerTypes !==
      this.props.vehicle.vehicleMetaData.OwnerTypes
    ) {
      let roomData = [];
      this.props.vehicle.vehicleMetaData.OwnerTypes.forEach((item) => {
        roomData.push({ value: item.IDNumber, label: item.OwnerType });
      });

      this.setState({
        ownerTypeList:
          this.props.vehicle.vehicleMetaData.OwnerTypes &&
          this.props.vehicle.vehicleMetaData.OwnerTypes.length
            ? roomData
            : [],
      });
    }

    if (
      prevProps.vehicle.data !== this.props.vehicle.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.vehicle.data &&
        this.props.vehicle.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        parentIDNumber: filterData?.IDNumber,
        ProjectID: filterData?.ProjectID,
        ownerListID: filterData?.OwnerID,
        vehicle: filterData?.VehicleType,
        VehicleNo: filterData?.VehicleNo,
        owner: filterData?.OwnerType,
        PurchaseDate: filterData?.PurchaseDate,
        EffectiveDate: filterData?.EffectiveDate,
        Rate: filterData?.Rate,
        ReleaseDate: filterData?.ReleaseDate,
        VehicleDetails: filterData?.VehicleDetails,
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
      itemData,
      ProjectID,
      owner,
      vehicle,
      VehicleNo,
      // OwnerType,
      PurchaseDate,
      EffectiveDate,
      Rate,
      InsuranceDate,
      FitnessDate,
      ReleaseDate,
      ReminderDate,
      // Remarks,
      VehicleDetails,
      ownerListID,
      DeletedVehicleDetails,
    } = this.state;
    if (
      ProjectID &&
      owner &&
      vehicle &&
      VehicleNo &&
      PurchaseDate &&
      EffectiveDate &&
      Rate &&
      ownerListID
    ) {
      VehicleDetails.map((data) => {
        delete data["id"];
        data["InsuranceDate"] =
          typeof data?.InsuranceDate === "object"
            ? data?.InsuranceDate?.[0]
            : data?.InsuranceDate;
        data["FitnessDate"] =
          typeof data?.FitnessDate === "object"
            ? data?.FitnessDate?.[0]
            : data?.FitnessDate;
        data["InsReminderDate"] =
          typeof data?.InsReminderDate === "object"
            ? data?.InsReminderDate?.[0]
            : data?.InsReminderDate;
        data["FitReminderDate"] =
          typeof data?.FitReminderDate === "object"
            ? data?.FitReminderDate?.[0]
            : data?.FitReminderDate;
        return null;
      });
      let postData = {
        IDNumber: itemData?.IDNumber ?? 0,
        ProjectID: ProjectID,
        OwnerType: owner,
        VehicleType: vehicle,
        VehicleNo,
        OwnerID: ownerListID,
        PurchaseDate:
          typeof PurchaseDate === "object"
            ? PurchaseDate?.[0]
            : itemData?.PurchaseDate,
        EffectiveDate:
          typeof EffectiveDate === "object"
            ? EffectiveDate?.[0]
            : itemData?.EffectiveDate,
        Rate,
        InsuranceDate:
          typeof InsuranceDate === "object"
            ? InsuranceDate?.[0]
            : itemData?.InsuranceDate,
        FitnessDate:
          typeof FitnessDate === "object"
            ? FitnessDate?.[0]
            : itemData?.FitnessDate,
        ReleaseDate:
          typeof ReleaseDate === "object"
            ? ReleaseDate?.[0]
            : itemData?.ReleaseDate,
        ReminderDate:
          typeof ReminderDate === "object"
            ? ReminderDate?.[0]
            : itemData?.ReminderDate,
        VehicleDetails: VehicleDetails,
        CreatedDate: moment(),
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        DeletedVehicleDetails: DeletedVehicleDetails,
      };

      if (history?.location?.state?.id) {
        await this.props.addVehicle({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addVehicle(postData);
      }
      await this.resetState();
      await history.push("/Administrator/VehicleMaster");
    }
  };

  resetState = () => {
    this.setState({
      project: null,
      vehicle: null,
      owner: null,
      ownerListID: null,
      VehicleNo: "",
      PurchaseDate: null,
      EffectiveDate: null,
      Rate: "",
      InsuranceDate: null,
      FitnessDate: null,
      ReleaseDate: null,
      ReminderDate: null,
      Remarks: "",
      btnFlg: false,
      VehicleDetails: null,
    });
  };

  toggleModal = () =>
    this.setState({
      modal: !this.state.modal,
    });

  render() {
    const {
      InsuranceDate,
      FitnessDate,
      Remarks,
      InsReminderDate,
      FitReminderDate,
      btnFlg,
    } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Master</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Administrator/VehicleMaster")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col
                  className={
                    btnFlg && !this.state?.ProjectID ? "invalid-input" : ""
                  }
                >
                  <Label>Project</Label>
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ project: e })}
                    value={this.state.project}
                    name="project"
                    options={this.state.projectList}
                    placeholder="Select Project"
                  /> */}
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="ProjectIDSelect"
                    name="ProjectIDSelect"
                    value={this.state?.ProjectID}
                    className="p-0 pl-1"
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

                <Col
                  className={
                    btnFlg && !this.state?.owner ? "invalid-input" : ""
                  }
                >
                  <Label>Owner Type</Label>
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ owner: e })}
                    value={this.state.owner}
                    name="ownerType"
                    options={this.state.ownerTypeList}
                    placeholder="Select Owner Type"
                  /> */}
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="ownerSelect"
                    name="ownerSelect"
                    value={this.state?.owner}
                    className="p-0 pl-1"
                    onChange={(e) => {
                      this.setState({
                        owner: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Owner Type</option>
                    {this.state.ownerTypeList &&
                      this.state.ownerTypeList?.length > 0 &&
                      this.state.ownerTypeList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.owner && <ErrorText />}
                </Col>
                <Col
                  className={
                    btnFlg && !this.state?.ownerListID ? "invalid-input" : ""
                  }
                >
                  <Label>Select Owner</Label>
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ ownerListID: e })}
                    value={this.state.ownerListID}
                    name="owner"
                    options={this.state.ownerList}
                    placeholder="Select Owner"
                  /> */}
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="ownerListIDSelect"
                    name="ownerListIDSelect"
                    value={this.state?.ownerListID}
                    className="p-0 pl-1"
                    onChange={(e) => {
                      this.setState({
                        ownerListID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Owner</option>
                    {this.state.ownerList &&
                      this.state.ownerList?.length > 0 &&
                      this.state.ownerList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.ownerListID && <ErrorText />}
                </Col>
                <Col
                  className={
                    btnFlg && !this.state?.vehicle ? "invalid-input" : ""
                  }
                >
                  <Label>Vehicle Type</Label>
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ vehicle: e })}
                    value={this.state.vehicle}
                    name="vehicleType"
                    options={this.state.vehicleTypeList}
                    placeholder="Select Vehicle Type"
                  /> */}
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="vehicleSelect"
                    name="vehicleSelect"
                    value={this.state?.vehicle}
                    className="p-0 pl-1"
                    onChange={(e) => {
                      this.setState({
                        vehicle: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Vehicle Type</option>
                    {this.state.vehicleTypeList &&
                      this.state.vehicleTypeList?.length > 0 &&
                      this.state.vehicleTypeList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.vehicle && <ErrorText />}
                </Col>
                <Col>
                  <Label>Vehicle No</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.VehicleNo}
                    onChange={(e) => this.onChange(e, "VehicleNo")}
                    name="vehicleNo"
                    placeholder="Vehicle No"
                    className={
                      btnFlg &&
                      (!this.state.VehicleNo || this.state.VehicleNo === "")
                        ? "invalid-input"
                        : ""
                    }
                  />
                  {btnFlg &&
                    (!this.state.VehicleNo || this.state.VehicleNo === "") && (
                      <ErrorText />
                    )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col
                  className={
                    btnFlg && !this.state?.PurchaseDate?.[0]
                      ? "invalid-input"
                      : ""
                  }
                >
                  <Label>Purchase Date</Label>
                  <Flatpickr
                    value={this.state.PurchaseDate}
                    onChange={(date) => {
                      this.setState({ PurchaseDate: date });
                    }}
                    placeholder="Purchase Date"
                    className="form-control form-control-sm"
                  />
                  {btnFlg && !this.state?.PurchaseDate?.[0] && <ErrorText />}
                </Col>

                <Col
                  className={
                    btnFlg && !this.state?.EffectiveDate?.[0]
                      ? "invalid-input"
                      : ""
                  }
                >
                  <Label>Effective Date</Label>
                  <Flatpickr
                    value={this.state.EffectiveDate}
                    onChange={(date) => {
                      this.setState({ EffectiveDate: date });
                    }}
                    placeholder="Effective Date"
                    className="form-control form-control-sm"
                  />
                  {btnFlg && !this.state?.EffectiveDate?.[0] && <ErrorText />}
                </Col>

                <Col>
                  <Label>Rate</Label>
                  <Input
                    bsSize="sm"
                    type="number"
                    value={this.state.Rate}
                    onChange={(e) => this.onChange(e, "Rate")}
                    name="rate"
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
                  <Label>Release Date</Label>
                  <Flatpickr
                    value={this.state.ReleaseDate}
                    onChange={(date) => {
                      this.setState({ ReleaseDate: date });
                    }}
                    placeholder="Release Date"
                    className="form-control form-control-sm"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                {/* <Col sm="3">
                  <Button color="primary" onClick={this.toggleModal}>
                    Create New Item
                  </Button>
                </Col> */}
                <Col sm="12">
                  <CardTitle>Vehicle Detail</CardTitle>
                </Col>

                <Col sm="12">
                  {this.state.VehicleDetails?.length > 0 &&
                    this.state.VehicleDetails?.map((data) => (
                      <FormGroup row key={data.IDNumber}>
                        <Col sm="1" className="mt-2 text-center">
                          <Button
                            size="sm"
                            color="danger"
                            className="cursor-pointer action-btn"
                            onClick={() => {
                              // const filter = this.state.VehicleDetails.filter(
                              //   (item) => {
                              //     return item?.id
                              //       ? item?.id !== data.id
                              //       : item?.IDNumber !== data.IDNumber;
                              //   }
                              // );
                              // this.state.DeletedVehicleDetails.push(
                              //   data.IDNumber
                              // );

                              let objectIndex = this.state.VehicleDetails.findIndex(
                                (d) => d.IDNumber === data.IDNumber
                              );
                              this.state.VehicleDetails.splice(objectIndex, 1);

                              this.setState({
                                DeletedVehicleDetails:
                                  this.state.DeletedVehicleDetails +
                                  "," +
                                  data.IDNumber,
                                InsuranceDate: null,
                                FitnessDate: null,
                                Remarks: null,
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
                          <Label>Insurance Date</Label>
                          <Flatpickr
                            value={data.InsuranceDate}
                            placeholder="Insurance Date"
                            className="form-control form-control-sm "
                            disabled
                          />
                        </Col>

                        <Col>
                          <Label>Fitness Date</Label>
                          <Flatpickr
                            value={data.FitnessDate}
                            placeholder="Fitness Date"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </Col>

                        <Col>
                          <Label>Insurance Reminder Date</Label>
                          <Flatpickr
                            value={data.InsReminderDate}
                            placeholder="Insurance Date"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </Col>

                        <Col>
                          <Label>Fitness Reminder Date</Label>
                          <Flatpickr
                            value={data.FitReminderDate}
                            placeholder="Fitness Date"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </Col>

                        <Col>
                          <Label>Remarks</Label>
                          <Input
                            size="sm"
                            type="text"
                            value={data.Remarks}
                            name="remark"
                            placeholder="Remarks"
                            disabled
                          />
                        </Col>
                      </FormGroup>
                    ))}
                </Col>

                <Col sm="1" className="mt-2 text-center">
                  <Button
                    size="sm"
                    color="primary"
                    className="cursor-pointer action-btn"
                    onClick={() => {
                      const exist = this.state.VehicleDetails?.filter(
                        (data) => {
                          return data.IDNumber === this.state.id;
                        }
                      )?.[0];

                      if (exist) {
                        let objectIndex = this.state.VehicleDetails.findIndex(
                          (d) => d.IDNumber === this.state.id
                        );
                        let tmpVehicleDetails = [...this.state.VehicleDetails];
                        tmpVehicleDetails[objectIndex] = {
                          ...tmpVehicleDetails[objectIndex],
                          InsuranceDate,
                          FitnessDate,
                          Remarks,
                          InsReminderDate,
                          FitReminderDate,
                          VehicleMstID: this.state.parentIDNumber,
                        };
                        this.setState({
                          VehicleDetails: tmpVehicleDetails,
                        });
                      } else {
                        if (this.state.VehicleDetails.length > 0) {
                          this.setState({
                            VehicleDetails: [
                              ...this.state.VehicleDetails,
                              {
                                IDNumber: 0,
                                InsuranceDate,
                                FitnessDate,
                                Remarks,
                                InsReminderDate,
                                FitReminderDate,
                                VehicleMstID: this.state.parentIDNumber,
                              },
                            ],
                          });
                        } else {
                          this.setState({
                            VehicleDetails: [
                              {
                                IDNumber: 0,
                                InsuranceDate,
                                FitnessDate,
                                Remarks,
                                InsReminderDate,
                                FitReminderDate,
                                VehicleMstID: this.state.parentIDNumber,
                              },
                            ],
                          });
                        }
                      }
                      // this.toggleModal();
                      this.setState({
                        InsuranceDate: null,
                        FitnessDate: null,
                        Remarks: "",
                        InsReminderDate: null,
                        FitReminderDate: null,
                        id: null,
                      });
                    }}
                    disabled={
                      !InsuranceDate ||
                      !FitnessDate ||
                      // !Remarks ||
                      !InsReminderDate ||
                      !FitReminderDate
                    }
                  >
                    <Plus size={14} />
                  </Button>
                </Col>

                <Col>
                  <Label>Insurance Date</Label>
                  <Flatpickr
                    value={this.state.InsuranceDate}
                    onChange={(date) => {
                      this.setState({ InsuranceDate: date });
                    }}
                    placeholder="Insurance Date"
                    className="form-control form-control-sm"
                  />
                </Col>

                <Col>
                  <Label>Fitness Date</Label>
                  <Flatpickr
                    value={this.state.FitnessDate}
                    onChange={(date) => {
                      this.setState({ FitnessDate: date });
                    }}
                    placeholder="Fitness Date"
                    className="form-control form-control-sm"
                  />
                </Col>

                <Col>
                  <Label>Insurance Reminder Date</Label>
                  <Flatpickr
                    value={this.state.InsReminderDate}
                    onChange={(date) => {
                      this.setState({ InsReminderDate: date });
                    }}
                    placeholder="Insurance Date"
                    className="form-control form-control-sm"
                  />
                </Col>

                <Col>
                  <Label>Fitness Reminder Date</Label>
                  <Flatpickr
                    value={this.state.FitReminderDate}
                    onChange={(date) => {
                      this.setState({ FitReminderDate: date });
                    }}
                    placeholder="Fitness Date"
                    className="form-control form-control-sm"
                  />
                </Col>

                <Col>
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
    vehicle: state.vehicle,
  };
};

export default connect(mapStateToProps, {
  getVehicle,
  getVehicleMetaData,
  addVehicle,
})(VehicleNewView);
