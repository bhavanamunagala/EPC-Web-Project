import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getLeaveOpening = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getLeaveOpeningList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_LEAVE_OPENING_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_LEAVE_OPENING_DATA",
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

export const getLeaveOpeningDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeaveOpeningDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAVE_OPENING_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAVE_OPENING_DROPDOWN_DATA",
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

export const getLeaveOpeningById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getLeaveOpeningById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_LEAVE_OPENING_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_LEAVE_OPENING_BY_ID",
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

export const addLeaveOpening = (obj) => {
  return (dispatch, getState) => {
    let params = getState().project.params;
    axios
      .post(apiEndPoints.addLeaveOpening, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_LEAVE_OPENING_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_LEAVE_OPENING_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLeaveOpening(params));
        }
      });
  };
};

export const deleteLeaveOpening = (obj) => {
  return (dispatch, getState) => {
    let params = getState().project.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteLeaveOpening, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_LEAVE_OPENING_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_LEAVE_OPENING_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLeaveOpening(params));
        }
      });
  };
};
