import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getAccountMaster = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getAccountMasterList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_ACCOUNT_MASTER_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_ACCOUNT_MASTER_DATA",
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

export const getAccountMasterDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getAccountMasterDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_ACCOUNT_MASTER_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_ACCOUNT_MASTER_DROPDOWN_DATA",
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

export const getAccountMasterById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getAccountMasterById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_ACCOUNT_MASTER_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_ACCOUNT_MASTER_BY_ID",
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

export const addAccountMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().accountMaster.params;
    axios
      .post(apiEndPoints.addAccountMaster, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_ACCOUNT_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.ACCODE + " updated Successfully";
          }
          dispatch({
            type: "ADD_ACCOUNT_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getAccountMaster(params));
        }
      });
  };
};

export const deleteAccountMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().accountMaster.params;
    let ACCODE = obj.ACCODE;
    delete obj.ACCODE;
    axios
      .post(apiEndPoints.deleteAccountMaster, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_ACCOUNT_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = ACCODE + " deleted Successfully";
          dispatch({
            type: "DELETE_ACCOUNT_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getAccountMaster(params));
        }
      });
  };
};
