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
  getEmpSalaryInfo,
  deleteEmpSalaryInfo,
} from "../../../../redux/actions/HR/SalaryInformation";
import { hasRight } from "../../../../constant/commonDS";

class EmpSalaryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salaryList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getEmpSalaryInfo(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.empSalaryInfo.error &&
      nextProps.empSalaryInfo.error !== state.error
    ) {
      toast.error(nextProps.empSalaryInfo.error);
      return {
        error: nextProps.empSalaryInfo.error,
      };
    }
    if (nextProps.empSalaryInfo && nextProps.empSalaryInfo.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.empSalaryInfo.data).every(
          (p) => nextProps.empSalaryInfo.data[p] !== state.salaryList[p]
        )
      ) {
        if (
          nextProps.empSalaryInfo.random !== state.random &&
          nextProps.empSalaryInfo.successMsg
        ) {
          successMsg = nextProps.empSalaryInfo.successMsg;
          toast.success(successMsg);
        }
        return {
          salaryList:
            nextProps.empSalaryInfo.data && nextProps.empSalaryInfo.data.length
              ? nextProps.empSalaryInfo.data
              : [],
          successMsg: successMsg,
          random: nextProps.empSalaryInfo.random,
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
    this.props.deleteEmpSalaryInfo(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getEmpSalaryInfo(postData);
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
                        pathname: `/HR/SalaryInformation/edit/${rowData.IDNumber}`,
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
          name: "On Date",
          selector: "OnDate",
          sortable: true,
          cell: (rowData) => moment(rowData.OnDate).format("DD-MM-YYYY"),
   
        },
       
        {
          name: "PayamentType",
          selector: "PayamentType",
          sortable: true,
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
          width: "11%",
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
          name: "On Date",
          selector: "OnDate",
          sortable: true,
          cell: (rowData) => moment(rowData.OnDate).format("DD-MM-YYYY"),
    
        },
       
        {
          name: "PayamentType",
          selector: "PayamentType",
          sortable: true,
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
          width: "11%",
        },
  
        {
          name: "Amount",
          selector: "Amount",
          sortable: true,
        },

     
      ];
    }

    const { salaryList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Salary Information</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/HR/SalaryInformation/new")}
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
            data={salaryList}
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
    empSalaryInfo: state.empSalaryInfo,
  };
};

export default connect(mapStateToProps, {
  getEmpSalaryInfo,
  deleteEmpSalaryInfo,
})(EmpSalaryInfo);
