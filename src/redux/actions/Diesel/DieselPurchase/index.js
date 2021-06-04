import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getDieselPurchase = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getDieselPurchaseList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_DIESEL_PURCHASE_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_DIESEL_PURCHASE_DATA",
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

export const getDieselPurchaseDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getDieselPurchaseDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_DIESEL_PURCHASE_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_DIESEL_PURCHASE_DROPDOWN_DATA",
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

export const getDieselPurchaseById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getDieselPurchaseById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_DIESEL_PURCHASE_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_DIESEL_PURCHASE_BY_ID",
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

export const addDieselPurchase = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dieselPurchase.params;
    axios
      .post(apiEndPoints.addDieselPurchase, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_DIESEL_PURCHASE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.DieselPurchaseNo + " added Successfully";
          if (obj.IDNumber && obj.IDNumber !== 0) {
            successMsg = obj.DieselPurchaseNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_DIESEL_PURCHASE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getDieselPurchase(params));
        }
      });
  };
};

export const deleteDieselPurchase = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dieselPurchase.params;
    let DieselPurchaseNo = obj.DieselPurchaseNo;
    delete obj.DieselPurchaseNo;
    axios
      .post(apiEndPoints.deleteDieselPurchase, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_DIESEL_PURCHASE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = DieselPurchaseNo + " deleted Successfully";
          dispatch({
            type: "GET_DIESEL_PURCHASE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getDieselPurchase(params));
        }
      });
  };
};
