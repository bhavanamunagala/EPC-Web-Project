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
  getRentPayment,
  deleteRentPayment,
} from "../../../../redux/actions/Account/RentPayment";
import { hasRight } from "../../../../constant/commonDS";

class RentPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rentPaymentList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getRentPayment(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.rentPayment.error &&
      nextProps.rentPayment.error !== state.error
    ) {
      toast.error(nextProps.rentPayment.error);
      return {
        error: nextProps.rentPayment.error,
      };
    }
    if (nextProps.rentPayment && nextProps.rentPayment.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.rentPayment.data).every(
          (p) => nextProps.rentPayment.data[p] !== state.rentPaymentList[p]
        )
      ) {
        if (
          nextProps.rentPayment.random !== state.random &&
          nextProps.rentPayment.successMsg
        ) {
          successMsg = nextProps.rentPayment.successMsg;
          toast.success(successMsg);
        }
        return {
          rentPaymentList:
            nextProps.rentPayment.data && nextProps.rentPayment.data.length
              ? nextProps.rentPayment.data
              : [],
          successMsg: successMsg,
          random: nextProps.rentPayment.random,
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
    this.props.deleteRentPayment(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getRentPayment(postData);
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
                        pathname: `/Account/RentPayament/edit/${rowData.IDNumber}`,
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
          name: "House",
          selector: "FlatName",
          sortable: true,
          width: "11%",
        },

        {
          name: "Rent Amount",
          selector: "RentAmount",
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
          cell: (rowData) => moment(rowData.Date).format("DD-MM-YYYY"),
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "House",
          selector: "FlatName",
          sortable: true,
          width: "11%",
        },

        {
          name: "Rent Amount",
          selector: "RentAmount",
          sortable: true,
        },
        {
          name: "Remarks",
          selector: "Remarks",
          sortable: true,
        },
      ];
    }

    const { rentPaymentList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle> House Rent Payment</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Account/RentPayament/new")}
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
            data={rentPaymentList}
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
    rentPayment: state.rentPayment,
  };
};

export default connect(mapStateToProps, {
  getRentPayment,
  deleteRentPayment,
})(RentPayment);
