import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getPurchaseOrder = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPurchaseOrderList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PURCHASE_ORDER_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PURCHASE_ORDER_DATA",
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

export const getPurchaseOrderDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPurchaseOrderDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PURCHASE_ORDER_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PURCHASE_ORDER_DROPDOWN_DATA",
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

export const getPurchaseOrderById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPurchaseOrderById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PURCHASE_ORDER_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PURCHASE_ORDER_BY_ID",
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

export const getPOAttchment = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getPOAttchment, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_PURCHASE_ORDER_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_PURCHASE_ORDER_ATTACHMENT",
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

export const addPurchaseOrder = (obj) => {
  return (dispatch, getState) => {
    let params = getState().purchaseOrder.params;
    axios
      .post(apiEndPoints.addPurchaseOrder, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PURCHASE_ORDER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addPOAttchment({
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
              successMsg = obj.PONo + " updated Successfully";
            }
            dispatch({
              type: "ADD_PURCHASE_ORDER_DATA",
              obj,
              successMsg,
              random: Math.random(),
            });
            dispatch(getPurchaseOrder(params));
          }
        }
      });
  };
};

export const addPOAttchment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().purchaseOrder.params;
    var formData = new FormData();
    formData.append("IDNumber", obj.IDNumber);
    formData.append("file", obj.file);
    formData.append("CreatedBy", obj.CreatedBy);
    formData.append("CreatedDate", obj.CreatedDate);
    formData.append("UpdatedBy", obj.UpdatedBy);
    formData.append("UpdatedDate", obj.UpdatedDate);
    axios
      .post(apiEndPoints.addPOAttchment, formData, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PURCHASE_ORDER_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PONo + " updated Successfully";
          }
          dispatch({
            type: "ADD_PURCHASE_ORDER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPurchaseOrder(params));
        }
      });
  };
};

export const deletePurchaseOrder = (obj) => {
  return (dispatch, getState) => {
    let params = getState().purchaseOrder.params;
    let PONo = obj.PONo;
    delete obj.PONo;
    axios
      .post(apiEndPoints.deletePurchaseOrder, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_PURCHASE_ORDER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PONo + " deleted Successfully";
          dispatch({
            type: "DELETE_PURCHASE_ORDER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPurchaseOrder(params));
        }
      });
  };
};
