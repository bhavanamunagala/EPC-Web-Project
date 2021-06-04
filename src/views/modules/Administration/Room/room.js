import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardHeader, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import "../../style.css";
import {
  getRoom,
  deleteRoom,
} from "../../../../redux/actions/Administration/room";
import { Card, CardBody, Button } from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Edit, Trash, Plus } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";
import { hasRight } from "../../../../constant/commonDS";

class RoomView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      CountryID: "",
      deleteRoom: null,
      SearchText: "",
      successMsg: "",
      deleteAlert: false,
      CountryName: "",
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getRoom(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.room.error && props.room.error !== state.error) {
      toast.error(props.room.error);
      return {
        error: props.room.error,
      };
    }
    if (props.room && props.room.data) {
      let successMsg = "";
      if (
        Object.keys(props.room.data).every(
          (p) => props.room.data[p] !== state.response[p]
        )
      ) {
        if (props.room.random !== state.random && props.room.successMsg) {
          successMsg = props.room.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.room.data && props.room.data.length ? props.room.data : [],
          successMsg: successMsg,
          random: props.room.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.dataList.successMsg !== prevProps.dataList.successMsg) {
  //     toast.success(this.props.dataList.successMsg);
  //   }
  // }

  editRow = (row) => {
    this.setState({ CountryName: row.CountryName });
    this.setState({ CountryID: row.IDNumber });
  };

  onChange = (event) => {
    this.setState({ CountryName: event.target.value });
  };

  deleteRow = (row) => {
    this.setState({ deleteRoom: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  resetState = () => {
    this.setState({ CountryName: "" });
  };

  deleteRoom = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteRoom.IDNumber,
      FlatName: this.state.deleteRoom.FlatName,
    };
    this.props.deleteRoom(postData);
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getRoom(postData);
  };

  render() {
    let Access = hasRight("ROOM");
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
                    onClick={() => {
                      history.push({
                        pathname: `/Administrator/RoomMaster/edit/${rowData.IDNumber}`,
                        state: {
                          id: rowData.IDNumber,
                        },
                      });
                      return this.editRow(rowData);
                    }}
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
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Flat Name",
          selector: "FlatName",
          sortable: true,
        },
        {
          name: "BlockName",
          selector: "BlockName",
          sortable: true,
        },
        {
          name: "CityName",
          selector: "CityName",
          sortable: true,
        },
        {
          name: "Address",
          selector: "Address",
          sortable: true,
        },
        {
          name: "Rent Agreemented",
          selector: "RentAgreement",
          sortable: true,
          cell: (rowData) => (rowData.RentAgreement === 1 ? "Yes" : "No"),
        },
        {
          name: "Rent",
          selector: "Rent",
          sortable: true,
          cell: (rowData) =>
            rowData.RentAgreement === 1 ? rowData.Rent : "N/A",
        },
      ];
    } else {
      columns = [
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Flat Name",
          selector: "FlatName",
          sortable: true,
        },
        {
          name: "BlockName",
          selector: "BlockName",
          sortable: true,
        },
        {
          name: "CityName",
          selector: "CityName",
          sortable: true,
        },
        {
          name: "Address",
          selector: "Address",
          sortable: true,
        },
        {
          name: "Rent Agreemented",
          selector: "RentAgreement",
          sortable: true,
          cell: (rowData) => (rowData.RentAgreement === 1 ? "Yes" : "No"),
        },
        {
          name: "Rent",
          selector: "Rent",
          sortable: true,
          cell: (rowData) =>
            rowData.RentAgreement === 1 ? rowData.Rent : "N/A",
        },
      ];
    }
    const { response, SearchText } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Room Master</CardTitle>
            <div className="d-flex align-items-center">
              <CustomHeader value={SearchText} handleFilter={this.searchData} />
              {Access.AllowInsert ? (
                <Button
                  className="ml-1"
                  size="sm"
                  color="primary"
                  onClick={() => history.push("/Administrator/RoomMaster/new")}
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
            />
            <ToastContainer />
            <SweetAlert
              title="Delete Room"
              show={this.state.deleteAlert}
              showCancel
              reverseButtons
              onConfirm={() => this.deleteRoom()}
              onCancel={() => this.handleAlert("deleteAlert", false)}
            >
              <p className="sweet-alert-text">
                Are you sure you want to delete this Room
              </p>
            </SweetAlert>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    room: state.room,
  };
};

export default connect(mapStateToProps, {
  getRoom,
  deleteRoom,
})(RoomView);
