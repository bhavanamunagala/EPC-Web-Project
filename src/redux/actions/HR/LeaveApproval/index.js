import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getLeaveApproval = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeaveApprovalList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAVE_APPROVAL_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAVE_APPROVAL_DATA",
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

export const getLeaveApprovalDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeaveApprovalDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAVE_APPROVAL_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAVE_APPROVAL_DROPDOWN_DATA",
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

export const getLeaveApprovalById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeaveApprovalById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAVE_APPROVAL_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAVE_APPROVAL_BY_ID",
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

export const addLeaveApproval = (obj) => {
  return (dispatch, getState) => {
    let params = getState().earningMaster.params;
    axios
      .post(apiEndPoints.addLeaveApproval, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_LEAVE_APPROVAL_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_LEAVE_APPROVAL_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLeaveApproval(params));
        }
      });
  };
};

export const deleteLeaveApproval = (obj) => {
  return (dispatch, getState) => {
    let params = getState().earningMaster.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteLeaveApproval, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_LEAVE_APPROVAL_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_LEAVE_APPROVAL_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLeaveApproval(params));
        }
      });
  };
};
