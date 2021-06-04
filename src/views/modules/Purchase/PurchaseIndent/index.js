import React from "react";
import { connect } from "react-redux";
import moment from "moment";

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
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import "../../style.css";
import {
  getPurchaseIndent,
  deletePurchaseIndent,
} from "../../../../redux/actions/Purchase/PurchaseIndent";
import { hasRight } from "../../../../constant/commonDS";

class PurchaseIndent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseIndentList: [],
      deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getPurchaseIndent(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.purchaseIndent.error &&
      nextProps.purchaseIndent.error !== state.error
    ) {
      toast.error(nextProps.purchaseIndent.error);
      return {
        error: nextProps.purchaseIndent.error,
      };
    }
    if (nextProps.purchaseIndent && nextProps.purchaseIndent.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.purchaseIndent.data).every(
          (p) =>
            nextProps.purchaseIndent.data[p] !== state.purchaseIndentList[p]
        )
      ) {
        if (
          nextProps.purchaseIndent.random !== state.random &&
          nextProps.purchaseIndent.successMsg
        ) {
          successMsg = nextProps.purchaseIndent.successMsg;
          toast.success(successMsg);
        }
        return {
          purchaseIndentList:
            nextProps.purchaseIndent.data &&
            nextProps.purchaseIndent.data.length
              ? nextProps.purchaseIndent.data
              : [],
          successMsg: successMsg,
          random: nextProps.purchaseIndent.random,
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
      IndentNo: this.state.deleteItem.IndentNo,
    };
    this.props.deletePurchaseIndent(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getPurchaseIndent(postData);
  };

  render() {
    let Access = hasRight("IND");
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
                        pathname: `/Purchase/PurchaseIndent/edit/${rowData.IDNumber}`,
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
          name: "Indent No",
          selector: "IndentNo",
          sortable: true,
          width: "11%",
        },
        {
          name: "Location",
          selector: "LocationName",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Indent Date",
          selector: "IndentDate",
          sortable: true,
          cell: (rowData) => moment(rowData.IndentDate).format("DD-MM-YYYY"),
        },
        {
          name: "Indent Time",
          selector: "IndentTime",
          sortable: true,
          cell: (rowData) => moment(rowData.IndentTime).format("HH:mm:ss"),
        },
        {
          name: "Spec Instruction",
          selector: "SpecInstruction",
          sortable: true,
        },
      ];
    } else {
      columns = [
        {
          name: "Indent No",
          selector: "IndentNo",
          sortable: true,
          width: "11%",
        },
        {
          name: "Location",
          selector: "LocationName",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Indent Date",
          selector: "IndentDate",
          sortable: true,
          cell: (rowData) => moment(rowData.IndentDate).format("DD-MM-YYYY"),
        },
        {
          name: "Indent Time",
          selector: "IndentTime",
          sortable: true,
          cell: (rowData) => moment(rowData.IndentTime).format("HH:mm:ss"),
        },
        {
          name: "Spec Instruction",
          selector: "SpecInstruction",
          sortable: true,
        },
      ];
    }

    const ExpandableTable = ({ data }) => {
      let itemDetails = data?.ItemDetails;
      return (
        <Card className="cardInside">
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {itemDetails?.length > 0 &&
                  itemDetails.map((d, i) => (
                    <tr key={"itemDetailsRows" + i}>
                      <td>{d?.ItemName}</td>
                      <td>{d?.Qty}</td>
                      <td>{d?.UnitName}</td>
                      <td>{d?.Reason}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );
    };

    const { purchaseIndentList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase Indent</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/Purchase/PurchaseIndent/new")}
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
            data={purchaseIndentList}
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
    purchaseIndent: state.purchaseIndent,
  };
};

export default connect(mapStateToProps, {
  getPurchaseIndent,
  deletePurchaseIndent,
})(PurchaseIndent);

// import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { CardHeader, CardTitle, Table } from "reactstrap";
// import { connect } from "react-redux";
// import moment from "moment";
// import "../../style.css";
// import {
//   getVehicle,
//   deleteVehicle,
// } from "../../../../redux/actions/Administration/vehicle";
// import { Card, CardBody, Button } from "reactstrap";
// import "../../../../assets/scss/plugins/extensions/toastr.scss";
// import { Edit, Trash, Plus } from "react-feather";
// import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
// import "../../../../assets/scss/pages/data-list.scss";
// import { history } from "../../../../history";
// import DataTable from "react-data-table-component";
// import { CustomHeader } from "../../../components/CustomHeader";

// class VehicleView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       response: [],
//       CountryID: "",
//       deleteItem: null,
//       SearchText: "",
//       successMsg: "",
//       deleteAlert: false,
//       CountryName: "",
//       id: null,
//     };
//   }

//   componentDidMount() {
//     var postData = {
//       SearchText: "",
//       PageNo: 1,
//     };
//     this.props.getVehicle(postData);
//   }

//   static getDerivedStateFromProps(props, state) {
//     if (props.vehicle.error && props.vehicle.error !== state.error) {
//       toast.error(props.vehicle.error);
//       return {
//         error: props.vehicle.error,
//       };
//     }
//     if (props.vehicle && props.vehicle.data) {
//       let successMsg = "";
//       if (
//         Object.keys(props.vehicle.data).every(
//           (p) => props.vehicle.data[p] !== state.response[p]
//         )
//       ) {
//         if (props.vehicle.random !== state.random && props.vehicle.successMsg) {
//           successMsg = props.vehicle.successMsg;
//           toast.success(successMsg);
//         }
//         return {
//           response:
//             props.vehicle.data && props.vehicle.data.length
//               ? props.vehicle.data
//               : [],
//           successMsg: successMsg,
//           random: props.vehicle.random,
//         };
//       }
//     }
//     // Return null if the state hasn't changed
//     return null;
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.vehicle.successMsg !== prevProps.vehicle.successMsg) {
//       toast.success(this.props.vehicle.successMsg);
//     }
//   }

//   editRow = (row) => {
//     this.setState({ CountryName: row.CountryName });
//     this.setState({ CountryID: row.IDNumber });
//   };

//   onChange = (event) => {
//     this.setState({ CountryName: event.target.value });
//   };

//   deleteRow = (row) => {
//     this.setState({ deleteItem: row });
//     this.setState({ deleteAlert: true });
//   };
//   handleAlert = () => {
//     this.setState({ deleteAlert: false });
//   };

//   resetState = () => {
//     this.setState({ CountryName: "" });
//   };

//   deleteItem = () => {
//     this.handleAlert();
//     var postData = {
//       IDNumber: this.state.deleteItem.IDNumber,
//       ItemName: this.state.deleteItem.ItemName,
//     };
//     this.props.deleteVehicle(postData);
//   };

//   searchData = (event) => {
//     var postData = {
//       SearchText: event.target.value,
//       PageNo: 1,
//     };
//     this.props.getVehicle(postData);
//   };

//   toggle = (id) =>
//     this.setState({
//       id: this.state.id === id ? null : id,
//     });

//   render() {
//     const columns = [
//       {
//         name: "Actions",
//         selector: "actions",
//         width: "7%",
//         cell: (rowData) =>
//           rowData && (
//             <>
//               <Edit
//                 className="cursor-pointer mr-1 text-warning"
//                 size={20}
//                 onClick={() => {
//                   history.push({
//                     pathname: `/data-list/vehicle-view/edit/${rowData.IDNumber}`,
//                     state: {
//                       id: rowData.IDNumber,
//                     },
//                   });
//                   return this.editRow(rowData);
//                 }}
//               />
//               <Trash
//                 className="cursor-pointer text-danger"
//                 size={20}
//                 onClick={() => {
//                   this.deleteRow(rowData);
//                 }}
//               />
//             </>
//           ),
//       },
//       {
//         name: "Vehicle No",
//         selector: "VehicleNo",
//         sortable: true,
//       },
//       {
//         name: "Vehicle Type",
//         selector: "VehicleTypeName",
//         sortable: true,
//       },
//       {
//         name: "Project Name",
//         selector: "ProjectName",
//         sortable: true,
//       },
//       {
//         name: "Rate",
//         selector: "Rate",
//         sortable: true,
//       },
//       {
//         name: "Owner Name",
//         selector: "OwnerName",
//         sortable: true,
//       },
//       {
//         name: "Owner Type",
//         selector: "OwnerTypeName",
//         sortable: true,
//       },
//       {
//         name: "Purchase Date",
//         selector: "PurchaseDate",
//         sortable: true,
//         cell: (rowData) =>
//           moment(rowData.PurchaseDate).format("DD/MM/YYYY, h:mm:ss a"),
//       },
//       {
//         name: "Effective Date",
//         selector: "EffectiveDate",
//         sortable: true,
//         cell: (rowData) =>
//           moment(rowData.EffectiveDate).format("DD/MM/YYYY, h:mm:ss a"),
//       },
//       {
//         name: "Release Date",
//         selector: "ReleaseDate",
//         sortable: true,
//         cell: (rowData) =>
//           moment(rowData.ReleaseDate).format("DD/MM/YYYY, h:mm:ss a"),
//       },
//     ];

//     const ExpandableTable = ({ data }) => {
//       let vehicleDetails = data?.VehicleDetails;
//       return (
//         <Card className="cardInside">
//           <CardBody>
//             <Table responsive striped>
//               <thead>
//                 <tr>
//                   <th>Insurance Date</th>
//                   <th>InsuranceReminderDate</th>
//                   <th>FitnessDate</th>
//                   <th>FitnessReminderDate</th>
//                   <th>Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {vehicleDetails?.length > 0 &&
//                   vehicleDetails.map((d, i) => (
//                     <tr key={"vehivleDetailsRows" + i}>
//                       <td>
//                         {moment(d.InsuranceDate).format(
//                           "DD/MM/YYYY, h:mm:ss a"
//                         )}
//                       </td>
//                       <td>
//                         {moment(d.InsReminderDate).format(
//                           "DD/MM/YYYY, h:mm:ss a"
//                         )}
//                       </td>
//                       <td>
//                         {moment(d.FitnessDate).format("DD/MM/YYYY, h:mm:ss a")}
//                       </td>
//                       <td>
//                         {moment(d.FitReminderDate).format(
//                           "DD/MM/YYYY, h:mm:ss a"
//                         )}
//                       </td>

//                       <td>{d.Remarks}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </Table>
//           </CardBody>
//         </Card>
//       );
//     };
//     const { response, SearchText } = this.state;
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Vehicle Master</CardTitle>
//           <div className="d-flex align-items-center">
//             <CustomHeader value={SearchText} handleFilter={this.searchData} />
//             <Button
//               className="ml-1"
//               size="sm"
//               color="primary"
//               onClick={() => history.push("/data-list/vehicle-view/new")}
//             >
//               <Plus size={20} className="text-white" />
//             </Button>
//           </div>
//         </CardHeader>
//         <CardBody className="p-0">
//           <DataTable
//             // data={SearchText.length ? filteredData : response}
//             data={response}
//             columns={columns}
//             noHeader
//             pagination
//             paginationComponentOptions={{
//               rowsPerPageText: "Records per page:",
//               rangeSeparatorText: "of",
//               noRowsPerPage: false,
//               selectAllRowsItem: false,
//               selectAllRowsItemText: "All",
//             }}
//             expandableRows
//             expandOnRowClicked
//             expandableRowsComponent={<ExpandableTable />}
//           />
//           <ToastContainer />
//           <SweetAlert
//             title="Delete Item"
//             show={this.state.deleteAlert}
//             showCancel
//             reverseButtons
//             onConfirm={() => this.deleteItem()}
//             onCancel={() => this.handleAlert("deleteAlert", false)}
//           >
//             <p className="sweet-alert-text">
//               Are you sure you want to delete this Item
//             </p>
//           </SweetAlert>
//         </CardBody>
//       </Card>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     vehicle: state.vehicle,
//   };
// };

// export default connect(mapStateToProps, {
//   getVehicle,
//   deleteVehicle,
// })(VehicleView);
