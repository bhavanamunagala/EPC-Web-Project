import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getLeaveApplication = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeaveApplicationList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAVE_APPLICATION_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAVE_APPLICATION_DATA",
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

export const getLeaveApplicationDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeaveApplicationDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAVE_APPLICATION_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAVE_APPLICATION_DROPDOWN_DATA",
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

export const getLeaveApplicationById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeaveApplicationById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAVE_APPLICATION_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAVE_APPLICATION_BY_ID",
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

export const addLeaveApplication = (obj) => {
  return (dispatch, getState) => {
    let params = getState().earningMaster.params;
    axios
      .post(apiEndPoints.addLeaveApplication, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_LEAVE_APPLICATION_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_LEAVE_APPLICATION_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLeaveApplication(params));
        }
      });
  };
};

export const deleteLeaveApplication = (obj) => {
  return (dispatch, getState) => {
    let params = getState().earningMaster.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteLeaveApplication, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_LEAVE_APPLICATION_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_LEAVE_APPLICATION_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLeaveApplication(params));
        }
      });
  };
};
