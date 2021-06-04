import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getHolidayMaster = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getHolidayMasterList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_HOLIDAY_MASTER_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_HOLIDAY_MASTER_DATA",
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

export const getHolidayMasterDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getHolidayMasterDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_HOLIDAY_MASTER_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_HOLIDAY_MASTER_DROPDOWN_DATA",
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

export const getHolidayMasterById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getHolidayMasterById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_HOLIDAY_MASTER_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_HOLIDAY_MASTER_BY_ID",
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

export const addHolidayMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().holiday.params;
    axios
      .post(apiEndPoints.addHolidayMaster, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_HOLIDAY_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.PolicyNo + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.PolicyNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_HOLIDAY_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getHolidayMaster(params));
        }
      });
  };
};

export const deleteHolidayMaster = (obj) => {
  return (dispatch, getState) => {
    let params = getState().holiday.params;
    let EarningCode = obj.EarningCode;
    delete obj.EarningCode;
    axios
      .post(apiEndPoints.deleteHolidayMaster, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_HOLIDAY_MASTER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = EarningCode + " deleted Successfully";
          dispatch({
            type: "DELETE_HOLIDAY_MASTER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getHolidayMaster(params));
        }
      });
  };
};
