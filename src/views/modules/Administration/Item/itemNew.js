import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import "../../style.css";
import {
  getItem,
  addItem,
  getItemGroupData,
} from "../../../../redux/actions/Administration/item";
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

import ErrorText from "../../../../views/ui-elements/text-utilities/ErrorText";
import { Eye } from "react-feather";

class ItemNewView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      CountryID: "",
      successMsg: "",
      deleteAlert: false,
      CountryName: "",
      ItemCode: "",
      ItemName: "",
      GroupID: "",
      HSNCode: "",
      BaseunitID: "",
      ConvFactor: "",
      TransUnt: "",
      MinLevel: "",
      MaxLevel: "",
      ISBaseUpperUnit: false,
      ISTranUpperUnit: false,
      itemData: null,
      ItemGroupList: [],
      ItemUnitList: [],
      btnFlg: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getItem(postData);
    this.props.getItemGroupData({
      IDNumber: history?.location?.state?.id,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.item.error !== this.props.item.error &&
      this.props.item.error
    ) {
      toast.error(this.props.item.error);
    }
    if (
      prevProps.item.successMsg !== this.props.item.successMsg &&
      this.props.item.successMsg
    ) {
      toast.success(this.props.item.successMsg);
    }
    if (prevProps.item.data !== this.props.item.data) {
      this.setState({
        response:
          this.props.item.data && this.props.item.data.length
            ? this.props.item.data
            : [],
        random: this.props.item.random,
      });
    }
    if (
      prevProps.item.ItemGroupList !== this.props.item.ItemGroupList &&
      this.props.item.ItemGroupList.ItemGroups
    ) {
      let ItemData = [];
      this.props.item.ItemGroupList.ItemGroups &&
        this.props.item.ItemGroupList.ItemGroups.forEach((item) => {
          ItemData.push({ value: item.IDNumber, label: item.GroupName });
        });
      let UnitData = [];
      this.props.item.ItemGroupList.Units &&
        this.props.item.ItemGroupList.Units.forEach((item) => {
          UnitData.push({ value: item.IDNumber, label: item.UnitName });
        });
      this.setState({
        ItemGroupList:
          this.props.item.ItemGroupList &&
          this.props.item.ItemGroupList.ItemGroups &&
          this.props.item.ItemGroupList.ItemGroups.length
            ? ItemData
            : [],
        ItemUnitList:
          this.props.item.ItemGroupList &&
          this.props.item.ItemGroupList.Units &&
          this.props.item.ItemGroupList.Units.length
            ? UnitData
            : [],
      });
    }
    if (
      prevProps.item.data !== this.props.item.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;
      const filterData =
        this.props.item.data &&
        this.props.item.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      // const GroupID =
      //   this.state.ItemGroupList &&
      //   this.state.ItemGroupList.filter((data) => {
      //     return data.value === filterData?.GroupID;
      //   })?.[0];
      // const BaseunitID =
      //   this.state.ItemUnitList &&
      //   this.state.ItemUnitList.filter((data) => {
      //     return data.value === filterData?.BaseunitID;
      //   })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        ItemCode: filterData?.ItemCode,
        ItemName: filterData?.ItemName,
        GroupID: filterData?.GroupID,
        HSNCode: filterData?.HSNCode,
        BaseunitID: filterData?.BaseunitID,
        ConvFactor: filterData?.ConvFactor,
        TransUnt: filterData?.UnitID,
        MinLevel: filterData?.MinLevel,
        MaxLevel: filterData?.MaxLevel,
        ISBaseUpperUnit: filterData?.ISBaseUpperUnit,
        ISTranUpperUnit: filterData?.ISTranUpperUnit,
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
      ItemCode,
      ItemName,
      GroupID,
      HSNCode,
      BaseunitID,
      ConvFactor,
      TransUnt,
      MinLevel,
      MaxLevel,
      ISBaseUpperUnit,
      ISTranUpperUnit,
      itemData,
    } = this.state;
    if (ItemCode && ItemName && GroupID && HSNCode && BaseunitID) {
      let postData = {
        ItemCode,
        ItemName,
        GroupID: GroupID,
        UnitID: TransUnt,
        HSNCode,

        // ISActive: 1,
        BaseunitID: BaseunitID,
        ConvFactor,
        ISBaseUpperUnit: ISBaseUpperUnit ? 1 : 0,
        ISTranUpperUnit: ISTranUpperUnit ? 1 : 0,
        TransUnt: TransUnt,
        MinLevel,
        MaxLevel,
        CreatedDate: moment(),
      };
      if (history?.location?.state?.id) {
        await this.props.addItem({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addItem(postData);
        await this.resetState();
      }
      await history.push("/Administrator/ItemMaster");
    }
  };

  resetState = () => {
    this.setState({
      CountryName: "",
      ItemCode: "",
      ItemName: "",
      GroupID: "",
      HSNCode: "",
      BaseunitID: "",
      ConvFactor: "",
      TransUnt: "",
      MinLevel: "",
      MaxLevel: "",
      ISBaseUpperUnit: false,
      ISTranUpperUnit: false,
      btnFlg: false,
    });
  };

  render() {
    const { btnFlg } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Item Master</CardTitle>
            <Button
              size="sm"
              color="primary"
              onClick={() => history.push("/Administrator/ItemMaster")}
            >
              <Eye size={20} className="text-white" />
            </Button>
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Col>
                  <Label>Item Code</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.ItemCode}
                    onChange={(e) => this.onChange(e, "ItemCode")}
                    name="name"
                    id="name"
                    placeholder="Item Code"
                    className={
                      btnFlg &&
                      (!this.state.ItemCode || this.state.ItemCode === "") &&
                      "invalid-input"
                    }
                  />
                  {btnFlg &&
                    (!this.state.ItemCode || this.state.ItemCode === "") && (
                      <ErrorText />
                    )}
                </Col>

                <Col>
                  <Label>Item Name</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.ItemName}
                    onChange={(e) => this.onChange(e, "ItemName")}
                    name="ItemName"
                    id="ItemName"
                    placeholder="Item Name"
                    className={
                      btnFlg &&
                      (!this.state.ItemName || this.state.ItemName === "") &&
                      "invalid-input"
                    }
                  />
                  {btnFlg &&
                    (!this.state.ItemName || this.state.ItemName === "") && (
                      <ErrorText />
                    )}
                </Col>

                <Col
                  className={
                    btnFlg && !this.state?.GroupID ? "invalid-input" : ""
                  }
                >
                  <Label>Item Group</Label>
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ GroupID: e })}
                    value={this.state.GroupID}
                    name="sort"
                    options={this.state.ItemGroupList}
                    placeholder="Item Group"
                  /> */}
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="GroupIDSelect"
                    name="GroupIDSelect"
                    value={this.state?.GroupID}
                    className="p-0 pl-1"
                    onChange={(e) => {
                      this.setState({
                        GroupID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Item Group</option>
                    {this.state.ItemGroupList &&
                      this.state.ItemGroupList?.length > 0 &&
                      this.state.ItemGroupList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.GroupID && <ErrorText />}
                </Col>

                <Col>
                  <Label>HSN Code</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.HSNCode}
                    onChange={(e) => this.onChange(e, "HSNCode")}
                    name="name"
                    id="name"
                    placeholder="HSNCode"
                    className={
                      btnFlg &&
                      (!this.state.HSNCode || this.state.HSNCode === "") &&
                      "invalid-input"
                    }
                  />
                  {btnFlg &&
                    (!this.state.HSNCode || this.state.HSNCode === "") && (
                      <ErrorText />
                    )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col
                  className={
                    btnFlg && !this.state?.BaseunitID && "invalid-input"
                  }
                >
                  <Label>Base Unit</Label>
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ BaseunitID: e })}
                    value={this.state.BaseunitID}
                    name="sort"
                    options={this.state.ItemUnitList}
                    placeholder="Base Unit"
                  /> */}
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="BaseunitIDSelect"
                    name="BaseunitIDSelect"
                    value={this.state?.BaseunitID}
                    className="p-0 pl-1"
                    onChange={(e) => {
                      this.setState({
                        BaseunitID: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Base Unit</option>
                    {this.state.ItemUnitList &&
                      this.state.ItemUnitList?.length > 0 &&
                      this.state.ItemUnitList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                  {btnFlg && !this.state?.BaseunitID && <ErrorText />}
                </Col>

                <Col>
                  <Label>Trans Unit</Label>
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    onChange={(e) => this.setState({ TransUnt: e })}
                    value={this.state.TransUnt}
                    name="sort"
                    options={this.state.ItemUnitList}
                    placeholder="Trans Unit"
                  /> */}
                  <CustomInput
                    bsSize="sm"
                    type="select"
                    id="TransUntSelect"
                    name="TransUntSelect"
                    value={this.state?.TransUnt}
                    className="p-0 pl-1"
                    onChange={(e) => {
                      this.setState({
                        TransUnt: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="0">Trans Unit</option>
                    {this.state.ItemUnitList &&
                      this.state.ItemUnitList?.length > 0 &&
                      this.state.ItemUnitList.map((d, i) => (
                        <option value={d.value} key={d.value}>
                          {d.label}
                        </option>
                      ))}
                  </CustomInput>
                </Col>

                <Col>
                  <Label>Conv Factor</Label>
                  <Input
                    bsSize="sm"
                    type="number"
                    value={this.state.ConvFactor}
                    onChange={(e) => this.onChange(e, "ConvFactor")}
                    name="ConvFactor"
                    id="ConvFactor"
                    placeholder="Conv Factor"
                  />
                </Col>

                {/* <Col>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        size="sm"
                        type="checkbox"
                        className="mr-1 mt-1"
                        onChange={(e) =>
                          this.setState({
                            ISBaseUpperUnit: e.target.checked,
                          })
                        }
                        checked={this.state.ISBaseUpperUnit}
                      />
                      Is base unit
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        size="sm"
                        type="checkbox"
                        className="mr-1 mt-1"
                        onChange={(e) =>
                          this.setState({
                            ISTranUpperUnit: e.target.checked,
                          })
                        }
                        checked={this.state.ISTranUpperUnit}
                      />
                      Is trans unit
                    </Label>
                  </FormGroup>
                </Col> */}
                <Col>
                  <Label></Label>
                  <FormGroup row>
                    <FormGroup check inline>
                      <Input
                        size="sm"
                        type="checkbox"
                        onChange={(e) =>
                          this.setState({
                            ISBaseUpperUnit: e.target.checked,
                          })
                        }
                        checked={this.state.ISBaseUpperUnit}
                      />
                      <Label className="mb-0"> Is base unit</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        size="sm"
                        type="checkbox"
                        onChange={(e) =>
                          this.setState({
                            ISTranUpperUnit: e.target.checked,
                          })
                        }
                        checked={this.state.ISTranUpperUnit}
                      />
                      <Label className="mb-0"> Is trans unit</Label>
                    </FormGroup>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label>Min Level</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.MinLevel}
                    onChange={(e) => this.onChange(e, "MinLevel")}
                    name="MinLevel"
                    id="MinLevel"
                    placeholder="Min Level"
                  />
                </Col>

                <Col>
                  <Label>Max Level</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    value={this.state.MaxLevel}
                    onChange={(e) => this.onChange(e, "MaxLevel")}
                    name="MaxLevel"
                    id="MaxLevel"
                    placeholder="Max Level"
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
    item: state.item,
  };
};

export default connect(mapStateToProps, {
  getItem,
  getItemGroupData,
  addItem,
})(ItemNewView);
