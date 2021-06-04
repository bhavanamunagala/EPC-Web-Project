import React from "react";
import { connect } from "react-redux";
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
  getAccountMaster,
  deleteAccountMaster,
} from "../../../../redux/actions/Account/AccountMaster";
import { hasRight } from "../../../../constant/commonDS";

class AccountMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountMasterList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getAccountMaster(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.accountMaster.error &&
      nextProps.accountMaster.error !== state.error
    ) {
      toast.error(nextProps.accountMaster.error);
      return {
        error: nextProps.accountMaster.error,
      };
    }
    if (nextProps.accountMaster && nextProps.accountMaster.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.accountMaster.data).every(
          (p) => nextProps.accountMaster.data[p] !== state.accountMasterList[p]
        )
      ) {
        if (
          nextProps.accountMaster.random !== state.random &&
          nextProps.accountMaster.successMsg
        ) {
          successMsg = nextProps.accountMaster.successMsg;
          toast.success(successMsg);
        }
        return {
          accountMasterList:
            nextProps.accountMaster.data && nextProps.accountMaster.data.length
              ? nextProps.accountMaster.data
              : [],
          successMsg: successMsg,
          random: nextProps.accountMaster.random,
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
      IDNUMBER: this.state.deleteItem.IDNUMBER,
      ACCODE: this.state.deleteItem.ACCODE,
    };
    this.props.deleteAccountMaster(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getAccountMaster(postData);
  };

  render() {
    let Access = hasRight("ACC_M");
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
                        pathname: `/Account/AccountMaster/edit/${rowData.IDNUMBER}`,
                        state: {
                          id: rowData.IDNUMBER,
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
          name: "Accont Code",
          selector: "ACCODE",
          sortable: true,
        },
        {
          name: "Accont Group Name",
          selector: "Grpname",
          sortable: true,
        },
        {
          name: "Accont Name",
          selector: "ACNAME",
          sortable: true,
        },
      ];
    } else {
      columns = [
        {
          name: "Accont Code",
          selector: "ACCODE",
          sortable: true,
        },
        {
          name: "Accont Group Name",
          selector: "Grpname",
          sortable: true,
        },
        {
          name: "Accont Name",
          selector: "ACNAME",
          sortable: true,
        },
      ];
    }
    const { accountMasterList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Account Master</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Account/AccountMaster/new")}
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
            data={accountMasterList}
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
    accountMaster: state.accountMaster,
  };
};

export default connect(mapStateToProps, {
  getAccountMaster,
  deleteAccountMaster,
})(AccountMaster);
