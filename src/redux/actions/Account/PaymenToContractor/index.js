import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getPaymentToContractor = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPaymentToContractorList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PAYMENT_TO_CONTRACTOR_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PAYMENT_TO_CONTRACTOR_DATA",
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

export const getPaymentToContractorDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPaymentToContractorDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PAYMENT_TO_CONTRACTOR_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PAYMENT_TO_CONTRACTOR_DROPDOWN_DATA",
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

export const getPaymentToContractorById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPaymentToContractorById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_PAYMENT_TO_CONTRACTOR_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_PAYMENT_TO_CONTRACTOR_BY_ID",
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

export const getPaymentToContractorAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getPaymentToContractorAttachment, params, getHeaders)
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

export const addPaymentToContractor = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cashPayment.params;
    axios
      .post(apiEndPoints.addPaymentToContractor, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PAYMENT_TO_CONTRACTOR_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addPaymentToContractorAttchment({
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
            dispatch(getPaymentToContractor(params));
          }
        }
      });
  };
};

export const addPaymentToContractorAttchment = (obj) => {
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
      .post(apiEndPoints.addPaymentToContractorAttchment, formData, getHeaders)
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
          dispatch(getPaymentToContractor(params));
        }
      });
  };
};

// export const addPaymentToContractor = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().paymentToContractor.params;
//     axios
//       .post(apiEndPoints.addPaymentToContractor, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_PAYMENT_TO_CONTRACTOR_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = obj.PolicyNo + "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.PolicyNo + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_PAYMENT_TO_CONTRACTOR_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getPaymentToContractor(params));
//         }
//       });
//   };
// };

export const deletePaymentToContractor = (obj) => {
  return (dispatch, getState) => {
    let params = getState().paymentToContractor.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deletePaymentToContractor, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_PAYMENT_TO_CONTRACTOR_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_PAYMENT_TO_CONTRACTOR_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getPaymentToContractor(params));
        }
      });
  };
};
