import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getCardPayment = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCardPaymentList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_CARD_PAYMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_CARD_PAYMENT_DATA",
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

export const getCardPaymentDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getCardPaymentDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CARD_PAYMENT_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CARD_PAYMENT_DROPDOWN_DATA",
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

export const getCardPaymentById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCardPaymentById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_CARD_PAYMENT_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_CARD_PAYMENT_BY_ID",
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

export const getCardPaymentAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getCardPaymentAttachment, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CARD_PAYMENT_ATTACHMENT",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CARD_PAYMENT_ATTACHMENT",
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

export const addCardPayment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cardReceipt.params;
    axios
      .post(apiEndPoints.addCardPayment, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CARD_PAYMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addCardPaymentAttchment({
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
              type: "ADD_CARD_PAYMENT_DATA",
              obj,
              successMsg,
              random: Math.random(),
            });
            dispatch(getCardPayment(params));
          }
        }
      });
  };
};

export const addCardPaymentAttchment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cardReceipt.params;
    var formData = new FormData();
    formData.append("IDNumber", obj.IDNumber);
    formData.append("file", obj.file);
    formData.append("CreatedBy", obj.CreatedBy);
    formData.append("CreatedDate", obj.CreatedDate);
    formData.append("UpdatedBy", obj.UpdatedBy);
    formData.append("UpdatedDate", obj.UpdatedDate);
    axios
      .post(apiEndPoints.addCardPaymentAttchment, formData, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CARD_PAYMENT_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Code + " updated Successfully";
          }
          dispatch({
            type: "ADD_CARD_PAYMENT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getCardPayment(params));
        }
      });
  };
};

// export const addCardPayment = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().cardPayment.params;
//     axios
//       .post(apiEndPoints.addCardPayment, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_CARD_PAYMENT_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.Code + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_CARD_PAYMENT_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getCardPayment(params));
//         }
//       });
//   };
// };

export const deleteCardPayment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cardPayment.params;
    let Code = obj.Code;
    delete obj.Code;
    axios
      .post(apiEndPoints.deleteCardPayment, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_CARD_PAYMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = Code + " deleted Successfully";
          dispatch({
            type: "DELETE_CARD_PAYMENT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getCardPayment(params));
        }
      });
  };
};
