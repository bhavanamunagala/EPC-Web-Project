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
  getContractorPaymentRequest,
  deleteContractorPaymentRequest,
} from "../../../../redux/actions/Contractor/ContractorPaymentRequest";
import { hasRight } from "../../../../constant/commonDS";

class ContractorPaymentRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contractorPaymentRequestList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getContractorPaymentRequest(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.contractorPaymentRequest.error &&
      nextProps.contractorPaymentRequest.error !== state.error
    ) {
      toast.error(nextProps.contractorPaymentRequest.error);
      return {
        error: nextProps.contractorPaymentRequest.error,
      };
    }
    if (
      nextProps.contractorPaymentRequest &&
      nextProps.contractorPaymentRequest.data
    ) {
      let successMsg = "";
      if (
        Object.keys(nextProps.contractorPaymentRequest.data).every(
          (p) =>
            nextProps.contractorPaymentRequest.data[p] !==
            state.contractorPaymentRequestList[p]
        )
      ) {
        if (
          nextProps.contractorPaymentRequest.random !== state.random &&
          nextProps.contractorPaymentRequest.successMsg
        ) {
          successMsg = nextProps.contractorPaymentRequest.successMsg;
          toast.success(successMsg);
        }
        return {
          contractorPaymentRequestList:
            nextProps.contractorPaymentRequest.data &&
            nextProps.contractorPaymentRequest.data.length
              ? nextProps.contractorPaymentRequest.data
              : [],
          successMsg: successMsg,
          random: nextProps.contractorPaymentRequest.random,
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
      ProjectName: this.state.deleteItem.ProjectName,
    };
    this.props.deleteContractorPaymentRequest(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getContractorPaymentRequest(postData);
  };

  render() {
    let Access = hasRight("CON_PR");
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
                        pathname: `/Contractor/ContractorPaymentRequest/edit/${rowData.IDNumber}`,
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
          name: "Date",
          selector: "Date",
          sortable: true,
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
          width: "11%",
        },
        {
          name: "Contractor Name",
          selector: "ContractorName",
          sortable: true,
        },
        {
          name: "WorkOrder No",
          selector: "WoNo",
          sortable: true,
        },
        {
          name: "Advance",
          selector: "Advance",
          sortable: true,
          cell: (rowData) => (rowData.Advance ? "Yes" : "No"),
        },
        {
          name: "AgainstBill",
          selector: "AgainstBill",
          sortable: true,
          cell: (rowData) => (rowData.AgainstBill ? "Yes" : "No"),
        },
        {
          name: "BillNo",
          selector: "BillNo",
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
          name: "Date",
          selector: "Date",
          sortable: true,
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
          width: "11%",
        },
        {
          name: "Contractor Name",
          selector: "ContractorName",
          sortable: true,
        },
        {
          name: "WorkOrder No",
          selector: "WoNo",
          sortable: true,
        },
        {
          name: "Advance",
          selector: "Advance",
          sortable: true,
          cell: (rowData) => (rowData.Advance ? "Yes" : "No"),
        },
        {
          name: "AgainstBill",
          selector: "AgainstBill",
          sortable: true,
          cell: (rowData) => (rowData.AgainstBill ? "Yes" : "No"),
        },
        {
          name: "BillNo",
          selector: "BillNo",
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

    const { contractorPaymentRequestList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Contractor Payment Request</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() =>
                  history.push("/Contractor/ContractorPaymentRequest/new")
                }
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
            data={contractorPaymentRequestList}
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
    contractorPaymentRequest: state.contractorPaymentRequest,
  };
};

export default connect(mapStateToProps, {
  getContractorPaymentRequest,
  deleteContractorPaymentRequest,
})(ContractorPaymentRequest);
