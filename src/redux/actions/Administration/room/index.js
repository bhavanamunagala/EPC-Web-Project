import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getRoom = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getRoomList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_ROOM_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_ROOM_DATA",
            data: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const getRoomMetaData = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getRoomMetaList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_ROOM_META_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_ROOM_META_DATA",
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

export const addRoom = (obj) => {
  return (dispatch, getState) => {
    // let params = getState().room.params;
    axios
      .post(apiEndPoints.addRoom, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_ROOM_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.FlatName + " added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.FlatName + " updated Successfully";
          }
          dispatch({
            type: "ADD_ROOM_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          //dispatch(getRoom(params));
        }
      });
  };
};

export const deleteRoom = (obj) => {
  return (dispatch, getState) => {
    let params = getState().room.params;
    let RoomName = obj.FlatName;
    delete obj.FlatName;
    axios.post(apiEndPoints.deleteRoom, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "GET_ROOM_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = RoomName + " deleted Successfully";
        dispatch({
          type: "GET_ROOM_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getRoom(params));
      }
    });
  };
};
