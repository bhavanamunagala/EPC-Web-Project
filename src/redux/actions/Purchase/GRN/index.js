import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getGRN = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getGRNList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_GRN_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_GRN_DATA",
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

export const getGRNDropDown = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getGRNDropDown, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_GRN_DROPDOWN_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_GRN_DROPDOWN_DATA",
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

export const getGRNById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getGRNById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_GRN_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_GRN_BY_ID",
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

export const addGRN = (obj) => {
  return (dispatch, getState) => {
    let params = getState().grn.params;
    axios
      .post(apiEndPoints.addGRN, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_GRN_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.IndentNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_GRN_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getGRN(params));
        }
      });
  };
};

export const deleteGRN = (obj) => {
  return (dispatch, getState) => {
    let params = getState().grn.params;
    let InwardNo = obj.InwardNo;
    delete obj.InwardNo;
    axios.post(apiEndPoints.deleteGRN, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "DELETE_GRN_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = InwardNo + " deleted Successfully";
        dispatch({
          type: "DELETE_GRN_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getGRN(params));
      }
    });
  };
};
