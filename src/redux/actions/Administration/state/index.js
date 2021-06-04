import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getStateData = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getStateList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_STATE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_STATE_DATA",
            stateList: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const addState = (obj) => {
  return (dispatch, getState) => {
    let params = getState().state.params;
    axios
      .post(apiEndPoints.createState, obj, getHeaders)

      .then((response) => {
        //     if (response.data.Status !== 1 && response.data.ErrorMessage) {
        //       dispatch({
        //         type: "ADD_STATE_DATA",
        //         error: response.data.ErrorMessage,
        //       });
        //     } else {
        //       let successMsg = obj.StateName + " added Successfully";
        //       if (obj.IDNumber) {
        //         successMsg = obj.StateName + " updated Successfully";
        //       }
        //       let random = Math.random();
        //       dispatch({ type: "ADD_STATE_DATA", obj, successMsg, random: random });
        //       dispatch(getState(params));
        //     }
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_STATE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.StateName + " added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.StateName + " updated Successfully";
          }
          dispatch({
            type: "ADD_STATE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getStateData(params));
        }
      });
  };
};

export const deleteState = (obj) => {
  return (dispatch, getState) => {
    let params = getState().state.params;
    let StateName = obj.StateName;
    delete obj.StateName;
    axios.post(apiEndPoints.deleteState, obj, getHeaders).then((response) => {
      let random = Math.random();
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "DELETE_STATE_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = StateName + " deleted Successfully";
        dispatch({
          type: "DELETE_STATE_DATA",
          obj,
          successMsg,
          random: random,
        });
        dispatch(getStateData(params));
      }
    });
  };
};
