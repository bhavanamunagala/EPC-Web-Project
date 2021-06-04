import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getCashReceipt = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCashReceiptList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_CASH_RECEIPT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_CASH_RECEIPT_DATA",
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

export const getCashReceiptDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getCashReceiptDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CASH_RECEIPT_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CASH_RECEIPT_DROPDOWN_DATA",
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

export const getCashReceiptById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCashReceiptById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_CASH_RECEIPT_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_CASH_RECEIPT_BY_ID",
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

export const getCashReceiptAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getCashReceiptAttachment, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CASH_RECEIPT_ATTACHMENT",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CASH_RECEIPT_ATTACHMENT",
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

// export const addCashReceipt = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().cashReceipt.params;
//     axios
//       .post(apiEndPoints.addCashReceipt, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_CASH_RECEIPT_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.Code + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_CASH_RECEIPT_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getCashReceipt(params));
//         }
//       });
//   };
// };

export const addCashReceipt = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cardReceipt.params;
    axios
      .post(apiEndPoints.addCashReceipt, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CASH_RECEIPT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addCashReceiptAttchment({
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
              type: "ADD_CASH_RECEIPT_DATA",
              obj,
              successMsg,
              random: Math.random(),
            });
            dispatch(getCashReceipt(params));
          }
        }
      });
  };
};

export const addCashReceiptAttchment = (obj) => {
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
      .post(apiEndPoints.addCashReceiptAttchment, formData, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CASH_RECEIPT_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Code + " updated Successfully";
          }
          dispatch({
            type: "ADD_CASH_RECEIPT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getCashReceipt(params));
        }
      });
  };
};

export const deleteCashReceipt = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cashReceipt.params;
    let Code = obj.Code;
    delete obj.Code;
    axios
      .post(apiEndPoints.deleteCashReceipt, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_CASH_RECEIPT_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = Code + " deleted Successfully";
          dispatch({
            type: "DELETE_CASH_RECEIPT_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getCashReceipt(params));
        }
      });
  };
};
