import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getProject = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getProjectList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_PROJECT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_PROJECT_DATA",
            data: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const getProjectMetaData = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getProjectMetaData, {}, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_PROJECT_META_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_PROJECT_META_DATA",
            data: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const addProject = (obj) => {
  return (dispatch, getState) => {
    let params = getState().project.params;
    axios
      .post(apiEndPoints.addProject, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PROJECT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.ProjectName + " added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.ProjectName + " updated Successfully";
          }
          dispatch({
            type: "ADD_PROJECT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getProject(params));
        }
      });
  };
};

export const deleteProject = (obj) => {
  return (dispatch, getState) => {
    let params = getState().project.params;
    let ProjectName = obj.ProjectName;
    delete obj.ProjectName;
    axios.post(apiEndPoints.deleteProject, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "GET_PROJECT_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = ProjectName + " deleted Successfully";
        dispatch({
          type: "GET_PROJECT_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getProject(params));
      }
    });
  };
};
