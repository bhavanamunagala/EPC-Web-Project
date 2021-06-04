import axios from "axios";
import { apiEndPoints, getHeaders } from "../../../../constant/commonDS";

//role Data list

export const getRoleData = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getRoles, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_DATA",
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

export const getGroupRights = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getGroupRights, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_GROUP_RIGHTS",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_GROUP_RIGHTS",
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

export const getDefaultRights = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getDefaultRights, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_DEFAULT_RIGHTS",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_DEFAULT_RIGHTS",
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

export const deleteRoleData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    axios.post(apiEndPoints.deleteRole, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "DELETE_ROLE_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = "Role deleted Successfully";
        dispatch({
          type: "DELETE_ROLE_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getRoleData(params));
      }
    });
  };
};

export const submitData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().roles.params;
    axios
      .post(apiEndPoints.createRole, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "SUBMIT_ROLE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Role Added Successfully";

          dispatch({
            type: "SUBMIT_ROLE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getRoleData(params));
        }
      });
  };
};
