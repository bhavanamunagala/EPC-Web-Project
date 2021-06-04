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
  getCardPayment,
  deleteCardPayment,
} from "../../../../redux/actions/Account/CardPayment";
import { hasRight } from "../../../../constant/commonDS";

class CardPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardPaymentList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCardPayment(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.cardPayment.error &&
      nextProps.cardPayment.error !== state.error
    ) {
      toast.error(nextProps.cardPayment.error);
      return {
        error: nextProps.cardPayment.error,
      };
    }
    if (nextProps.cardPayment && nextProps.cardPayment.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.cardPayment.data).every(
          (p) => nextProps.cardPayment.data[p] !== state.cardPaymentList[p]
        )
      ) {
        if (
          nextProps.cardPayment.random !== state.random &&
          nextProps.cardPayment.successMsg
        ) {
          successMsg = nextProps.cardPayment.successMsg;
          toast.success(successMsg);
        }
        return {
          cardPaymentList:
            nextProps.cardPayment.data && nextProps.cardPayment.data.length
              ? nextProps.cardPayment.data
              : [],
          successMsg: successMsg,
          random: nextProps.cardPayment.random,
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
    this.props.deleteCardPayment(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getCardPayment(postData);
  };

  render() {
    let Access = hasRight("ACC_CRP");
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
                        pathname: `/Account/CardPayment/edit/${rowData.IDNumber}`,
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
          width: "11%",
        },
        {
          name: "Card No",
          selector: "CardNo",
          sortable: true,
          width: "11%",
        },
        {
          name: "Account Name",
          selector: "ACNAME",
          sortable: true,
        },
        {
          name: "Amount",
          selector: "TotalAmount",
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
          width: "11%",
        },
        {
          name: "Card No",
          selector: "CardNo",
          sortable: true,
          width: "11%",
        },
        {
          name: "Account Name",
          selector: "ACNAME",
          sortable: true,
        },
        {
          name: "Amount",
          selector: "TotalAmount",
          sortable: true,
        },
        {
          name: "Remarks",
          selector: "Remarks",
          sortable: true,
        },
      ];
    }
    const { cardPaymentList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Card Payment</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Account/CardPayment/new")}
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
            data={cardPaymentList}
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
    cardPayment: state.cardPayment,
  };
};

export default connect(mapStateToProps, {
  getCardPayment,
  deleteCardPayment,
})(CardPayment);
