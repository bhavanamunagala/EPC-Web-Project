import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import DataTable from "react-data-table-component";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
} from "reactstrap";
import { Edit, Trash, Plus } from "react-feather";
import { history } from "../../../../history";
import { CustomHeader } from "../../../components/CustomHeader";
import "../../style.css";
import { getGRN, deleteGRN } from "../../../../redux/actions/Purchase/GRN";
import { hasRight } from "../../../../constant/commonDS";

class GRN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grnList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getGRN(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.grn.error && nextProps.grn.error !== state.error) {
      toast.error(nextProps.grn.error);
      return {
        error: nextProps.grn.error,
      };
    }
    if (nextProps.grn && nextProps.grn.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.grn.data).every(
          (p) => nextProps.grn.data[p] !== state.grnList[p]
        )
      ) {
        if (nextProps.grn.random !== state.random && nextProps.grn.successMsg) {
          successMsg = nextProps.grn.successMsg;
          toast.success(successMsg);
        }
        return {
          grnList:
            nextProps.grn.data && nextProps.grn.data.length
              ? nextProps.grn.data
              : [],
          successMsg: successMsg,
          random: nextProps.grn.random,
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
      InwardNo: this.state.deleteItem.InwardNo,
    };
    this.props.deleteGRN(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getGRN(postData);
  };

  render() {
    let Access = hasRight("GRN");
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
                        pathname: `/Purchase/GRN/edit/${rowData.IDNumber}`,
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
          name: "Inward No",
          selector: "InwardNo",
          sortable: true,
          width: "11%",
        },
        {
          name: "Inward Date",
          selector: "InwardDate",
          sortable: true,
          cell: (rowData) => moment(rowData.InwardDate).format("DD-MM-YYYY"),
        },
        {
          name: "PO ID",
          selector: "POID",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Supplier ID",
          selector: "SupplierID",
          sortable: true,
        },
        {
          name: "Bill No",
          selector: "BillNo",
          sortable: true,
        },
        {
          name: "Bill Date",
          selector: "BillDate",
          sortable: true,
        },
        {
          name: "Purchase Type",
          selector: "PurchaseType",
          sortable: true,
        },

        {
          name: "Approved",
          selector: "Approved",
          sortable: true,
          ceil: (rowData) => (rowData.Approved ? "Yes" : "No"),
        },
      ];
    } else {
      columns = [
        {
          name: "Inward No",
          selector: "InwardNo",
          sortable: true,
          width: "11%",
        },
        {
          name: "Inward Date",
          selector: "InwardDate",
          sortable: true,
          cell: (rowData) => moment(rowData.InwardDate).format("DD-MM-YYYY"),
        },
        {
          name: "PO ID",
          selector: "POID",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Supplier ID",
          selector: "SupplierID",
          sortable: true,
        },
        {
          name: "Bill No",
          selector: "BillNo",
          sortable: true,
        },
        {
          name: "Bill Date",
          selector: "BillDate",
          sortable: true,
        },
        {
          name: "Purchase Type",
          selector: "PurchaseType",
          sortable: true,
        },

        {
          name: "Approved",
          selector: "Approved",
          sortable: true,
          ceil: (rowData) => (rowData.Approved ? "Yes" : "No"),
        },
      ];
    }

    const ExpandableTable = ({ data }) => {
      let INWDetails = data?.INWDetails;
      return (
        <Card className="cardInside">
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>MLN</th>
                  <th>LocationID</th>
                  <th>ItemID</th>
                  <th>UnitID</th>
                  <th>ReceivedQty</th>
                  <th>ApprovedQty</th>
                  <th>FreeQty</th>
                  <th>QtyRemain</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {INWDetails?.length > 0 &&
                  INWDetails.map((d, i) => (
                    <tr key={"INWDetailsRows" + i}>
                      <td>{d.MLN}</td>
                      <td>{d.LocationID}</td>
                      <td>{d.ItemID}</td>
                      <td>{d.UnitID}</td>
                      <td>{d.ReceivedQty}</td>
                      <td>{d.ApprovedQty}</td>
                      <td>{d.FreeQty}</td>
                      <td>{d.QtyRemain}</td>
                      <td>{d.Rate}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );
    };

    const { grnList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>GRN</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Purchase/GRN/new")}
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
            data={grnList}
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
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandableTable />}
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
    grn: state.grn,
  };
};

export default connect(mapStateToProps, {
  getGRN,
  deleteGRN,
})(GRN);
