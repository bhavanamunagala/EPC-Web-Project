import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getDieselIssue = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getDieselIssueList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_DIESEL_ISSUE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_DIESEL_ISSUE_DATA",
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

export const getDieselIssueDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getDieselIssueDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_DIESEL_ISSUE_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_DIESEL_ISSUE_DROPDOWN_DATA",
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

export const getDieselIssueById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getDieselIssueById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_DIESEL_ISSUE_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_DIESEL_ISSUE_BY_ID",
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

export const addDieselIssue = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dieselIssue.params;
    axios
      .post(apiEndPoints.addDieselIssue, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_DIESEL_ISSUE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.ProjectName + " added Successfully";
          if (obj.IDNumber && obj.IDNumber !== 0) {
            successMsg = obj.ProjectName + " updated Successfully";
          }
          dispatch({
            type: "ADD_DIESEL_ISSUE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getDieselIssue(params));
        }
      });
  };
};

export const deleteDieselIssue = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dieselIssue.params;
    let ProjectName = obj.ProjectName;
    delete obj.ProjectName;
    axios
      .post(apiEndPoints.deleteDieselIssue, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_DIESEL_ISSUE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = ProjectName + " deleted Successfully";
          dispatch({
            type: "GET_DIESEL_ISSUE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getDieselIssue(params));
        }
      });
  };
};
