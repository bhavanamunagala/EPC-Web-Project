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
  getContractorBill,
  deleteContractorBill,
} from "../../../../redux/actions/Contractor/ContractorBill";
import { hasRight } from "../../../../constant/commonDS";

class ContractorBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contractorBillList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getContractorBill(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.contractorBill.error &&
      nextProps.contractorBill.error !== state.error
    ) {
      toast.error(nextProps.contractorBill.error);
      return {
        error: nextProps.contractorBill.error,
      };
    }
    if (nextProps.contractorBill && nextProps.contractorBill.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.contractorBill.data).every(
          (p) =>
            nextProps.contractorBill.data[p] !== state.contractorBillList[p]
        )
      ) {
        if (
          nextProps.contractorBill.random !== state.random &&
          nextProps.contractorBill.successMsg
        ) {
          successMsg = nextProps.contractorBill.successMsg;
          toast.success(successMsg);
        }
        return {
          contractorBillList:
            nextProps.contractorBill.data &&
            nextProps.contractorBill.data.length
              ? nextProps.contractorBill.data
              : [],
          successMsg: successMsg,
          random: nextProps.contractorBill.random,
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
    this.props.deleteContractorBill(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getContractorBill(postData);
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
                        pathname: `/Contractor/ContractorBill/edit/${rowData.IDNumber}`,
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

    const { contractorBillList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Contractor Bill</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Contractor/ContractorBill/new")}
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
            data={contractorBillList}
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
    contractorBill: state.contractorBill,
  };
};

export default connect(mapStateToProps, {
  getContractorBill,
  deleteContractorBill,
})(ContractorBill);
