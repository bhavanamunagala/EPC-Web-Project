import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
} from "reactstrap";
import { Edit, Trash, Plus, Printer } from "react-feather";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import "../../style.css";
import {
  getPurchaseOrder,
  deletePurchaseOrder,
} from "../../../../redux/actions/Purchase/PurchaseOrder";
import { hasRight } from "../../../../constant/commonDS";

class PurchaseOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrderList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getPurchaseOrder(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.purchaseOrder.error &&
      nextProps.purchaseOrder.error !== state.error
    ) {
      toast.error(nextProps.purchaseOrder.error);
      return {
        error: nextProps.purchaseOrder.error,
      };
    }
    if (nextProps.purchaseOrder && nextProps.purchaseOrder.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.purchaseOrder.data).every(
          (p) => nextProps.purchaseOrder.data[p] !== state.purchaseOrderList[p]
        )
      ) {
        if (
          nextProps.purchaseOrder.random !== state.random &&
          nextProps.purchaseOrder.successMsg
        ) {
          successMsg = nextProps.purchaseOrder.successMsg;
          toast.success(successMsg);
        }
        return {
          purchaseOrderList:
            nextProps.purchaseOrder.data && nextProps.purchaseOrder.data.length
              ? nextProps.purchaseOrder.data
              : [],
          successMsg: successMsg,
          random: nextProps.purchaseOrder.random,
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
      PONo: this.state.deleteItem.PONo,
    };
    this.props.deletePurchaseOrder(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getPurchaseOrder(postData);
  };

  render() {
    let Access = hasRight("PUR_ORD");
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
                        pathname: `/Purchase/PurchaseOrder/edit/${rowData.IDNumber}`,
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
          name: "PO No",
          selector: "PONo",
          sortable: true,
          width: "11%",
        },
        {
          name: "PO Status",
          selector: "POStatus",
          sortable: true,
        },
        {
          name: "PO Date",
          selector: "PODate",
          sortable: true,
          cell: (rowData) => moment(rowData.PODate).format("DD-MM-YYYY"),
        },
        {
          name: "Item Total",
          selector: "ItemTotal",
          sortable: true,
        },
        // {
        //   name: "Item Total Base",
        //   selector: "ItemTotalBase",
        //   sortable: true,
        // },
        {
          name: "Tax Total",
          selector: "TaxTotal",
          sortable: true,
        },
        // {
        //   name: "Tax Total Base",
        //   selector: "TaxTotalBase",
        //   sortable: true,
        // },
        {
          name: "Expense Total",
          selector: "ExpenseTotal",
          sortable: true,
        },
        // {
        //   name: "Expense Total Base",
        //   selector: "ExpenseTotalBase",
        //   sortable: true,
        // },
        {
          name: "Net Total",
          selector: "NetTotal",
          sortable: true,
        },
        // {
        //   name: "Net Total Base",
        //   selector: "NetTotalBase",
        //   sortable: true,
        // },
        {
          name: "Rate Approved",
          selector: "RateApproved",
          sortable: true,
          cell: (rowData) => (rowData.RateApproved ? "Yes" : "No"),
        },
        {
          name: "Payment Approved",
          selector: "PaymentApproved",
          sortable: true,
          cell: (rowData) => (rowData.PaymentApproved ? "Yes" : "No"),
        },
        {
          name: "Quality Approved",
          selector: "QualityApproved",
          sortable: true,
          cell: (rowData) => (rowData.QualityApproved ? "Yes" : "No"),
        },
        {
          name: "Print",
          selector: "Print",
          sortable: true,
          cell: (rowData) =>
            rowData && (
              <Printer
                className="cursor-pointer mr-1 text-primary"
                size={20}
                onClick={() =>
                  history.push({
                    pathname: `/Purchase/PurchaseOrder/PrintPO`,
                    state: {
                      id: rowData.IDNumber,
                      data: rowData,
                    },
                  })
                }
              />
            ),
        },
      ];
    } else {
      columns = [
        {
          name: "PO No",
          selector: "PONo",
          sortable: true,
          width: "11%",
        },
        {
          name: "PO Status",
          selector: "POStatus",
          sortable: true,
        },
        {
          name: "PO Date",
          selector: "PODate",
          sortable: true,
          cell: (rowData) => moment(rowData.PODate).format("DD-MM-YYYY"),
        },
        {
          name: "Item Total",
          selector: "ItemTotal",
          sortable: true,
        },
        // {
        //   name: "Item Total Base",
        //   selector: "ItemTotalBase",
        //   sortable: true,
        // },
        {
          name: "Tax Total",
          selector: "TaxTotal",
          sortable: true,
        },
        // {
        //   name: "Tax Total Base",
        //   selector: "TaxTotalBase",
        //   sortable: true,
        // },
        {
          name: "Expense Total",
          selector: "ExpenseTotal",
          sortable: true,
        },
        // {
        //   name: "Expense Total Base",
        //   selector: "ExpenseTotalBase",
        //   sortable: true,
        // },
        {
          name: "Net Total",
          selector: "NetTotal",
          sortable: true,
        },
        // {
        //   name: "Net Total Base",
        //   selector: "NetTotalBase",
        //   sortable: true,
        // },
        {
          name: "Rate Approved",
          selector: "RateApproved",
          sortable: true,
          cell: (rowData) => (rowData.RateApproved ? "Yes" : "No"),
        },
        {
          name: "Payment Approved",
          selector: "PaymentApproved",
          sortable: true,
          cell: (rowData) => (rowData.PaymentApproved ? "Yes" : "No"),
        },
        {
          name: "Quality Approved",
          selector: "QualityApproved",
          sortable: true,
          cell: (rowData) => (rowData.QualityApproved ? "Yes" : "No"),
        },
        {
          name: "Print",
          selector: "Print",
          sortable: true,
          cell: (rowData) =>
            rowData && (
              <Printer
                className="cursor-pointer mr-1 text-primary"
                size={20}
                onClick={() =>
                  history.push({
                    pathname: `/PrintPO`,
                    state: {
                      id: rowData.IDNumber,
                      data: rowData,
                    },
                  })
                }
              />
            ),
        },
      ];
    }

    const ExpandableTable = ({ data }) => {
      let PODetails = data?.PODetails;
      return (
        <Card className="cardInside">
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>ItemName</th>
                  <th>Quantity</th>
                  <th>UnitName</th>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {PODetails?.length > 0 &&
                  PODetails.map((d, i) => (
                    <tr key={"PODetailsRows" + i}>
                      <td>{d.ItemName}</td>
                      <td>{d.Quantity}</td>
                      <td>{d.UnitName}</td>
                      <td>{d.Rate}</td>
                      <td>{d.Amount}</td>
                      <td>{d.Remarks}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );
    };

    const { purchaseOrderList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase Order</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Purchase/PurchaseOrder/new")}
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
            data={purchaseOrderList}
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
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandableTable />}
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
    purchaseOrder: state.purchaseOrder,
  };
};

export default connect(mapStateToProps, {
  getPurchaseOrder,
  deletePurchaseOrder,
})(PurchaseOrder);
