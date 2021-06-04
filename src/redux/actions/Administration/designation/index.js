import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getDesignation = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getDesignationList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_DESIGNATION_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_DESIGNATION_DATA",
            data: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const addDesignation = (obj) => {
  return (dispatch, getState) => {
    let params = getState().designation.params;
    axios
      .post(apiEndPoints.addDesignation, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_DESIGNATION_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.Designation + "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Designation + " Updated Successfully";
          }
          dispatch({
            type: "ADD_DESIGNATION_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getDesignation(params));
        }
      });
  };
};

export const deleteDesignation = (obj) => {
  return (dispatch, getState) => {
    let params = getState().designation.params;
    let Designation = obj.Designation;
    delete obj.Designation;
    axios
      .post(apiEndPoints.deleteDesignation, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_DESIGNATION_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = Designation + " deleted Successfully";
          dispatch({
            type: "DELETE_DESIGNATION_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getDesignation(params));
        }
      });
  };
};
