import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getSupplier = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getSupplierList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_SUPPLIER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_SUPPLIER_DATA",
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

export const getSupplierById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getSupplierById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_SUPPLIER_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_SUPPLIER_BY_ID",
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

export const addSupplier = (obj) => {
  return (dispatch, getState) => {
    let params = getState().supplier.params;
    axios.post(apiEndPoints.addSupplier, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "ADD_SUPPLIER_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = obj.SupplierName + " added Successfully";
        if (obj.IDNumber && obj.IDNumber !== 0) {
          successMsg = obj.SupplierName + " updated Successfully";
        }
        dispatch({
          type: "ADD_SUPPLIER_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getSupplier(params));
      }
    });
  };
};

export const deleteSupplier = (obj) => {
  return (dispatch, getState) => {
    let params = getState().supplier.params;
    let SupplierName = obj.SupplierName;
    delete obj.SupplierName;
    axios
      .post(apiEndPoints.deleteSupplier, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_SUPPLIER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = SupplierName + " deleted Successfully";
          dispatch({
            type: "GET_SUPPLIER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getSupplier(params));
        }
      });
  };
};

export const getSupplierItemData = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getSupplierItemList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_SUPPLIER_ITEM_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_SUPPLIER_ITEM_DATA",
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

export const getSupplierMetaData = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getSupplierMetaList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_SUPPLIER_META_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_SUPPLIER_META_DATA",
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
