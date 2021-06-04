import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getPurchaseIndent = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPurchaseIndentList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PURCHASE_INDENT_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PURCHASE_INDENT_DATA",
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

export const getPurchaseIndentDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPurchaseIndentDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PURCHASE_INDENT_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PURCHASE_INDENT_DROPDOWN_DATA",
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

export const getPurchaseIndentById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPurchaseIndentById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PURCHASE_INDENT_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PURCHASE_INDENT_BY_ID",
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

export const addPurchaseIndent = (obj) => {
  return (dispatch, getState) => {
    let params = getState().purchaseIndent.params;
    axios
      .post(apiEndPoints.addPurchaseIndent, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PURCHASE_INDENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.IndentNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_PURCHASE_INDENT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPurchaseIndent(params));
        }
      });
  };
};

export const deletePurchaseIndent = (obj) => {
  return (dispatch, getState) => {
    let params = getState().purchaseIndent.params;
    let IndentNo = obj.IndentNo;
    delete obj.IndentNo;
    axios
      .post(apiEndPoints.deletePurchaseIndent, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_PURCHASE_INDENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = IndentNo + " deleted Successfully";
          dispatch({
            type: "DELETE_PURCHASE_INDENT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPurchaseIndent(params));
        }
      });
  };
};
