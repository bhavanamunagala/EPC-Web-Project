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
  getDeductionMaster,
  deleteDeductionMaster,
} from "../../../../redux/actions/HR/DeductionMaster";
import { hasRight } from "../../../../constant/commonDS";

class DeductionMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    deductionList: [],
    
       deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getDeductionMaster(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.deductionMaster.error &&
      nextProps.deductionMaster.error !== state.error
    ) {
      toast.error(nextProps.deductionMaster.error);
      return {
        error: nextProps.deductionMaster.error,
      };
    }
    if (nextProps.deductionMaster && nextProps.deductionMaster.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.deductionMaster.data).every(
          (p) => nextProps.deductionMaster.data[p] !== state.deductionList[p]
        )
      ) {
        if (
          nextProps.deductionMaster.random !== state.random &&
          nextProps.deductionMaster.successMsg
        ) {
          successMsg = nextProps.deductionMaster.successMsg;
          toast.success(successMsg);
        }
        return {
          deductionList:
            nextProps.deductionMaster.data && nextProps.deductionMaster.data.length
              ? nextProps.deductionMaster.data
              : [],
          successMsg: successMsg,
          random: nextProps.deductionMaster.random,
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
      DeductionCode: this.state.deleteItem.DeductionCode,
      IndentNo: this.state.deleteItem.IndentNo,
      DeductionName: this.state.deleteItem.DeductionName,
    };
    this.props.deleteDeductionMaster(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getDeductionMaster(postData);
  };

  render() {
    let Access = hasRight("ACC_INS");
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
                        pathname: `/HR/DeductionMaster/edit/${rowData.IDNumber}`,
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
          name: "Deduction Code",
          selector: "DeductionCode",
          sortable: true,
          width: "11%",
        },
      
        {
          name: "Deduction Name",
          selector: "DeductionName",
          sortable: true,
        },
   
      ];
    } else {
      columns = [
           {
          name: "Deduction Code",
          selector: "DeductionCode",
          sortable: true,
          width: "11%",
        },
        {
          name: "Deduction Name",
          selector: "DeductionName",
          sortable: true,
        },
     
         ];
    }

    const { deductionList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Deduction Master</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/HR/DeductionMaster/new")}
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
            data={deductionList}
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
    deductionMaster: state.deductionMaster,
  };
};

export default connect(mapStateToProps, {
  getDeductionMaster,
  deleteDeductionMaster,
})(DeductionMaster);
