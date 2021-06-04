import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getPayslipMonth = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getPayslipMonthList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_PAYSLIP_MONTH_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_PAYSLIP_MONTH_DATA",
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

export const getPayslipMonthDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPayslipMonthDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PAYSLIP_MONTH_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PAYSLIP_MONTH_DROPDOWN_DATA",
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

export const getPayslipMonthById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getPayslipMonthById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_PAYSLIP_MONTH_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_PAYSLIP_MONTH_BY_ID",
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

export const addPayslipMonth = (obj) => {
  return (dispatch, getState) => {
    let params = getState().paySlipMaster.params;
    axios
      .post(apiEndPoints.addPayslipMonth, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PAYSLIP_MONTH_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_PAYSLIP_MONTH_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPayslipMonth(params));
        }
      });
  };
};

export const deletePayslipMonth = (obj) => {
  return (dispatch, getState) => {
    let params = getState().paySlipMaster.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deletePayslipMonth, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_PAYSLIP_MONTH_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_PAYSLIP_MONTH_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPayslipMonth(params));
        }
      });
  };
};
