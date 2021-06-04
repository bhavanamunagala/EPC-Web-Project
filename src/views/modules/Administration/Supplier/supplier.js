import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { connect } from "react-redux";
import "../../style.css";
import {
  getSupplier,
  deleteSupplier,
  getSupplierItemData,
} from "../../../../redux/actions/Administration/supplier";
import {
  Card,
  // CardHeader,
  // CardTitle,
  CardBody,
  // FormGroup,
  // Col,
  // Form,
  // Collapse,
} from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Button } from "reactstrap";

import { Edit, Trash, Eye, Plus } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
// import { random } from "chroma-js";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import { hasRight } from "../../../../constant/commonDS";

class SupplierView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      CountryID: "",
      deleteSupplier: null,
      SearchText: "",
      successMsg: "",
      deleteAlert: false,
      CountryName: "",
      id: null,
      supplierItemModal: false,
      supplierItemData: [],
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getSupplier(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.supplier.error && props.supplier.error !== state.error) {
      toast.error(props.supplier.error);
      return {
        error: props.supplier.error,
      };
    }
    if (props.supplier && props.supplier.data) {
      let successMsg = "";
      if (
        Object.keys(props.supplier.data).every(
          (p) => props.supplier.data[p] !== state.response[p]
        )
      ) {
        if (
          props.supplier.random !== state.random &&
          props.supplier.successMsg
        ) {
          successMsg = props.supplier.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.supplier.data && props.supplier.data.length
              ? props.supplier.data
              : [],
          successMsg: successMsg,
          random: props.supplier.random,
        };
      }
    }
    if (props.supplier && props.supplier.supplierItemData) {
      let successMsg = "";
      if (
        Object.keys(props.supplier.supplierItemData).every(
          (p) =>
            props.supplier.supplierItemData[p] !== state.supplierItemData[p]
        )
      ) {
        if (
          props.supplier.random !== state.random &&
          props.supplier.successMsg
        ) {
          successMsg = props.supplier.successMsg;
          toast.success(successMsg);
        }
        return {
          ...state,
          supplierItemData:
            props.supplier.supplierItemData &&
            props.supplier.supplierItemData.length
              ? props.supplier.supplierItemData
              : [],
          successMsg: successMsg,
          random: props.supplier.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.supplier.successMsg !== prevProps.supplier.successMsg) {
      toast.success(this.props.supplier.successMsg);
    }
    if (
      prevProps.supplier.supplierItemData !==
      this.props.supplier.supplierItemData
    ) {
      this.setState({
        supplierItemData:
          this.props.supplier.supplierItemData &&
          this.props.supplier.supplierItemData.length
            ? this.props.supplier.supplierItemData
            : [],
        random: this.props.supplier.random,
      });
    }
  }

  editRow = (row) => {
    this.setState({ CountryName: row.CountryName });
    this.setState({ CountryID: row.IDNumber });
  };

  onChange = (event) => {
    this.setState({ CountryName: event.target.value });
  };

  deleteRow = (row) => {
    this.setState({ deleteSupplier: row });
    this.setState({ deleteAlert: true });
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  deleteSupplier = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteSupplier.IDNumber,
      SupplierName: this.state.deleteSupplier.SupplierName,
    };
    this.props.deleteSupplier(postData);
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getSupplierData(postData);
  };

  toggle = (id) =>
    this.setState({
      id: this.state.id === id ? null : id,
    });

  toggleSupplierItemModal = (supId) => {
    this.props.getSupplierItemData({ SupplierID: supId ? supId : 0 });
    this.setState({
      supplierItemModal: !this.state.supplierItemModal,
    });
  };

  render() {
    let Access = hasRight("SUP");
    let columns;
    if (Access.AllowUpdate || Access.AllowDelete) {
      columns = [
        {
          name: "Actions",
          selector: "actions",
          width: "10%",
          cell: (rowData) =>
            rowData && (
              <>
                <Eye
                  className="cursor-pointer mr-1 text-primary"
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.toggleSupplierItemModal(rowData.IDNumber);
                  }}
                />
                {Access.AllowUpdate ? (
                  <Edit
                    className="cursor-pointer mr-1 text-warning"
                    size={20}
                    onClick={() => {
                      history.push({
                        pathname: `/Administrator/SupplierMaster/edit/${rowData.IDNumber}`,
                        state: {
                          id: rowData.IDNumber,
                        },
                      });
                    }}
                  />
                ) : (
                  ""
                )}
                {Access.AllowDelete ? (
                  <Trash
                    className="cursor-pointer text-danger"
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation();
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
          name: "Supplier Code",
          selector: "SupplierCode",
          sortable: true,
        },
        {
          name: "Supplier Name",
          selector: "SupplierName",
          sortable: true,
        },
        {
          name: "Supplier Category",
          selector: "CategoryName",
          sortable: true,
        },
        {
          name: "Credit Days",
          selector: "Cre_Days",
          sortable: true,
        },
        {
          name: "Opening Balance",
          selector: "OPBAL",
          sortable: true,
        },
        {
          name: "Address",
          selector: "Address",
          sortable: true,
        },
        {
          name: "City",
          selector: "CityName",
          sortable: true,
        },
      ];
    } else {
      columns = [
        {
          name: "Supplier Code",
          selector: "SupplierCode",
          sortable: true,
        },
        {
          name: "Supplier Name",
          selector: "SupplierName",
          sortable: true,
        },
        {
          name: "Supplier Category",
          selector: "CategoryName",
          sortable: true,
        },
        {
          name: "Credit Days",
          selector: "Cre_Days",
          sortable: true,
        },
        {
          name: "Opening Balance",
          selector: "OPBAL",
          sortable: true,
        },
        {
          name: "Address",
          selector: "Address",
          sortable: true,
        },
        {
          name: "City",
          selector: "CityName",
          sortable: true,
        },
      ];
    }

    const ExpandableTable = ({ data }) => {
      let contactDetails = data?.ContactDetails;
      return (
        <Card className="cardInside">
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Mobile No</th>
                </tr>
              </thead>
              <tbody>
                {contactDetails?.length > 0 &&
                  contactDetails.map((d, i) => (
                    <tr key={"contactDetailsRows" + i}>
                      <td>{d.ContactPerson}</td>
                      <td>{d.Email}</td>
                      <td>{d.PhoneNo}</td>
                      <td>{d.MobileNo}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );
    };
    const { response, SearchText } = this.state;
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supplier Master</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() =>
                  history.push("/Administrator/SupplierMaster/new")
                }
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
            // data={SearchText.length ? filteredData : response}
            data={response}
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

          {/* supplier item details modal */}
          <Modal
            isOpen={this.state.supplierItemModal}
            toggle={this.toggleSupplierItemModal}
          >
            <ModalHeader toggle={this.toggleSupplierItemModal}>
              Supplier Item Details
            </ModalHeader>
            <ModalBody>
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Item Code</th>
                    <th>Unit Name</th>
                    <th>Rate</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.supplierItemData.length > 0 ? (
                    this.state.supplierItemData.map((supplierItem, i) => {
                      return (
                        <tr
                          key={
                            "SupplierItemDetails" + supplierItem.IDNumber + i
                          }
                        >
                          <th scope="row">{i + 1}</th>
                          <td>{supplierItem.ItemName}</td>
                          <td>{supplierItem.ItemCode}</td>
                          <td>{supplierItem.UnitName}</td>
                          <td>{supplierItem.Rate}</td>
                          <td>{supplierItem.Remarks}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Supplier Item Details Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </ModalBody>
          </Modal>
          <ToastContainer />
          <SweetAlert
            title="Delete Supplier"
            show={this.state.deleteAlert}
            showCancel
            reverseButtons
            onConfirm={() => this.deleteSupplier()}
            onCancel={() => this.handleAlert("deleteAlert", false)}
          >
            <p className="sweet-alert-text">
              Are you sure you want to delete this supplier
            </p>
          </SweetAlert>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    supplier: state.supplier,
  };
};

export default connect(mapStateToProps, {
  getSupplier,
  deleteSupplier,
  getSupplierItemData,
})(SupplierView);
