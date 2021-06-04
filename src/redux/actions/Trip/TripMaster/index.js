import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getTrip = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getTripList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_TRIP_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_TRIP_DATA",
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

export const getTripDropDown = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getTripDropDown, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_TRIP_DROPDOWN_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_TRIP_DROPDOWN_DATA",
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

export const getTripById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getTripById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_TRIP_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_TRIP_BY_ID",
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

export const getTripAttchment = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getTripAttchment, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_TRIP_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_TRIP_ATTACHMENT",
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

// export const addTrip = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().trip.params;
//     axios
//       .post(apiEndPoints.addTrip, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_TRIP_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.IndentNo + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_TRIP_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getTrip(params));
//         }
//       });
//   };
// };

export const addTrip = (obj) => {
  return (dispatch, getState) => {
    let params = getState().trip.params;
    axios.post(apiEndPoints.addTrip, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "ADD_TRIP_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        if (obj.file && obj.file?.length > 0) {
          dispatch(
            addTripAttchment({
              IDNumber: response.data.Data.IDNumber,
              file: obj.file,
              CreatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              CreatedDate: moment(),
              UpdatedBy:
                localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).IDNumber,
              UpdatedDate: moment(),
            })
          );
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Code + " updated Successfully";
          }
          dispatch({
            type: "ADD_TRIP_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getTrip(params));
        }
      }
    });
  };
};

export const addTripAttchment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().trip.params;
    var formData = new FormData();
    formData.append("IDNumber", obj.IDNumber);
    formData.append("file", obj.file);
    formData.append("CreatedBy", obj.CreatedBy);
    formData.append("CreatedDate", obj.CreatedDate);
    formData.append("UpdatedBy", obj.UpdatedBy);
    formData.append("UpdatedDate", obj.UpdatedDate);
    axios
      .post(apiEndPoints.addTripAttchment, formData, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_TRIP_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Code + " updated Successfully";
          }
          dispatch({
            type: "ADD_TRIP_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getTrip(params));
        }
      });
  };
};

export const deleteTrip = (obj) => {
  return (dispatch, getState) => {
    let params = getState().trip.params;
    let IndentNo = obj.IndentNo;
    delete obj.IndentNo;
    axios.post(apiEndPoints.deleteTrip, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "DELETE_TRIP_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = IndentNo + " deleted Successfully";
        dispatch({
          type: "DELETE_TRIP_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getTrip(params));
      }
    });
  };
};
