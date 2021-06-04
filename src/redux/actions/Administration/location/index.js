import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getLocation = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getLocationList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_LOCATION_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_LOCATION_DATA",
            data: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const addLocation = (obj) => {
  return (dispatch, getState) => {
    let params = getState().location.params;
    axios.post(apiEndPoints.addLocation, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "GET_LOCATION_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = obj.LocationName + " added Successfully";
        if (obj.IDNumber) {
          successMsg = obj.LocationName + " updated Successfully";
        }
        dispatch({
          type: "ADD_LOCATION_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getLocation(params));
      }
    });
  };
};

export const deleteLocation = (obj) => {
  return (dispatch, getState) => {
    let params = getState().location.params;
    let LocationName = obj.LocationName;
    delete obj.LocationName;
    axios
      .post(apiEndPoints.deleteLocation, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_LOCATION_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = LocationName + " deleted Successfully";
          dispatch({
            type: "GET_LOCATION_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLocation(params));
        }
      });
  };
};
