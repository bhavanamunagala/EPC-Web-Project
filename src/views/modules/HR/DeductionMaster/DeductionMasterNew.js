import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getDeductionMaster,
  addDeductionMaster,
  getDeductionMasterDropDown,
} from "../../../../redux/actions/HR/DeductionMaster";

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

class DeductionMasterNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
         response: [],
  
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getDeductionMasterDropDown(postData);
    this.props.getDeductionMaster(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.deductionMaster.error !== this.props.deductionMaster.error &&
      this.props.deductionMaster.error
    ) {
      toast.error(this.props.deductionMaster.error);
    }
    if (
      prevProps.deductionMaster.successMsg !== this.props.deductionMaster.successMsg &&
      this.props.deductionMaster.successMsg
    ) {
      toast.success(this.props.deductionMaster.successMsg);
    }

    if (prevProps.deductionMaster.data !== this.props.deductionMaster.data) {
      this.setState({
        response:
          this.props.deductionMaster.data && this.props.deductionMaster.data.length
            ? this.props.deductionMaster.data
            : [],
            random: this.props.deductionMaster.random,
      });
    }

    if (
      prevProps.deductionMaster.data !== this.props.deductionMaster.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;  
      const filterData =
        this.props.deductionMaster.data &&
        this.props.deductionMaster.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        parentIDNumber: filterData?.IDNumber,
        IndentNo: filterData?.IndentNo,
        DeductionCode: filterData?.DeductionCode,
        DeductionName: filterData?.DeductionName,
         });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

 
   refreshPage=(e)=> {
    window.location.reload(false);
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const {
      DeductionCode,
      DeductionName,
      itemData,
      IndentNo,
    } = this.state;

    if (
      DeductionCode &&
      DeductionName 
    
     
    ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
        DeductionCode,
        DeductionName,
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
        await this.props.addDeductionMaster({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addDeductionMaster(postData);
      }
      await this.resetState();
      await history.push("/HR/DeductionMaster");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };
  toggleModal = () =>
  this.setState({
    modal: !this.state.modal,
  });


  render() {
    const { btnFlg,  Reason } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Deduction  Master</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/HR/DeductionMaster")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col>
                  <Label>Deduction Code</Label>
                  <Input
                    // bsSize="sm"
                    type="text"
                    value={this.state.DeductionCode ? this.state.DeductionCode : ""}
                    onChange={(e) =>
                      this.setState({ DeductionCode: e.target.value })
                    }
                    name="DeductionCode"
                    id="DeductionCode"
                    placeholder="Deduction Code"
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.DeductionCode ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.DeductionCode && <ErrorText />}
                </Col>

                
                <Col>
                  <Label>Deduction Name</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.DeductionName
                        ? this.state.DeductionName
                        : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.DeductionName
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ DeductionName: e.target.value })
                    }
                    name="DeductionName"
                    id="DeductionName"
                    placeholder="Deduction Name"
                  />
                  {btnFlg && !this.state?.DeductionName && <ErrorText />}
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
                      onClick={this.refreshPage}
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
    deductionMaster: state.deductionMaster,
  };
};

export default connect(mapStateToProps, {
  getDeductionMaster,
  getDeductionMasterDropDown,
  addDeductionMaster,

})(DeductionMasterNew);
