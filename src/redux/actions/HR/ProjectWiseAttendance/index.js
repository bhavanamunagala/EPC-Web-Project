import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getProjectAttendanceMaster = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getProjectAttendanceMasterList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_PROJECT_ATTENDANCE_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_PROJECT_ATTENDANCE_MASTER_DATA",
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

export const getProjectAttendanceMasterDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getProjectAttendanceMasterDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PROJECT_ATTENDANCE_MASTER_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PROJECT_ATTENDANCE_MASTER_DROPDOWN_DATA",
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

export const getProjectAttendanceMasterById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getProjectAttendanceMasterById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_PROJECT_ATTENDANCE_MASTER_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_PROJECT_ATTENDANCE_MASTER_BY_ID",
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

export const getProjectAttendanceMasterAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getProjectAttendanceMasterAttachment, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PROJECT_ATTENDANCE_MASTER_ATTACHMENT",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PROJECT_ATTENDANCE_MASTER_ATTACHMENT",
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
export const addProjectAttendanceMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().projectAttendanceMaster.params;
    axios
      .post(apiEndPoints.addProjectAttendanceMaster, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PROJECT_ATTENDANCE_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addProjectAttendanceMasterAttchment({
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
              successMsg = obj.Code  + " updated Successfully";
            }
            dispatch({
              type: "ADD_PROJECT_ATTENDANCE_MASTER_DATA",
              obj,
              successMsg,
              random: Math.random(),
            });
            dispatch(getProjectAttendanceMaster(params));
          }
        }
      });
  };
};

export const addProjectAttendanceMasterAttchment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().projectAttendanceMaster.params;
    var formData = new FormData();
    formData.append("IDNumber", obj.IDNumber);
    formData.append("file", obj.file);
    formData.append("CreatedBy", obj.CreatedBy);
    formData.append("CreatedDate", obj.CreatedDate);
    formData.append("UpdatedBy", obj.UpdatedBy);
    formData.append("UpdatedDate", obj.UpdatedDate);
    axios
      .post(apiEndPoints.addProjectAttendanceMasterAttchment, formData, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PROJECT_ATTENDANCE_MASTER_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Code + " updated Successfully";
          }
          dispatch({
            type: "ADD_PROJECT_ATTENDANCE_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getProjectAttendanceMaster(params));
        }
      });
  };
};

export const deleteProjectAttendanceMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().projectAttendanceMaster.params;
    let Code  = obj.Code ;
    delete obj.Code ;
    axios
      .post(apiEndPoints.deleteProjectAttendanceMaster, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_PROJECT_ATTENDANCE_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = Code  + " deleted Successfully";
          dispatch({
            type: "DELETE_PROJECT_ATTENDANCE_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getProjectAttendanceMaster(params));
        }
      });
  };
};
