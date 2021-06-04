import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getRentPayment = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getRentPaymentList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_RENT_PAYMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_RENT_PAYMENT_DATA",
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

export const getRentPaymentDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getRentPaymentDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_RENT_PAYMENT_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_RENT_PAYMENT_DROPDOWN_DATA",
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

export const getRentPaymentById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getRentPaymentById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_RENT_PAYMENT_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_RENT_PAYMENT_BY_ID",
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

export const getRentPaymentAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getRentPaymentAttachment, params, getHeaders)
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

export const addRentPayment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cashPayment.params;
    axios
      .post(apiEndPoints.addRentPayment, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PAYMENT_TO_CONTRACTOR_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addRentPaymentAttchment({
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
            dispatch(getRentPayment(params));
          }
        }
      });
  };
};

export const addRentPaymentAttchment = (obj) => {
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
      .post(apiEndPoints.addRentPaymentAttchment, formData, getHeaders)
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
          dispatch(getRentPayment(params));
        }
      });
  };
};

// export const addRentPayment = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().cashReceipt.params;
//     axios
//       .post(apiEndPoints.addRentPayment, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_RENT_PAYMENT_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = obj.Code + "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.Code + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_RENT_PAYMENT_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getRentPayment(params));
//         }
//       });
//   };
// };

export const deleteRentPayment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cashReceipt.params;
    let Code = obj.Code;
    delete obj.Code;
    axios
      .post(apiEndPoints.deleteRentPayment, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_RENT_PAYMENT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = Code + " deleted Successfully";
          dispatch({
            type: "DELETE_RENT_PAYMENT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getRentPayment(params));
        }
      });
  };
};
