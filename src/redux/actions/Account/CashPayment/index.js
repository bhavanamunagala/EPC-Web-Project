import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getCashPayment = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCashPaymentList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_CASH_PAYMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_CASH_PAYMENT_DATA",
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

export const getCashPaymentDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getCashPaymentDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CASH_PAYMENT_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CASH_PAYMENT_DROPDOWN_DATA",
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

export const getCashPaymentById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCashPaymentById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_CASH_PAYMENT_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_CASH_PAYMENT_BY_ID",
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

export const getCashPaymentAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getCashPaymentAttachment, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CASH_PAYMENT_ATTACHMENT",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CASH_PAYMENT_ATTACHMENT",
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

export const addCashPayment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cashPayment.params;
    axios
      .post(apiEndPoints.addCashPayment, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CASH_PAYMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addCashPaymentAttchment({
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
              type: "ADD_CASH_PAYMENT_DATA",
              obj,
              successMsg,
              random: Math.random(),
            });
            dispatch(getCashPayment(params));
          }
        }
      });
  };
};

export const addCashPaymentAttchment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cashPayment.params;
    var formData = new FormData();
    formData.append("IDNumber", obj.IDNumber);
    formData.append("file", obj.file);
    formData.append("CreatedBy", obj.CreatedBy);
    formData.append("CreatedDate", obj.CreatedDate);
    formData.append("UpdatedBy", obj.UpdatedBy);
    formData.append("UpdatedDate", obj.UpdatedDate);
    axios
      .post(apiEndPoints.addCashPaymentAttchment, formData, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CASH_PAYMENT_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Code + " updated Successfully";
          }
          dispatch({
            type: "ADD_CASH_PAYMENT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getCashPayment(params));
        }
      });
  };
};

// export const addCashPayment = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().cashPayment.params;
//     axios
//       .post(apiEndPoints.addCashPayment, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_CASH_PAYMENT_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = obj.PolicyNo + "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.PolicyNo + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_CASH_PAYMENT_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getCashPayment(params));
//         }
//       });
//   };
// };

export const deleteCashPayment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cashPayment.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteCashPayment, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_CASH_PAYMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_CASH_PAYMENT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getCashPayment(params));
        }
      });
  };
};
