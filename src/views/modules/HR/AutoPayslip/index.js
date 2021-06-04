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
  getAutoPayslip,
  deleteAutoPayslip,
} from "../../../../redux/actions/HR/AutoPayslip";
import { hasRight } from "../../../../constant/commonDS";

class AutoPayslip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      earningMasterList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getAutoPayslip(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.earningMaster.error &&
      nextProps.earningMaster.error !== state.error
    ) {
      toast.error(nextProps.earningMaster.error);
      return {
        error: nextProps.earningMaster.error,
      };
    }
    if (nextProps.earningMaster && nextProps.earningMaster.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.earningMaster.data).every(
          (p) => nextProps.earningMaster.data[p] !== state.earningMasterList[p]
        )
      ) {
        if (
          nextProps.earningMaster.random !== state.random &&
          nextProps.earningMaster.successMsg
        ) {
          successMsg = nextProps.earningMaster.successMsg;
          toast.success(successMsg);
        }
        return {
          earningMasterList:
            nextProps.earningMaster.data && nextProps.earningMaster.data.length
              ? nextProps.earningMaster.data
              : [],
          successMsg: successMsg,
          random: nextProps.earningMaster.random,
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
     
    };
    this.props.deleteAutoPayslip(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getAutoPayslip(postData);
  };

  render() {
    let Access = hasRight("HR_AP");
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
                        pathname: `/HR/AutoPayslip/edit/${rowData.IDNumber}`,
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
          name: "Employee Name",
          selector: "EmpName",
          sortable: true,
        },
        {
          name: "Employee Code",
          selector: "EmpCode",
          sortable: true,
        },
        {
          name: "Select Month",
          selector: "SelectMonth",
          sortable: true,
       
        },
        {
          name: "Attendance",
          selector: "Attendance",
          sortable: true,
        },
        {
          name: "Present Days",
          selector: "PresentDays",
          sortable: true,
        },
    
        {
          name: "Basic Salary",
          selector: "BasicSalary",
          sortable: true,
        },

        {
          name: "Gross Earning",
          selector: "GrossEarning",
          sortable: true,
        },

        
        {
          name: "Total Deduction",
          selector: "TotalDeduction",
          sortable: true,
        },
        {
          name: "Net Salary",
          selector: "NetSalary",
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
          name: "Employee Name",
          selector: "EmpName",
          sortable: true,
        },
        {
          name: "Employee Code",
          selector: "EmpCode",
          sortable: true,
        },
        {
          name: "Select Month",
          selector: "SelectMonth",
          sortable: true,
       
        },
        {
          name: "Attendance",
          selector: "Attendance",
          sortable: true,
        },
        {
          name: "Present Days",
          selector: "PresentDays",
          sortable: true,
        },
    
        {
          name: "Basic Salary",
          selector: "BasicSalary",
          sortable: true,
        },

        {
          name: "Gross Earning",
          selector: "GrossEarning",
          sortable: true,
        },

        
        {
          name: "Total Deduction",
          selector: "TotalDeduction",
          sortable: true,
        },
        {
          name: "Net Salary",
          selector: "NetSalary",
          sortable: true,
        },
        {
          name: "Remarks",
          selector: "Remarks",
          sortable: true,
        },
      
      ];
    }

    const { earningMasterList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Auto Payslip</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/HR/AutoPayslip/new")}
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
            data={earningMasterList}
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
    earningMaster: state.earningMaster,
  };
};

export default connect(mapStateToProps, {
  getAutoPayslip,
  deleteAutoPayslip,
})(AutoPayslip);
