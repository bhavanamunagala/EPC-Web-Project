import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getDeductionMaster = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getDeductionMasterList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_DEDUCTION_MASTER_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_DEDUCTION_MASTER_DATA",
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

export const getDeductionMasterDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getDeductionMasterDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_DEDUCTION_MASTER_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_DEDUCTION_MASTER_DROPDOWN_DATA",
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

export const getDeductionMasterById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getDeductionMasterById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_DEDUCTION_MASTER_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_DEDUCTION_MASTER_BY_ID",
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

export const addDeductionMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().deductionMaster.params;
    axios
      .post(apiEndPoints.addDeductionMaster, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_DEDUCTION_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_DEDUCTION_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getDeductionMaster(params));
        }
      });
  };
};

export const deleteDeductionMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().deductionMaster.params;
    let DeductionCode = obj.DeductionCode;
    delete obj.DeductionCode;
    axios
      .post(apiEndPoints.deleteDeductionMaster, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_DEDUCTION_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = DeductionCode + " deleted Successfully";
          dispatch({
            type: "DELETE_DEDUCTION_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getDeductionMaster(params));
        }
      });
  };
};
