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
  getLeaveApplication,
  deleteLeaveApplication,
} from "../../../../redux/actions/HR/LeaveApplication";
import { hasRight } from "../../../../constant/commonDS";

class LeaveApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LeaveApplicationList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getLeaveApplication(postData);
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
    if (nextProps.earningMaster&& nextProps.earningMaster.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.earningMaster.data).every(
          (p) => nextProps.earningMaster.data[p] !== state.LeaveApplicationList[p]
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
          LeaveApplicationList:
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
      Code: this.state.deleteItem.Code,
    };
    this.props.deleteLeaveApplication(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getLeaveApplication(postData);
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
                        pathname: `/HR/LeaveApplication/edit/${rowData.IDNumber}`,
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
          name: "Select Employee",
          selector: "EmpName",
          sortable: true,
        },
      
        {
          name: "EmpCode",
          selector: "EmpCode",
          sortable: true,
        },
      
        {
          name: "LeaveBalance",
          selector: "LeaveBalance",
          sortable: true,
        },
      
        
        {
          name: "Leave Type Name",
          selector: "LeaveTypeName",
          sortable: true,
        },
      
        
        {
          name: "No Of Days",
          selector: "TotalLeave",
          sortable: true,
        },
      
        {
          name: "Reason",
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
          name: "Select Employee",
          selector: "EmpName",
          sortable: true,
        },
      
        {
          name: "EmpCode",
          selector: "EmpCode",
          sortable: true,
        },
      
        {
          name: "LeaveBalance",
          selector: "LeaveBalance",
          sortable: true,
        },
      
        
        {
          name: "Leave Type Name",
          selector: "LeaveTypeName",
          sortable: true,
        },
      
        
        {
          name: "No Of Days",
          selector: "TotalLeave",
          sortable: true,
        },
      
        {
          name: "Reason",
          selector: "Remarks",
          sortable: true,
        },
      
       ];
    }

    const { LeaveApplicationList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Leave Application</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/HR/LeaveApplication/new")}
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
            data={LeaveApplicationList}
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
  getLeaveApplication,
  deleteLeaveApplication,
})(LeaveApplication);
