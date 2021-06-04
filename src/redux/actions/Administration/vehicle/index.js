import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getVehicle = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getVehicleList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_VEHICLE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_VEHICLE_DATA",
            data: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const getVehicleMetaData = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getVehicleMetaList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_VEHICLE_META_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_VEHICLE_META_DATA",
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

export const addVehicle = (obj) => {
  return (dispatch, getState) => {
    let params = getState().vehicle.params;
    axios
      .post(apiEndPoints.addVehicle, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_VEHICLE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.VehicleNo + " added Successfully";
          if (obj.IDNumber !== 0) {
            successMsg = obj.VehicleNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_VEHICLE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getVehicle(params));
        }
      });
  };
};

export const deleteVehicle = (obj) => {
  return (dispatch, getState) => {
    let params = getState().vehicle.params;
    let VehicleName = obj.VehicleName;
    delete obj.VehicleName;
    axios.post(apiEndPoints.deleteVehicle, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "GET_VEHICLE_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = VehicleName + " deleted Successfully";
        dispatch({
          type: "GET_VEHICLE_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getVehicle(params));
      }
    });
  };
};
