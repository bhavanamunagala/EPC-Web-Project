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
  getWorkOrder,
  deleteWorkOrder,
} from "../../../../redux/actions/Contractor/WorkOrder";
import { hasRight } from "../../../../constant/commonDS";

class WorkOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrderList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getWorkOrder(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.workOrder.error &&
      nextProps.workOrder.error !== state.error
    ) {
      toast.error(nextProps.workOrder.error);
      return {
        error: nextProps.workOrder.error,
      };
    }
    if (nextProps.workOrder && nextProps.workOrder.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.workOrder.data).every(
          (p) => nextProps.workOrder.data[p] !== state.workOrderList[p]
        )
      ) {
        if (
          nextProps.workOrder.random !== state.random &&
          nextProps.workOrder.successMsg
        ) {
          successMsg = nextProps.workOrder.successMsg;
          toast.success(successMsg);
        }
        return {
          workOrderList:
            nextProps.workOrder.data && nextProps.workOrder.data.length
              ? nextProps.workOrder.data
              : [],
          successMsg: successMsg,
          random: nextProps.workOrder.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  deleteRow = (row) => {
    this.setState({ deleteItem: row });
    this.setState({ deleteAlert: true });
  };
  deleteItem = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteItem.IDNumber,
      WoNo: this.state.deleteItem.WoNo,
    };
    this.props.deleteWorkOrder(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getWorkOrder(postData);
  };

  render() {
    let Access = hasRight("CON_WO");
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
                        pathname: `/Contractor/WorkOrder/edit/${rowData.IDNumber}`,
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
          name: "WorkOrderNo",
          selector: "WoNo",
          sortable: true,
          width: "8%",
        },
        {
          name: "Date",
          selector: "Date",
          sortable: true,
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
        },
        {
          name: "Contractor Name",
          selector: "ContractorName",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Item Name",
          selector: "ItemName",
          sortable: true,
        },
        {
          name: "Unit Name",
          selector: "UnitName",
          sortable: true,
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
          name: "Amount",
          selector: "Amount",
          sortable: true,
        },
        {
          name: "Machinery IsBillable",
          selector: "MachineryIsBillable",
          sortable: true,
          cell: (rowData) => (rowData.MachineryIsBillable ? "Yes" : "No"),
        },
        {
          name: "Diesel For Machinery",
          selector: "DieselForMachinery",
          sortable: true,
          cell: (rowData) => (rowData.DieselForMachinery ? "Yes" : "No"),
        },
        {
          name: "Inventory Item",
          selector: "InventoryItem",
          sortable: true,
          cell: (rowData) => (rowData.InventoryItem ? "Yes" : "No"),
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
          name: "WorkOrderNo",
          selector: "WoNo",
          sortable: true,
          width: "11%",
        },
        {
          name: "Date",
          selector: "Date",
          sortable: true,
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
        },
        {
          name: "Contractor Name",
          selector: "ContractorName",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Item Name",
          selector: "ItemName",
          sortable: true,
        },
        {
          name: "Unit Name",
          selector: "UnitName",
          sortable: true,
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
          name: "Amount",
          selector: "Amount",
          sortable: true,
        },
        {
          name: "Machinery IsBillable",
          selector: "MachineryIsBillable",
          sortable: true,
          cell: (rowData) => (rowData.MachineryIsBillable ? "Yes" : "No"),
        },
        {
          name: "Diesel For Machinery",
          selector: "DieselForMachinery",
          sortable: true,
          cell: (rowData) => (rowData.DieselForMachinery ? "Yes" : "No"),
        },
        {
          name: "Inventory Item",
          selector: "InventoryItem",
          sortable: true,
          cell: (rowData) => (rowData.InventoryItem ? "Yes" : "No"),
        },
        {
          name: "Remarks",
          selector: "Remarks",
          sortable: true,
        },
      ];
    }

    const { workOrderList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Work Order</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Contractor/WorkOrder/new")}
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
            data={workOrderList}
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
    workOrder: state.workOrder,
  };
};

export default connect(mapStateToProps, {
  getWorkOrder,
  deleteWorkOrder,
})(WorkOrder);
