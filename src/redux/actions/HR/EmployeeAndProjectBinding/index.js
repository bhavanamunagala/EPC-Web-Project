import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getProjectEmpMaster = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getProjectEmpMasterList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_EMPLOYEE_AND_PROJECT_BINDING_DATA",


            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_EMPLOYEE_AND_PROJECT_BINDING_DATA",
            data: response.data.Data,
            totalPages: response.data.totalPages,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const getProjectEmpMasterDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getProjectEmpMasterDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EMPLOYEE_AND_PROJECT_BINDING_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EMPLOYEE_AND_PROJECT_BINDING_DROPDOWN_DATA",
              data: response.data.Data,
              totalPages: response.data.totalPages,
              params,
            });
          }
        },
        (error) => {}
      );
  };
};

export const getProjectEmpMasterById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getProjectEmpMasterById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_EMPLOYEE_AND_PROJECT_BINDING_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_EMPLOYEE_AND_PROJECT_BINDING_BY_ID",
            data: response.data.Data,
            totalPages: response.data.totalPages,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const getProjectEmpMasterAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getProjectEmpMasterAttachment, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EMPLOYEE_AND_PROJECT_BINDING_ATTACHMENT",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EMPLOYEE_AND_PROJECT_BINDING_ATTACHMENT",
              data: response.data.Data,
              totalPages: response.data.totalPages,
              params,
            });
          }
        },
        (error) => {}
      );
  };
};
export const addProjectEmpMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().projectEmpMaster.params;
    axios
      .post(apiEndPoints.addProjectEmpMaster, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_EMPLOYEE_AND_PROJECT_BINDING_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addProjectEmpMasterAttchment({
                IDNumber: response.data.Data.IDNumber,
                file: obj.file,
                CreatedBy:
                  localStorage.getItem("userData") &&
                  JSON.parse(localStorage.getItem("userData")).IDNumber,
                CreatedDate: moment(),
                UpdatedBy:
                  localStorage.getItem("userData") &&
                  JSON.parse(localStorage.getItem("userData")).IDNumber,
                UpdatedDate: moment(),
              })
            );
          } else {
            let successMsg = "Added Successfully";
            if (obj.IDNumber) {
              successMsg = obj.Code + " updated Successfully";
            }
            dispatch({
              type: "ADD_EMPLOYEE_AND_PROJECT_BINDING_DATA",
              obj,
              successMsg,
              random: Math.random(),
            });
            dispatch(getProjectEmpMaster(params));
          }
        }
      });
  };
};

export const addProjectEmpMasterAttchment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().projectEmpMaster.params;
    var formData = new FormData();
    formData.append("IDNumber", obj.IDNumber);
    formData.append("file", obj.file);
    formData.append("CreatedBy", obj.CreatedBy);
    formData.append("CreatedDate", obj.CreatedDate);
    formData.append("UpdatedBy", obj.UpdatedBy);
    formData.append("UpdatedDate", obj.UpdatedDate);
    axios
      .post(apiEndPoints.addProjectEmpMasterAttchment, formData, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_EMPLOYEE_AND_PROJECT_BINDING_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Code + " updated Successfully";
          }
          dispatch({
            type: "ADD_EMPLOYEE_AND_PROJECT_BINDING_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getProjectEmpMaster(params));
        }
      });
  };
};

export const deleteProjectEmpMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().projectEmpMaster.params;
    let Code = obj.Code;
    delete obj.Code;
    axios
      .post(apiEndPoints.deleteProjectEmpMasterg, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_EMPLOYEE_AND_PROJECT_BINDING_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = Code + " deleted Successfully";
          dispatch({
            type: "DELETE_EMPLOYEE_AND_PROJECT_BINDING_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getProjectEmpMaster(params));
        }
      });
  };
};
