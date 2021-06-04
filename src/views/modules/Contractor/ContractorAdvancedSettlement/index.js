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
  getContractorAdvancedSettlement,
  deleteContractorAdvancedSettlement,
} from "../../../../redux/actions/Contractor/ContractorAdvancedSettlement";
import { hasRight } from "../../../../constant/commonDS";

class ContractorAdvancedSettlement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contractorAdvancedSettlementList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getContractorAdvancedSettlement(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.contractorAdvancedSettlement.error &&
      nextProps.contractorAdvancedSettlement.error !== state.error
    ) {
      toast.error(nextProps.contractorAdvancedSettlement.error);
      return {
        error: nextProps.contractorAdvancedSettlement.error,
      };
    }
    if (
      nextProps.contractorAdvancedSettlement &&
      nextProps.contractorAdvancedSettlement.data
    ) {
      let successMsg = "";
      if (
        Object.keys(nextProps.contractorAdvancedSettlement.data).every(
          (p) =>
            nextProps.contractorAdvancedSettlement.data[p] !==
            state.contractorAdvancedSettlementList[p]
        )
      ) {
        if (
          nextProps.contractorAdvancedSettlement.random !== state.random &&
          nextProps.contractorAdvancedSettlement.successMsg
        ) {
          successMsg = nextProps.contractorAdvancedSettlement.successMsg;
          toast.success(successMsg);
        }
        return {
          contractorAdvancedSettlementList:
            nextProps.contractorAdvancedSettlement.data &&
            nextProps.contractorAdvancedSettlement.data.length
              ? nextProps.contractorAdvancedSettlement.data
              : [],
          successMsg: successMsg,
          random: nextProps.contractorAdvancedSettlement.random,
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
    this.props.deleteContractorAdvancedSettlement(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getContractorAdvancedSettlement(postData);
  };

  render() {
    let Access = hasRight("CON_BILL");
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
                        pathname: `/Contractor/ContractorAdvanceSettlement/edit/${rowData.IDNumber}`,
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
          name: "Contractor Name",
          selector: "ContractorName",
          sortable: true,
        },
        {
          name: "Work Order No",
          selector: "WoNo",
          sortable: true,
        },
        {
          name: "Request No",
          selector: "RequestNo",
          sortable: true,
        },
        {
          name: "Bill No",
          selector: "BillNo",
          sortable: true,
        },
        {
          name: "Date",
          selector: "Date",
          sortable: true,
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
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
          name: "Work Order No",
          selector: "WoNo",
          sortable: true,
        },
        {
          name: "Request No",
          selector: "RequestNo",
          sortable: true,
        },
        {
          name: "Bill No",
          selector: "BillNo",
          sortable: true,
        },
        {
          name: "Date",
          selector: "Date",
          sortable: true,
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
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

    const { contractorAdvancedSettlementList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Contractor Advanced Settlement</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() =>
                  history.push("/Contractor/ContractorAdvanceSettlement/new")
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
            data={contractorAdvancedSettlementList}
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
    contractorAdvancedSettlement: state.contractorAdvancedSettlement,
  };
};

export default connect(mapStateToProps, {
  getContractorAdvancedSettlement,
  deleteContractorAdvancedSettlement,
})(ContractorAdvancedSettlement);
