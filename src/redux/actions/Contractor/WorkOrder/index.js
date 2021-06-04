import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getWorkOrder = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getWorkOrderList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_WORK_ORDER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_WORK_ORDER_DATA",
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

export const getWorkOrderDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getWorkOrderDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_WORK_ORDER_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_WORK_ORDER_DROPDOWN_DATA",
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

export const getWorkOrderById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getWorkOrderById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_WORK_ORDER_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_WORK_ORDER_BY_ID",
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

export const getWorkOrderAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getWorkOrderAttachment, params, getHeaders)
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

export const addWorkOrder = (obj) => {
  return (dispatch, getState) => {
    let params = getState().cashPayment.params;
    axios.post(apiEndPoints.addWorkOrder, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "ADD_PAYMENT_TO_CONTRACTOR_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        if (obj.file && obj.file?.length > 0) {
          dispatch(
            addWorkOrderAttchment({
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
          dispatch(getWorkOrder(params));
        }
      }
    });
  };
};

export const addWorkOrderAttchment = (obj) => {
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
      .post(apiEndPoints.addWorkOrderAttchment, formData, getHeaders)
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
          dispatch(getWorkOrder(params));
        }
      });
  };
};

// export const addWorkOrder = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().workOrder.params;
//     axios
//       .post(apiEndPoints.addWorkOrder, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_WORK_ORDER_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = obj.PolicyNo + "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.PolicyNo + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_WORK_ORDER_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getWorkOrder(params));
//         }
//       });
//   };
// };

export const deleteWorkOrder = (obj) => {
  return (dispatch, getState) => {
    let params = getState().workOrder.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteWorkOrder, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_WORK_ORDER_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_WORK_ORDER_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getWorkOrder(params));
        }
      });
  };
};
