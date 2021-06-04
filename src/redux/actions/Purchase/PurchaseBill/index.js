import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getPurchaseBill = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getPurchaseBillList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_PURCHASE_BILL_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_PURCHASE_BILL_DATA",
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

export const getPurchaseBillDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPurchaseBillDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PURCHASE_BILL_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PURCHASE_BILL_DROPDOWN_DATA",
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

export const getPurchaseBillById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getPurchaseBillById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_PURCHASE_BILL_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_PURCHASE_BILL_BY_ID",
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

export const addPurchaseBill = (obj) => {
  return (dispatch, getState) => {
    let params = getState().purchaseBill.params;
    axios
      .post(apiEndPoints.addPurchaseBill, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PURCHASE_BILL_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.IndentNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_PURCHASE_BILL_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPurchaseBill(params));
        }
      });
  };
};

export const deletePurchaseBill = (obj) => {
  return (dispatch, getState) => {
    let params = getState().purchaseBill.params;
    let IndentNo = obj.IndentNo;
    delete obj.IndentNo;
    axios
      .post(apiEndPoints.deletePurchaseBill, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_PURCHASE_BILL_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = IndentNo + " deleted Successfully";
          dispatch({
            type: "DELETE_PURCHASE_BILL_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPurchaseBill(params));
        }
      });
  };
};
