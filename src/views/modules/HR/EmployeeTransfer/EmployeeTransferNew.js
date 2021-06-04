import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getEmployeeTransfer,
  addEmployeeTransfer,
  getEmployeeTransferDropDown,
} from "../../../../redux/actions/HR/EmployeeTransfer";

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

class EmployeeTransferNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      EmployeeList: [],
      EmployeeCodeList: [],
      ProjectList:[],
      file: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getEmployeeTransferDropDown(postData);
    this.props.getEmployeeTransfer(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.employeeTransfer.error !== this.props.employeeTransfer.error &&
      this.props.employeeTransfer.error
    ) {
      toast.error(this.props.employeeTransfer.error);
    }
    if (
      prevProps.employeeTransfer.successMsg !== this.props.employeeTransfer.successMsg &&
      this.props.employeeTransfer.successMsg
    ) {
      toast.success(this.props.employeeTransfer.successMsg);
    }

    if (prevProps.employeeTransfer.EmployeeList !== this.props.employeeTransfer.EmployeeList) {
      this.setState({
        EmployeeList:
          this.props.employeeTransfer.EmployeeList &&
          this.props.employeeTransfer.EmployeeList.length
            ? this.props.employeeTransfer.EmployeeList
            : [],
      });
    }
    if (
      prevProps.employeeTransfer.EmployeeCodeList !== this.props.employeeTransfer.EmployeeCodeList
    ) {
      this.setState({
        EmployeeCodeList:
          this.props.employeeTransfer.EmployeeCodeList &&
          this.props.employeeTransfer.EmployeeCodeList.length
            ? this.props.employeeTransfer.EmployeeCodeList
            : [],
      });
    }

    if (
      prevProps.employeeTransfer.ProjectList !== this.props.employeeTransfer.ProjectList
    ) {
      this.setState({
        ProjectList:
          this.props.employeeTransfer.ProjectList &&
          this.props.employeeTransfer.ProjectList.length
            ? this.props.employeeTransfer.ProjectList
            : [],
      });
    }

    if (
      prevProps.employeeTransfer.data !== this.props.employeeTransfer.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.employeeTransfer.data &&
        this.props.employeeTransfer.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        Date: filterData?.Date,
        EmployeeID: filterData?.EmployeeID,
        EmpCode: filterData?.EmpCode,
        EmpName: filterData?.EmpName,
        ProjectID: filterData?.ProjectID,
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
    const { Date, ProjectID, EmployeeID,EmpCode,EmpName,Remarks,file, itemData } =
      this.state;

    if (Date&& ProjectID&& EmployeeID&&EmpCode&&EmpName&&Remarks&&file&& itemData ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        Date:
          typeof Date === "object"
            ? moment(Date?.[0]).format("YYYY-MM-DDTHH:mm:ss")
            : itemData?.Date,
     
         
            
             ProjectID, 
             EmployeeID,
             EmpCode,
             EmpName,
             Remarks,
             file,
              itemData,
     
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
        await this.props.addEmployeeTransfer({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addEmployeeTransfer(postData);
      }
      await this.resetState();
      await history.push("/HR/EmployeeTransfer");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg, file, ProjectList, EmployeeList } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Employee Transfer</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/EmployeeTransfer")}
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
                  <Label>Select Employee</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="EmployeeIDSelect"
                    name="EmployeeIDSelect"
                    value={this.state?.EmployeeID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.EmployeeID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        EmployeeID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Select Employee</option>
                    {EmployeeList &&
                      EmployeeList?.length > 0 &&
                      EmployeeList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.EmpName}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.EmployeeID && <ErrorText />}
                </Col>

                <Col>
                  <Label>Employee Code</Label>
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="EmployeeIDSelect"
                    name="EmployeeIDSelect"
                    value={this.state?.EmployeeID}
                    className={`p-0 pl-1
                    ${
                      btnFlg && this.state?.EmployeeID === 0
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) => {
                      this.setState({
                        EmployeeID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Employee Code</option>
                    {EmployeeList &&
                      EmployeeList?.length > 0 &&
                      EmployeeList.map((d, i) => (
                        <option value={d.IDNumber} key={d.IDNumber}>
                          {d.EmpCode}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.EmployeeID && <ErrorText />}
                </Col>

              </FormGroup>

     
              <FormGroup row>
               
                <Col>
                  <Label>Current Project</Label>
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
                    <option value="0">Current Project</option>
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
                  <Label>New Project</Label>
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
                    <option value="0">New Project</option>
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

              </FormGroup>
            


              <FormGroup row>
              <Col>
                  <Label>Remarks</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.Remarks
                        ? this.state.Remarks
                        : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.Remarks
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ Remarks: e.target.value })
                    }
                    name="Remarks"
                    id="Remarks"
                    placeholder="Remarks"
                  />
                  {btnFlg && !this.state?.Remarks && <ErrorText />}
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
    employeeTransfer: state.employeeTransfer,
  };
};

export default connect(mapStateToProps, {
  getEmployeeTransfer,
  getEmployeeTransferDropDown,
  addEmployeeTransfer,
})(EmployeeTransferNew);
