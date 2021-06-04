import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getLeagalPayment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeagalPaymentList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAGAL_PAYMENT_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAGAL_PAYMENT_DATA",
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

export const getLeagalPaymentDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeagalPaymentDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAGAL_PAYMENT_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAGAL_PAYMENT_DROPDOWN_DATA",
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

export const getLeagalPaymentById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeagalPaymentById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_LEAGAL_PAYMENT_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_LEAGAL_PAYMENT_BY_ID",
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

export const getLeagalPaymentAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getLeagalPaymentAttachment, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PAYMENT_TO_CONTRACTOR_ATTACHMENT",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PAYMENT_TO_CONTRACTOR_ATTACHMENT",
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

export const addLeagalPayment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().leagalPayment.params;
    axios
      .post(apiEndPoints.addLeagalPayment, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PAYMENT_TO_CONTRACTOR_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addLeagalPaymentAttchment({
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
              type: "ADD_PAYMENT_TO_CONTRACTOR_DATA",
              obj,
              successMsg,
              random: Math.random(),
            });
            dispatch(getLeagalPayment(params));
          }
        }
      });
  };
};

export const addLeagalPaymentAttchment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().leagalPayment.params;
    var formData = new FormData();
    formData.append("IDNumber", obj.IDNumber);
    formData.append("file", obj.file);
    formData.append("CreatedBy", obj.CreatedBy);
    formData.append("CreatedDate", obj.CreatedDate);
    formData.append("UpdatedBy", obj.UpdatedBy);
    formData.append("UpdatedDate", obj.UpdatedDate);
    axios
      .post(apiEndPoints.addLeagalPaymentAttchment, formData, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PAYMENT_TO_CONTRACTOR_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Code + " updated Successfully";
          }
          dispatch({
            type: "ADD_PAYMENT_TO_CONTRACTOR_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLeagalPayment(params));
        }
      });
  };
};

// export const addLeagalPayment = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().leagalPayment.params;
//     axios
//       .post(apiEndPoints.addLeagalPayment, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_LEAGAL_PAYMENT_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.Code + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_LEAGAL_PAYMENT_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getLeagalPayment(params));
//         }
//       });
//   };
// };

export const deleteLeagalPayment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().leagalPayment.params;
    let Code = obj.Code;
    delete obj.Code;
    axios
      .post(apiEndPoints.deleteLeagalPayment, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_LEAGAL_PAYMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = Code + " deleted Successfully";
          dispatch({
            type: "DELETE_LEAGAL_PAYMENT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getLeagalPayment(params));
        }
      });
  };
};
