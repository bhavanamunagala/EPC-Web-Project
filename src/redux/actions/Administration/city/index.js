import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getCity = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCityList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_CITY_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_CITY_DATA",
            cityList: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const addCity = (obj) => {
  return (dispatch, getState) => {
    let params = getState().city.params;
    axios.post(apiEndPoints.createCity, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "ADD_CITY_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = obj.CityName + " added Successfully";
        if (obj.IDNumber) {
          successMsg = obj.CityName + " updated Successfully";
        }
        let random = Math.random();
        dispatch({ type: "ADD_CITY_DATA", obj, successMsg, random: random });
        dispatch(getCity(params));
      }
    });
  };
};

export const deleteCity = (obj) => {
  return (dispatch, getState) => {
    let params = getState().city.params;
    let CityName = obj.CityName;
    delete obj.CityName;
    axios.post(apiEndPoints.deleteCity, obj, getHeaders).then((response) => {
      let random = Math.random();
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "DELETE_CITY_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = CityName + " deleted Successfully";
        dispatch({ type: "DELETE_CITY_DATA", obj, successMsg, random: random });
        dispatch(getCity(params));
      }
    });
  };
};
