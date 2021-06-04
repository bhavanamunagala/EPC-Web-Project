import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getDistrict = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getDistrictList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_DISTRICT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_DISTRICT_DATA",
            districtList: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const addDistrict = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    axios
      .post(apiEndPoints.createDistrict, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_DISTRICT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.DistrictName + " added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.DistrictName + " updated Successfully";
          }
          let random = Math.random();
          dispatch({
            type: "ADD_DISTRICT_DATA",
            obj,
            successMsg,
            random: random,
          });
          dispatch(getDistrict(params));
        }
      });
  };
};

export const deleteDistrict = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    let DistrictName = obj.DistrictName;
    delete obj.DistrictName;
    axios
      .post(apiEndPoints.deleteDistrict, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_DISTRICT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = DistrictName + " deleted Successfully";
          dispatch({
            type: "DELETE_DISTRICT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getDistrict(params));
        }
      });
  };
};
