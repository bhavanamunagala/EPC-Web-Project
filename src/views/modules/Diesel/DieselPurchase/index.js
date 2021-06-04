import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Edit, Trash, Plus } from "react-feather";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import "../../style.css";
import {
  getDieselPurchase,
  deleteDieselPurchase,
} from "../../../../redux/actions/Diesel/DieselPurchase";
import { hasRight } from "../../../../constant/commonDS";

class DieselPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dieselPurchaseList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getDieselPurchase(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.dieselPurchase.error &&
      nextProps.dieselPurchase.error !== state.error
    ) {
      toast.error(nextProps.dieselPurchase.error);
      return {
        error: nextProps.dieselPurchase.error,
      };
    }
    if (nextProps.dieselPurchase && nextProps.dieselPurchase.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.dieselPurchase.data).every(
          (p) =>
            nextProps.dieselPurchase.data[p] !== state.dieselPurchaseList[p]
        )
      ) {
        if (
          nextProps.dieselPurchase.random !== state.random &&
          nextProps.dieselPurchase.successMsg
        ) {
          successMsg = nextProps.dieselPurchase.successMsg;
          toast.success(successMsg);
        }
        return {
          dieselPurchaseList:
            nextProps.dieselPurchase.data &&
            nextProps.dieselPurchase.data.length
              ? nextProps.dieselPurchase.data
              : [],
          successMsg: successMsg,
          random: nextProps.dieselPurchase.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.dieselPurchase.successMsg !==
      prevProps.dieselPurchase.successMsg
    ) {
      toast.success(this.props.dieselPurchase.successMsg);
    }
  }

  deleteRow = (row) => {
    this.setState({ deleteItem: row });
    this.setState({ deleteAlert: true });
  };
  deleteItem = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteItem.IDNumber,
      DieselPurchaseNo: this.state.deleteItem.DieselPurchaseNo,
    };
    this.props.deleteDieselPurchase(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getDieselPurchase(postData);
  };

  render() {
    let Access = hasRight("PUR_DSL");
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
                    onClick={() =>
                      history.push({
                        pathname: `/Diesel/DieselPurchase/edit/${rowData.IDNumber}`,
                        state: {
                          id: rowData.IDNumber,
                        },
                      })
                    }
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
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
          width: "11%",
        },
        {
          name: "SupplierName",
          selector: "SupplierName",
          sortable: true,
        },
        {
          name: "Vehicle No",
          selector: "VehicleNo",
          sortable: true,
        },
        {
          name: "OnDate",
          selector: "OnDate",
          sortable: true,
          cell: (rowData) => moment(rowData.OnDate).format("DD-MM-YYYY"),
        },
        {
          name: "Quantity",
          selector: "Qty",
          sortable: true,
        },
        {
          name: "Rate",
          selector: "Rate",
          sortable: true,
        },
        {
          name: "Days",
          selector: "Days",
          sortable: true,
        },
        {
          name: "DetailsOfUsed",
          selector: "DetailsOfUsed",
          sortable: true,
        },

        {
          name: "IsBillable",
          selector: "IsBillable",
          sortable: true,
          cell: (rowData) => (rowData.IsBillable ? "Yes" : "No"),
        },
        {
          name: "Remarks",
          selector: "Remarks",
          sortable: true,
        },
      ];
    } else {
      columns = [
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
          width: "11%",
        },
        {
          name: "SupplierName",
          selector: "SupplierName",
          sortable: true,
        },
        {
          name: "Vehicle No",
          selector: "VehicleNo",
          sortable: true,
        },
        {
          name: "OnDate",
          selector: "OnDate",
          sortable: true,
          cell: (rowData) => moment(rowData.OnDate).format("DD-MM-YYYY"),
        },
        {
          name: "Quantity",
          selector: "Qty",
          sortable: true,
        },
        {
          name: "Rate",
          selector: "Rate",
          sortable: true,
        },
        {
          name: "Days",
          selector: "Days",
          sortable: true,
        },
        {
          name: "DetailsOfUsed",
          selector: "DetailsOfUsed",
          sortable: true,
        },

        {
          name: "IsBillable",
          selector: "IsBillable",
          sortable: true,
          cell: (rowData) => (rowData.IsBillable ? "Yes" : "No"),
        },
        {
          name: "Remarks",
          selector: "Remarks",
          sortable: true,
        },
      ];
    }

    const { dieselPurchaseList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Diesel Purchase </CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Diesel/DieselPurchase/new")}
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
            data={dieselPurchaseList}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dieselPurchase: state.dieselPurchase,
  };
};

export default connect(mapStateToProps, {
  getDieselPurchase,
  deleteDieselPurchase,
})(DieselPurchase);
