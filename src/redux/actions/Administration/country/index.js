import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getCountry = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCountryList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_COUNTRY_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_COUNTRY_DATA",
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

export const addCountry = (obj) => {
  return (dispatch, getState) => {
    let params = getState().country.params;
    axios.post(apiEndPoints.createCountry, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "GET_COUNTRY_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = obj.CountryName + " added Successfully";
        if (obj.IDNumber) {
          successMsg = obj.CountryName + " updated Successfully";
        }
        dispatch({
          type: "ADD_COUNTRY_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getCountry(params));
      }
    });
  };
};

export const deleteCountry = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    let CountryName = obj.CountryName;
    delete obj.CountryName;
    axios.post(apiEndPoints.deleteCountry, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "GET_COUNTRY_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = CountryName + " deleted Successfully";
        dispatch({
          type: "DELETE_COUNTRY_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getCountry(params));
      }
    });
  };
};
