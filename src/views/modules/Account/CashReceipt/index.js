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
  getCashReceipt,
  deleteCashReceipt,
} from "../../../../redux/actions/Account/CashReceipt";
import { hasRight } from "../../../../constant/commonDS";

class CashReceipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cashReceiptList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCashReceipt(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.cashReceipt.error &&
      nextProps.cashReceipt.error !== state.error
    ) {
      toast.error(nextProps.cashReceipt.error);
      return {
        error: nextProps.cashReceipt.error,
      };
    }
    if (nextProps.cashReceipt && nextProps.cashReceipt.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.cashReceipt.data).every(
          (p) => nextProps.cashReceipt.data[p] !== state.cashReceiptList[p]
        )
      ) {
        if (
          nextProps.cashReceipt.random !== state.random &&
          nextProps.cashReceipt.successMsg
        ) {
          successMsg = nextProps.cashReceipt.successMsg;
          toast.success(successMsg);
        }
        return {
          cashReceiptList:
            nextProps.cashReceipt.data && nextProps.cashReceipt.data.length
              ? nextProps.cashReceipt.data
              : [],
          successMsg: successMsg,
          random: nextProps.cashReceipt.random,
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
      Code: this.state.deleteItem.Code,
    };
    this.props.deleteCashReceipt(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getCashReceipt(postData);
  };

  render() {
    let Access = hasRight("ACC_CRR");
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
                        pathname: `/Account/CashReceipt/edit/${rowData.IDNumber}`,
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
          name: "Person Name",
          selector: "PersonName",
          sortable: true,
        },

        {
          name: "Amount",
          selector: "Amount",
          sortable: true,
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
          cell: (rowData) => moment(rowData.ReminderDate).format("DD-MM-YYYY"),
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Person Name",
          selector: "PersonName",
          sortable: true,
        },
        {
          name: "Amount",
          selector: "Amount",
          sortable: true,
        },
        {
          name: "Remarks",
          selector: "Remarks",
          sortable: true,
        },
      ];
    }

    const { cashReceiptList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Cash Receipt</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Account/CashReceipt/new")}
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
            data={cashReceiptList}
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
    cashReceipt: state.cashReceipt,
  };
};

export default connect(mapStateToProps, {
  getCashReceipt,
  deleteCashReceipt,
})(CashReceipt);
