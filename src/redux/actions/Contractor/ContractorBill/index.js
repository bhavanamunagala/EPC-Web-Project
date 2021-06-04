import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getContractorBill = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getContractorBillList, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CONTRACTOR_BILL_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CONTRACTOR_BILL_DATA",
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

export const getContractorBillDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getContractorBillDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CONTRACTOR_BILL_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CONTRACTOR_BILL_DROPDOWN_DATA",
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

export const getContractorBillById = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getContractorBillById, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_CONTRACTOR_BILL_BY_ID",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_CONTRACTOR_BILL_BY_ID",
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

export const getContractorBillAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getContractorBillAttachment, params, getHeaders)
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

export const addContractorBill = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cashPayment.params;
    axios
      .post(apiEndPoints.addContractorBill, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_PAYMENT_TO_CONTRACTOR_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          if (obj.file && obj.file?.length > 0) {
            dispatch(
              addContractorBillAttchment({
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
            dispatch(getContractorBill(params));
          }
        }
      });
  };
};

export const addContractorBillAttchment = (obj) => {
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
      .post(apiEndPoints.addContractorBillAttchment, formData, getHeaders)
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
          dispatch(getContractorBill(params));
        }
      });
  };
};

// export const addContractorBill = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().contractorBill.params;
//     axios
//       .post(apiEndPoints.addContractorBill, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_CONTRACTOR_BILL_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = obj.PolicyNo + "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.PolicyNo + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_CONTRACTOR_BILL_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getContractorBill(params));
//         }
//       });
//   };
// };

export const deleteContractorBill = (obj) => {
  return (dispatch, getState) => {
    let params = getState().contractorBill.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteContractorBill, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_CONTRACTOR_BILL_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_CONTRACTOR_BILL_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getContractorBill(params));
        }
      });
  };
};
