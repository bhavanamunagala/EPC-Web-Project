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
  getCardReceipt,
  deleteCardReceipt,
} from "../../../../redux/actions/Account/CardReceipt";
import { hasRight } from "../../../../constant/commonDS";

class CardReceipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardReceiptList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getCardReceipt(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.cardReceipt.error &&
      nextProps.cardReceipt.error !== state.error
    ) {
      toast.error(nextProps.cardReceipt.error);
      return {
        error: nextProps.cardReceipt.error,
      };
    }
    if (nextProps.cardReceipt && nextProps.cardReceipt.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.cardReceipt.data).every(
          (p) => nextProps.cardReceipt.data[p] !== state.cardReceiptList[p]
        )
      ) {
        if (
          nextProps.cardReceipt.random !== state.random &&
          nextProps.cardReceipt.successMsg
        ) {
          successMsg = nextProps.cardReceipt.successMsg;
          toast.success(successMsg);
        }
        return {
          cardReceiptList:
            nextProps.cardReceipt.data && nextProps.cardReceipt.data.length
              ? nextProps.cardReceipt.data
              : [],
          successMsg: successMsg,
          random: nextProps.cardReceipt.random,
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
    this.props.deleteCardReceipt(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getCardReceipt(postData);
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
                        pathname: `/Account/CardReceipt/edit/${rowData.IDNumber}`,
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
          name: "Card No",
          selector: "CardNo",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
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
          name: "Card No",
          selector: "CardNo",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
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

    const { cardReceiptList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Card Receipt</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Account/CardReceipt/new")}
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
            data={cardReceiptList}
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
    cardReceipt: state.cardReceipt,
  };
};

export default connect(mapStateToProps, {
  getCardReceipt,
  deleteCardReceipt,
})(CardReceipt);
