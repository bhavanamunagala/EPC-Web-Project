import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getLocation,
  addLocation,
  deleteLocation,
} from "../../../../redux/actions/Administration/location";
import { getProject } from "../../../../redux/actions/Administration/project";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Label,
  Button,
  Input,
  CardHeader,
  CardTitle,
  CustomInput,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Edit, Trash } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";

import ErrorText from "../../../ui-elements/text-utilities/ErrorText";
import { CustomHeader } from "../../../components/CustomHeader";
import DataTable from "react-data-table-component";
import { hasRight } from "../../../../constant/commonDS";

class LocationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      deleteLocation: null,
      SearchText: "",
      successMsg: "",
      deleteAlert: false,
      ProjectID: null,
      Code: "",
      LocationName: "",
      CreatedDate: null,
      selectedRow: null,
      btnFlg: false,
      projectList: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getLocation(postData);
    this.props.getProject(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.location.error && props.location.error !== state.error) {
      toast.error(props.location.error);
      return {
        error: props.location.error,
      };
    }
    if (props.location && props.location.data) {
      let successMsg = "";
      if (
        Object.keys(props.location.data).every(
          (p) => props.location.data[p] !== state.response[p]
        )
      ) {
        if (
          props.location.random !== state.random &&
          props.location.successMsg
        ) {
          successMsg = props.location.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.location.data && props.location.data.length
              ? props.location.data
              : [],
          successMsg: successMsg,
          random: props.location.random,
        };
      }
    }

    if (props.project.projectList && props.project.projectList) {
      if (
        Object.keys(props.project.projectList).every(
          (p) => props.project.projectList[p] !== state.projectList[p]
        )
      ) {
        let projectData = [];
        props.project.projectList.forEach((item) => {
          projectData.push({ value: item.IDNumber, label: item.ProjectName });
        });

        return {
          projectList:
            props.project.projectList && props.project.projectList.length
              ? projectData
              : [],
        };
      }
    }

    // Return null if the state hasn't changed
    return null;
  }

  editRow = (row) => {
    this.setState({
      selectedRow: row,
      ProjectID: row.ProjectID,
      Code: row.Code,
      LocationName: row.LocationName,
      StateID: row.IDNumber,
      CreatedDate: row.CreatedDate,
    });
  };

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    if (this.state.ProjectID && this.state.Code && this.state.LocationName) {
      const postData = {
        IDNumber: this.state.StateID ? this.state.StateID : 0,
        ProjectID: this.state.ProjectID,
        Code: this.state.Code,
        LocationName: this.state.LocationName,
        CreatedDate: this.state.CreatedDate ? this.state.CreatedDate : moment(),
      };
      this.props.addLocation(postData);
      this.resetState();
    }
  };
  deleteRow = (row) => {
    this.setState({ deleteLocation: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  resetState = () => {
    this.setState({
      ProjectID: 0,
      Code: "",
      LocationName: "",
      btnFlg: false,
    });
  };

  deleteLocation = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteLocation.IDNumber,
      LocationName: this.state.deleteLocation.LocationName,
    };
    this.props.deleteLocation(postData);
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getLocation(postData);
  };

  render() {
    let Access = hasRight("LOC");
    let columns;
    if (Access.AllowUpdate || Access.AllowDelete) {
      columns = [
        {
          name: "Actions",
          selector: "actions",
          width: "7%",
          cell: (rowData) =>
            rowData && (
              <>
                {Access.AllowUpdate ? (
                  <Edit
                    className="cursor-pointer mr-1 text-warning"
                    size={20}
                    onClick={() => {
                      this.editRow(rowData);
                    }}
                  />
                ) : (
                  ""
                )}
                {Access.AllowDelete ? (
                  <Trash
                    className="cursor-pointer text-danger"
                    size={20}
                    onClick={() => {
                      this.deleteRow(rowData);
                    }}
                  />
                ) : (
                  ""
                )}
              </>
            ),
        },
        {
          name: "Code",
          selector: "Code",
          sortable: true,
          width: "8%",
        },
        {
          name: "Location Name",
          selector: "LocationName",
          sortable: true,
          width: "10%",
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
          width: "10%",
        },
      ];
    } else {
      columns = [
        {
          name: "Code",
          selector: "Code",
          sortable: true,
          width: "8%",
        },
        {
          name: "Location Name",
          selector: "LocationName",
          sortable: true,
          width: "10%",
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
          width: "10%",
        },
      ];
    }
    const { btnFlg, response, SearchText } = this.state;
    return (
      <React.Fragment>
        {Access.AllowInsert || Access.AllowUpdate ? (
          <Card>
            <CardHeader>
              <CardTitle>Location Master</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
              <Form className="country">
                <FormGroup row className="align-items-center">
                  <Col sm="2">
                    <Label>Code</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.Code}
                      onChange={(e) => this.onChange(e, "Code")}
                      name="name"
                      id="name"
                      placeholder="Code"
                      className={
                        btnFlg && (!this.state.Code || this.state.Code === "")
                          ? "invalid-input"
                          : ""
                      }
                    />
                    {btnFlg && (!this.state.Code || this.state.Code === "") && (
                      <ErrorText />
                    )}
                  </Col>

                  <Col sm="2">
                    <Label>Location Name</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      value={this.state.LocationName}
                      onChange={(e) => this.onChange(e, "LocationName")}
                      name="name"
                      id="name"
                      placeholder="Location Name"
                      className={
                        btnFlg &&
                        (!this.state.LocationName ||
                          this.state.LocationName === "")
                          ? "invalid-input"
                          : ""
                      }
                    />
                    {btnFlg &&
                      (!this.state.LocationName ||
                        this.state.LocationName === "") && <ErrorText />}
                  </Col>

                  <Col sm="2">
                    <Label>Project</Label>

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
                    {btnFlg &&
                      (!this.state.ProjectID ||
                        this.state.ProjectID === "") && <ErrorText />}
                  </Col>

                  <Col className="mt-1_8">
                    <Button.Ripple
                      size="sm"
                      color="primary"
                      type="submit"
                      className="mr-1 ml-6"
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
                      Cancel
                    </Button.Ripple>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        ) : (
          ""
        )}
        {Access.AllowView ? (
          <Card>
            <CardHeader>
              {Access.AllowInsert || Access.AllowUpdate ? (
                <CardTitle></CardTitle>
              ) : (
                <CardTitle>Location Master</CardTitle>
              )}
              <div className="d-flex align-items-center">
                <CustomHeader
                  value={SearchText}
                  handleFilter={this.searchData}
                />
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <DataTable
                // data={SearchText.length ? filteredData : response}
                data={response}
                columns={columns}
                noHeader
                pagination
                paginationComponentOptions={{
                  rowsPerPageText: "Records per page:",
                  rangeSeparatorText: "of",
                  noRowsPerPage: false,
                  selectAllRowsItem: false,
                  selectAllRowsItemText: "All",
                }}
              />
              <ToastContainer />
              <SweetAlert
                title="Delete Item"
                show={this.state.deleteAlert}
                showCancel
                reverseButtons
                onConfirm={() => this.deleteLocation()}
                onCancel={() => this.handleAlert("deleteAlert", false)}
              >
                <p className="sweet-alert-text">
                  Are you sure you want to delete this Item
                </p>
              </SweetAlert>
            </CardBody>
          </Card>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project,
    location: state.location,
  };
};

export default connect(mapStateToProps, {
  getLocation,
  addLocation,
  deleteLocation,
  getProject,
})(LocationView);
