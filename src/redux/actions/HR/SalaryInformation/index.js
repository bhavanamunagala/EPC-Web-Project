import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getEmpSalaryInfo = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getEmpSalaryInfoList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EMP_SALARY_INFO_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EMP_SALARY_INFO_DATA",
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

export const getEmpSalaryInfoDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getEmpSalaryInfoDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EMP_SALARY_INFO_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EMP_SALARY_INFO_DROPDOWN_DATA",
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

export const getEmpSalaryInfoById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getEmpSalaryInfoById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_EMP_SALARY_INFO_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_EMP_SALARY_INFO_BY_ID",
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

export const addEmpSalaryInfo = (obj) => {
  return (dispatch, getState) => {
    let params = getState().empSalaryInfo.params;
    axios
      .post(apiEndPoints.addEmpSalaryInfo, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_EMP_SALARY_INFO_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.IndentNo + " updated Successfully";
          }
      
 
          dispatch({
            type: "ADD_EMP_SALARY_INFO_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getEmpSalaryInfo(params));
        }
      });
  };
};

export const deleteEmpSalaryInfo = (obj) => {
  return (dispatch, getState) => {
    let params = getState().empSalaryInfo.params;
    let IndentNo = obj.IndentNo;
    delete obj.IndentNo;
    axios
      .post(apiEndPoints.deleteEmpSalaryInfo, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_EMP_SALARY_INFO_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = IndentNo + " deleted Successfully";
           dispatch({
            type: "DELETE_EMP_SALARY_INFO_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getEmpSalaryInfo(params));
        }
      });
  };
};
