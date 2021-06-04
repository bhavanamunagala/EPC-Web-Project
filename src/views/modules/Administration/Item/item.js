import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardHeader, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import "../../style.css";
import {
  getItem,
  deleteItem,
} from "../../../../redux/actions/Administration/item";
import { Card, CardBody } from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Button } from "reactstrap";

import { Edit, Trash, Plus } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import { hasRight } from "../../../../constant/commonDS";

class ItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      CountryID: "",
      deleteItem: null,
      SearchText: "",
      successMsg: "",
      deleteAlert: false,
      CountryName: "",
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getItem(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.item.error && props.item.error !== state.error) {
      toast.error(props.item.error);
      return {
        error: props.item.error,
      };
    }
    if (props.item && props.item.data) {
      let successMsg = "";
      if (
        Object.keys(props.item.data).every(
          (p) => props.item.data[p] !== state.response[p]
        )
      ) {
        if (props.item.random !== state.random && props.item.successMsg) {
          successMsg = props.item.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.item.data && props.item.data.length ? props.item.data : [],
          successMsg: successMsg,
          random: props.item.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.item.successMsg !== prevProps.item.successMsg) {
  //     toast.success(this.props.item.successMsg);
  //   }
  // }

  editRow = (row) => {
    this.setState({ CountryName: row.CountryName });
    this.setState({ CountryID: row.IDNumber });
  };

  onChange = (event) => {
    this.setState({ CountryName: event.target.value });
  };

  deleteRow = (row) => {
    this.setState({ deleteItem: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  resetState = () => {
    this.setState({ CountryName: "" });
  };

  deleteItem = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteItem.IDNumber,
      ItemName: this.state.deleteItem.ItemName,
    };
    this.props.deleteItem(postData);
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getItem(postData);
  };

  render() {
    let Access = hasRight("ITEM");
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
                      history.push({
                        pathname: `/Administrator/ItemMaster/edit/${rowData.IDNumber}`,
                        state: {
                          id: rowData.IDNumber,
                        },
                      });
                      return this.editRow(rowData);
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
          name: "Item Code",
          selector: "ItemCode",
          sortable: true,
        },
        {
          name: "Item Name",
          selector: "ItemName",
          sortable: true,
        },
        {
          name: "HSN Code",
          selector: "HSNCode",
          sortable: true,
        },
        {
          name: "Group Name",
          selector: "GroupName",
          sortable: true,
        },
        {
          name: "Unit Name",
          selector: "UnitName",
          sortable: true,
        },
        {
          name: "Base Unit",
          selector: "BaseUnitName",
          sortable: true,
        },

        {
          name: "Max Level",
          selector: "MaxLevel",
          sortable: true,
        },
        {
          name: "Min Level",
          selector: "MinLevel",
          sortable: true,
        },
        {
          name: "ISActive",
          selector: "ISActive",
          sortable: true,
          cell: (rowData) => (rowData.ISActive === 1 ? "Yes" : "No"),
        },
        {
          name: "ISBaseUpper Unit",
          selector: "ISBaseUpperUnit",
          sortable: true,
          cell: (rowData) => (rowData.ISBaseUpperUnit === 1 ? "Yes" : "No"),
        },
        {
          name: "ISTranUpper Unit",
          selector: "ISTranUpperUnit",
          sortable: true,
          cell: (rowData) => (rowData.ISTranUpperUnit === 1 ? "Yes" : "No"),
        },
        {
          name: "Conv. Factor",
          selector: "ConvFactor",
          sortable: true,
          cell: (rowData) => (rowData.ConvFactor === 1 ? "Yes" : "No"),
        },
      ];
    } else {
      columns = [
        {
          name: "Item Code",
          selector: "ItemCode",
          sortable: true,
        },
        {
          name: "Item Name",
          selector: "ItemName",
          sortable: true,
        },
        {
          name: "HSN Code",
          selector: "HSNCode",
          sortable: true,
        },
        {
          name: "Group Name",
          selector: "GroupName",
          sortable: true,
        },
        {
          name: "Unit Name",
          selector: "UnitName",
          sortable: true,
        },
        {
          name: "Max Level",
          selector: "MaxLevel",
          sortable: true,
        },
        {
          name: "Min Level",
          selector: "MinLevel",
          sortable: true,
        },
        {
          name: "ISActive",
          selector: "ISActive",
          sortable: true,
          cell: (rowData) => (rowData.ISActive === 1 ? "Yes" : "No"),
        },
        {
          name: "ISBaseUpper Unit",
          selector: "ISBaseUpperUnit",
          sortable: true,
          cell: (rowData) => (rowData.ISBaseUpperUnit === 1 ? "Yes" : "No"),
        },
        {
          name: "ISTranUpper Unit",
          selector: "ISTranUpperUnit",
          sortable: true,
          cell: (rowData) => (rowData.ISTranUpperUnit === 1 ? "Yes" : "No"),
        },
        {
          name: "Conv. Factor",
          selector: "ConvFactor",
          sortable: true,
          cell: (rowData) => (rowData.ConvFactor === 1 ? "Yes" : "No"),
        },
      ];
    }

    const { response, SearchText } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Item Master</CardTitle>
            <div className="d-flex align-items-center">
              <CustomHeader value={SearchText} handleFilter={this.searchData} />
              {Access.AllowInsert ? (
                <Button
                  className="ml-1"
                  size="sm"
                  color="primary"
                  onClick={() => history.push("/Administrator/ItemMaster/new")}
                >
                  <Plus size={20} className="text-white" />
                </Button>
              ) : (
                ""
              )}
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
              onConfirm={() => this.deleteItem()}
              onCancel={() => this.handleAlert("deleteAlert", false)}
            >
              <p className="sweet-alert-text">
                Are you sure you want to delete this Item
              </p>
            </SweetAlert>
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
  deleteItem,
})(ItemView);
