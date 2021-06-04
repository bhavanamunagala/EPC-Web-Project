import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getItem = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getItemList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_ITEM_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_ITEM_DATA",
            data: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const getItemGroupData = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getItemGroup, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_ITEM_GROUP_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_ITEM_GROUP_DATA",
            data: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const addItem = (obj) => {
  return (dispatch, getState) => {
    let params = getState().item.params;
    axios
      .post(apiEndPoints.addItem, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_ITEM_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.ItemName + " added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.ItemName + " updated Successfully";
          }
          dispatch({
            type: "ADD_ITEM_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getItem(params));
        }
      });
  };
};

export const deleteItem = (obj) => {
  return (dispatch, getState) => {
    let params = getState().item.params;
    let ItemName = obj.ItemName;
    delete obj.ItemName;
    axios.post(apiEndPoints.deleteItem, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "GET_ITEM_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = ItemName + " deleted Successfully";
        dispatch({
          type: "GET_ITEM_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getItem(params));
      }
    });
  };
};
