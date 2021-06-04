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
import { Edit, Trash, Plus } from "react-feather";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import "../../style.css";
import {
  getCashPayment,
  deleteCashPayment,
} from "../../../../redux/actions/Account/CashPayment";
import { hasRight } from "../../../../constant/commonDS";

class CashPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cashPaymentList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCashPayment(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.cashPayment.error &&
      nextProps.cashPayment.error !== state.error
    ) {
      toast.error(nextProps.cashPayment.error);
      return {
        error: nextProps.cashPayment.error,
      };
    }
    if (nextProps.cashPayment && nextProps.cashPayment.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.cashPayment.data).every(
          (p) => nextProps.cashPayment.data[p] !== state.cashPaymentList[p]
        )
      ) {
        if (
          nextProps.cashPayment.random !== state.random &&
          nextProps.cashPayment.successMsg
        ) {
          successMsg = nextProps.cashPayment.successMsg;
          toast.success(successMsg);
        }
        return {
          cashPaymentList:
            nextProps.cashPayment.data && nextProps.cashPayment.data.length
              ? nextProps.cashPayment.data
              : [],
          successMsg: successMsg,
          random: nextProps.cashPayment.random,
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
      PolicyNo: this.state.deleteItem.PolicyNo,
    };
    this.props.deleteCashPayment(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getCashPayment(postData);
  };

  render() {
    let Access = hasRight("ACC_CSP");
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
                        pathname: `/Account/CashPayment/edit/${rowData.IDNumber}`,
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
          name: "Code",
          selector: "Code",
          sortable: true,
        },
        {
          name: "Date",
          selector: "Date",
          sortable: true,
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Total Amount",
          selector: "TotalAmount",
          sortable: true,
          width: "11%",
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
          name: "Code",
          selector: "Code",
          sortable: true,
        },
        {
          name: "Date",
          selector: "Date",
          sortable: true,
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Total Amount",
          selector: "TotalAmount",
          sortable: true,
          width: "11%",
        },
        {
          name: "Remarks",
          selector: "Remarks",
          sortable: true,
        },
      ];
    }

    const ExpandableTable = ({ data }) => {
      let CashPaymentDetails = data?.CashPaymentDetails;
      return (
        <Card className="cardInside">
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Amount</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {CashPaymentDetails?.length > 0 &&
                  CashPaymentDetails.map((d, i) => (
                    <tr key={"CashPaymentDetailsRows" + i}>
                      <td>{d.ACNAME}</td>
                      <td>{d.Amount}</td>
                      <td>{d.Remark}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );
    };

    const { cashPaymentList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Cash Payment</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Account/CashPayment/new")}
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
            data={cashPaymentList}
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
    cashPayment: state.cashPayment,
  };
};

export default connect(mapStateToProps, {
  getCashPayment,
  deleteCashPayment,
})(CashPayment);
