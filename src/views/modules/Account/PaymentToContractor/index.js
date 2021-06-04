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
  getPaymentToContractor,
  deletePaymentToContractor,
} from "../../../../redux/actions/Account/PaymenToContractor";
import { hasRight } from "../../../../constant/commonDS";

class PaymentToContractor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leagalPaymentList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getPaymentToContractor(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.leagalPayment.error &&
      nextProps.leagalPayment.error !== state.error
    ) {
      toast.error(nextProps.leagalPayment.error);
      return {
        error: nextProps.leagalPayment.error,
      };
    }
    if (nextProps.leagalPayment && nextProps.leagalPayment.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.leagalPayment.data).every(
          (p) => nextProps.leagalPayment.data[p] !== state.leagalPaymentList[p]
        )
      ) {
        if (
          nextProps.leagalPayment.random !== state.random &&
          nextProps.leagalPayment.successMsg
        ) {
          successMsg = nextProps.leagalPayment.successMsg;
          toast.success(successMsg);
        }
        return {
          leagalPaymentList:
            nextProps.leagalPayment.data && nextProps.leagalPayment.data.length
              ? nextProps.leagalPayment.data
              : [],
          successMsg: successMsg,
          random: nextProps.leagalPayment.random,
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
    this.props.deletePaymentToContractor(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getPaymentToContractor(postData);
  };

  render() {
    let Access = hasRight("ACC_PTC");
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
                        pathname: `/Account/PaymentToContractor/edit/${rowData.IDNumber}`,
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
          name: "Supplier Name",
          selector: "SupplierName",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Policy No",
          selector: "PolicyNo",
          sortable: true,
          width: "11%",
        },
        {
          name: "Vehicle No",
          selector: "VehicleNo",
          sortable: true,
        },
        {
          name: "PaymentToContractor Company",
          selector: "PaymentToContractorCompany",
          sortable: true,
        },
        {
          name: "Reminder Date",
          selector: "ReminderDate",
          sortable: true,
          cell: (rowData) => moment(rowData.ReminderDate).format("DD-MM-YYYY"),
        },
        {
          name: "Start Date",
          selector: "StartDate",
          sortable: true,
          cell: (rowData) => moment(rowData.StartDate).format("DD-MM-YYYY"),
        },
        {
          name: "End Date",
          selector: "EndDate",
          sortable: true,
          cell: (rowData) => moment(rowData.EndDate).format("DD-MM-YYYY"),
        },

        {
          name: "Amount",
          selector: "Amount",
          sortable: true,
        },
      ];
    } else {
      columns = [
        {
          name: "Supplier Name",
          selector: "SupplierName",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Policy No",
          selector: "PolicyNo",
          sortable: true,
          width: "11%",
        },
        {
          name: "Vehicle No",
          selector: "VehicleNo",
          sortable: true,
        },
        {
          name: "PaymentToContractor Company",
          selector: "PaymentToContractorCompany",
          sortable: true,
        },
        {
          name: "Reminder Date",
          selector: "ReminderDate",
          sortable: true,
          cell: (rowData) => moment(rowData.ReminderDate).format("DD-MM-YYYY"),
        },
        {
          name: "Start Date",
          selector: "StartDate",
          sortable: true,
          cell: (rowData) => moment(rowData.StartDate).format("DD-MM-YYYY"),
        },
        {
          name: "End Date",
          selector: "EndDate",
          sortable: true,
          cell: (rowData) => moment(rowData.EndDate).format("DD-MM-YYYY"),
        },

        {
          name: "Amount",
          selector: "Amount",
          sortable: true,
        },
      ];
    }

    const { leagalPaymentList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment To Contractor</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Account/PaymentToContractor/new")}
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
            data={leagalPaymentList}
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
    leagalPayment: state.leagalPayment,
  };
};

export default connect(mapStateToProps, {
  getPaymentToContractor,
  deletePaymentToContractor,
})(PaymentToContractor);
