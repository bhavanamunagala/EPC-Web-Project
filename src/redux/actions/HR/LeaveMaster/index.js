import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getLeaveMaster = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeaveMasterList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAVE_MASTER_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAVE_MASTER_DATA",
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

export const getLeaveMasterDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeaveMasterDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAVE_MASTER_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAVE_MASTER_DROPDOWN_DATA",
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

export const getLeaveMasterById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeaveMasterById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAVE_MASTER_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAVE_MASTER_BY_ID",
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

export const addLeaveMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().earningMaster.params;
    axios
      .post(apiEndPoints.addLeaveMaster, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_LEAVE_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_LEAVE_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLeaveMaster(params));
        }
      });
  };

};

export const deleteLeaveMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().earningMaster.params;
    let EarningCode = obj.EarningCode;
    delete obj.EarningCode;
    axios
      .post(apiEndPoints.deleteLeaveMaster, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_LEAVE_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = EarningCode + " deleted Successfully";
          dispatch({
            type: "DELETE_LEAVE_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLeaveMaster(params));
        }
      });
  };
};
