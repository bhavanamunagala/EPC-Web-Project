import React from "react";
import { connect } from "react-redux";
import { Mail, Lock } from "react-feather";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap";
import {
  getLoginMetaData,
  loginWithJWT,
} from "../../../../redux/actions/auth/loginActions";
import "react-toastify/dist/ReactToastify.css";
import "../../../../assets/scss/pages/data-list.scss";

class LoginJWT extends React.Component {
  state = {
    UserID: "Admin",
    password: "Admin123",
    YearID: null,
  };

  componentDidMount() {
    this.props.getLoginMetaData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.auth.loginMetaData?.Years !==
      prevProps.auth.loginMetaData?.Years
    ) {
      let loginData = [];
      this.props.auth.loginMetaData.Years.forEach((item) => {
        loginData.push({ value: item.IDNUMBER, label: item.Year_Name });
      });

      this.setState({
        yearList:
          this.props.auth.loginMetaData.Years &&
          this.props.auth.loginMetaData.Years.length
            ? loginData
            : [],
        YearID: {
          value: loginData?.[0]?.value,
          label: loginData?.[0]?.label,
        },
      });
    }
  }

  handleLogin = (e) => {
    e.preventDefault();
    // YearID
    const { UserID, password,YearID } = this.state;
    this.props.loginWithJWT({
      UserID,
      password,
      YearID: YearID.value,
    });
    localStorage.setItem("yearId", YearID.value);
  };

  onYearChange = (data) => {
    this.setState({ YearID: { value: data.value, label: data.label } });
  };

  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                placeholder="User Name"
                value={this.state.UserID}
                onChange={(e) => this.setState({ UserID: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>Email</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Select
                className="React-Select"
                classNamePrefix="select"
                onChange={this.onYearChange}
                value={this.state.YearID}
                name="sort"
                options={this.state.yearList}
                placeholder="Select Year"
              />
              {/* <Label>Select Year</Label> */}
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              {/* <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={false}
                onChange={this.handleRemember}
              /> */}
              {/* <div className="float-right">
                <Link to="/pages/forgot-password">Forgot Password?</Link>
              </div> */}
            </FormGroup>
            <div className="d-flex justify-content-between">
              {/* <Button.Ripple
                color="primary"
                outline
                onClick={() => {
                  history.push("/pages/register")
                }}
              >
                Register
              </Button.Ripple> */}
              <Button.Ripple color="primary" type="submit">
                Login
              </Button.Ripple>
            </div>
          </Form>
          <ToastContainer />
        </CardBody>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
    auth: state.auth.login,
  };
};
export default connect(mapStateToProps, { loginWithJWT, getLoginMetaData })(
  LoginJWT
);
