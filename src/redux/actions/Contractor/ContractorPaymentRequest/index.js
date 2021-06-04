import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getContractorPaymentRequest = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getContractorPaymentRequestList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CONTRACTOR_PAYMENT_REQUEST_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CONTRACTOR_PAYMENT_REQUEST_DATA",
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

export const getContractorPaymentRequestDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(
        apiEndPoints.getContractorPaymentRequestDropDown,
        params,
        getHeaders
      )
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CONTRACTOR_PAYMENT_REQUEST_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CONTRACTOR_PAYMENT_REQUEST_DROPDOWN_DATA",
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

export const getContractorPaymentRequestById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getContractorPaymentRequestById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CONTRACTOR_PAYMENT_REQUEST_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CONTRACTOR_PAYMENT_REQUEST_BY_ID",
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

export const addContractorPaymentRequest = (obj) => {
  return (dispatch, getState) => {
    let params = getState().contractorPaymentRequest.params;
    axios
      .post(apiEndPoints.addContractorPaymentRequest, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CONTRACTOR_PAYMENT_REQUEST_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.ProjectName + " updated Successfully";
          }
          dispatch({
            type: "ADD_CONTRACTOR_PAYMENT_REQUEST_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getContractorPaymentRequest(params));
        }
      });
  };
};

export const deleteContractorPaymentRequest = (obj) => {
  return (dispatch, getState) => {
    let params = getState().contractorPaymentRequest.params;
    let ProjectName = obj.ProjectName;
    delete obj.ProjectName;
    axios
      .post(apiEndPoints.deleteContractorPaymentRequest, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_CONTRACTOR_PAYMENT_REQUEST_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = ProjectName + " deleted Successfully";
          dispatch({
            type: "DELETE_CONTRACTOR_PAYMENT_REQUEST_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getContractorPaymentRequest(params));
        }
      });
  };
};
