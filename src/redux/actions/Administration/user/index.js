import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getUser = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getUserList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_USER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_USER_DATA",
            data: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const getUserMetaData = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getUserMetaList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_USER_META_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_USER_META_DATA",
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

export const addUser = (obj) => {
  return (dispatch, getState) => {
    let params = getState().user.params;
    axios
      .post(apiEndPoints.addUser, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_USER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.EmpName + " added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.EmpName + " updated Successfully";
          }
          dispatch({
            type: "ADD_USER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getUser(params));
        }
      });
  };
};

export const deleteUser = (obj) => {
  return (dispatch, getState) => {
    let params = getState().user.params;
    let UserName = obj.EmployeeName;
    delete obj.EmployeeName;
    axios.post(apiEndPoints.deleteUser, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "DELETE_USER_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = UserName + " deleted Successfully";
        dispatch({
          type: "DELETE_USER_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getUser(params));
      }
    });
  };
};
