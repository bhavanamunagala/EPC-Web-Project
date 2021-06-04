import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardHeader, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";

import "../../style.css";
import {
  getProject,
  deleteProject,
} from "../../../../redux/actions/Administration/project";
import { Card, CardBody, Button } from "reactstrap";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Edit, Trash, Plus } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { history } from "../../../../history";
import { CustomHeader } from "../../../components/CustomHeader";
import DataTable from "react-data-table-component";
import { hasRight } from "../../../../constant/commonDS";

class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      CountryID: "",
      deleteItem: null,
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
    this.props.getProject(postData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.project.error && props.project.error !== state.error) {
      toast.error(props.project.error);
      return {
        error: props.project.error,
      };
    }
    if (props.project && props.project.projectList) {
      let successMsg = "";
      if (
        Object.keys(props.project.projectList).every(
          (p) => props.project.projectList[p] !== state.response[p]
        )
      ) {
        if (props.project.random !== state.random && props.project.successMsg) {
          successMsg = props.project.successMsg;
          toast.success(successMsg);
        }
        return {
          response:
            props.project.projectList && props.project.projectList.length
              ? props.project.projectList
              : [],
          successMsg: successMsg,
          random: props.project.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  editRow = (row) => {
    this.setState({ CountryName: row.CountryName });
    this.setState({ CountryID: row.IDNumber });
  };

  onChange = (event) => {
    this.setState({ CountryName: event.target.value });
  };

  deleteRow = (row) => {
    this.setState({ deleteItem: row });
    this.setState({ deleteAlert: true });
  };
  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  resetState = () => {
    this.setState({ CountryName: "" });
  };

  deleteItem = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteItem.IDNumber,
      ItemName: this.state.deleteItem.ItemName,
    };
    this.props.deleteProject(postData);
  };

  searchData = (event) => {
    this.setState({ SearchText: event.target.value });

    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getProject(postData);
  };

  render() {
    let Access = hasRight("PRJ");
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
                        pathname: `/Administrator/ProjectMaster/edit/${rowData.IDNumber}`,
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
          name: "Code",
          selector: "Code",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Project Status Name",
          selector: "ProjectStatusName",
          sortable: true,
        },
        {
          name: "Project Start Date",
          selector: "ProjectStartDate",
          sortable: true,
          cell: (rowData) =>
            moment(rowData.ProjectStartDate).format("DD/MM/YYYY"),
        },
        {
          name: "Deadline",
          selector: "Deadline",
          sortable: true,
          cell: (rowData) => moment(rowData.Deadline).format("DD/MM/YYYY"),
        },
        {
          name: "Responsible Person Name",
          selector: "ResponsiblePersonName",
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
          name: "Code",
          selector: "Code",
          sortable: true,
        },
        {
          name: "Project Name",
          selector: "ProjectName",
          sortable: true,
        },
        {
          name: "Project Status Name",
          selector: "ProjectStatusName",
          sortable: true,
        },
        {
          name: "Project Start Date",
          selector: "ProjectStartDate",
          sortable: true,
          cell: (rowData) =>
            moment(rowData.ProjectStartDate).format("DD/MM/YYYY"),
        },
        {
          name: "Deadline",
          selector: "Deadline",
          sortable: true,
          cell: (rowData) => moment(rowData.Deadline).format("DD/MM/YYYY"),
        },
        {
          name: "Responsible Person Name",
          selector: "ResponsiblePersonName",
          sortable: true,
        },
        {
          name: "City",
          selector: "CityName",
          sortable: true,
        },
      ];
    }
    const { response, SearchText } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Project Master</CardTitle>
            <div className="d-flex align-items-center">
              <CustomHeader value={SearchText} handleFilter={this.searchData} />
              {Access.AllowInsert ? (
                <Button
                  className="ml-1"
                  size="sm"
                  color="primary"
                  onClick={() =>
                    history.push("/Administrator/ProjectMaster/new")
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project,
  };
};

export default connect(mapStateToProps, {
  getProject,
  deleteProject,
})(ProjectView);
