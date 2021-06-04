import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getContractorAdvancedSettlement = (params) => {
  return async (dispatch) => {
    await axios
      .post(
        apiEndPoints.getContractorAdvancedSettlementList,
        params,
        getHeaders
      )
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CONTRACTOR_ADVANCED_SETTLEMENT_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CONTRACTOR_ADVANCED_SETTLEMENT_DATA",
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

export const getContractorAdvancedSettlementDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(
        apiEndPoints.getContractorAdvancedSettlementDropDown,
        params,
        getHeaders
      )
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CONTRACTOR_ADVANCED_SETTLEMENT_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CONTRACTOR_ADVANCED_SETTLEMENT_DROPDOWN_DATA",
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

export const getContractorAdvancedSettlementById = (params) => {
  return async (dispatch) => {
    await axios
      .post(
        apiEndPoints.getContractorAdvancedSettlementById,
        params,
        getHeaders
      )
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CONTRACTOR_ADVANCED_SETTLEMENT_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CONTRACTOR_ADVANCED_SETTLEMENT_BY_ID",
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

export const addContractorAdvancedSettlement = (obj) => {
  return (dispatch, getState) => {
    let params = getState().contractorAdvancedSettlement.params;
    axios
      .post(apiEndPoints.addContractorAdvancedSettlement, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CONTRACTOR_ADVANCED_SETTLEMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_CONTRACTOR_ADVANCED_SETTLEMENT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getContractorAdvancedSettlement(params));
        }
      });
  };
};

export const deleteContractorAdvancedSettlement = (obj) => {
  return (dispatch, getState) => {
    let params = getState().contractorAdvancedSettlement.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteContractorAdvancedSettlement, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_CONTRACTOR_ADVAN_SETTLEMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_CONTRACTOR_ADVAN_SETTLEMENT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getContractorAdvancedSettlement(params));
        }
      });
  };
};
