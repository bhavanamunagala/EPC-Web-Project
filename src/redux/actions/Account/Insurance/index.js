import axios from "axios";
import moment from "moment";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getInsurance = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getInsuranceList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_INSURANCE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_INSURANCE_DATA",
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

export const getInsuranceDropDown = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getInsuranceDropDown, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_INSURANCE_DROPDOWN_DATA",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_INSURANCE_DROPDOWN_DATA",
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

export const getInsuranceById = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getInsuranceById, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_INSURANCE_BY_ID",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_INSURANCE_BY_ID",
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

export const getInsuranceAttachment = (params) => {
  return async (dispatch) => {
    await axios
      .post(apiEndPoints.getInsuranceAttachment, params, getHeaders)
      .then(
        (response) => {
          if (response.data.Status !== 1 && response.data.ErrorMessage) {
            dispatch({
              type: "GET_INSURANCE_ATTACHMENT",
              error: response.data.ErrorMessage,
            });
          } else {
            dispatch({
              type: "GET_INSURANCE_ATTACHMENT",
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

export const addInsurance = (obj) => {
  return (dispatch, getState) => {
    let params = getState().insurance.params;
    axios.post(apiEndPoints.addInsurance, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "ADD_INSURANCE_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        if (obj.file && obj.file?.length > 0) {
          dispatch(
            addInsuranceAttachment({
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
            type: "ADD_INSURANCE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getInsurance(params));
        }
      }
    });
  };
};

export const addInsuranceAttachment = (obj) => {
  return (dispatch, getState) => {
    let params = getState().insurance.params;
    var formData = new FormData();
    formData.append("IDNumber", obj.IDNumber);
    formData.append("file", obj.file);
    formData.append("CreatedBy", obj.CreatedBy);
    formData.append("CreatedDate", obj.CreatedDate);
    formData.append("UpdatedBy", obj.UpdatedBy);
    formData.append("UpdatedDate", obj.UpdatedDate);
    axios
      .post(apiEndPoints.addInsuranceAttachment, formData, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_INSURANCE_ATTACHMENT",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = "Added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.Code + " updated Successfully";
          }
          dispatch({
            type: "ADD_INSURANCE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getInsurance(params));
        }
      });
  };
};

// export const addInsurance = (obj) => {
//   return (dispatch, getState) => {
//     let params = getState().insurance.params;
//     axios
//       .post(apiEndPoints.addInsurance, obj, getHeaders)

//       .then((response) => {
//         if (response.data.Status !== 1 && response.data.ErrorMessage) {
//           dispatch({
//             type: "ADD_INSURANCE_DATA",
//             error: response.data.ErrorMessage,
//           });
//         } else {
//           let successMsg = obj.PolicyNo + "Added Successfully";
//           if (obj.IDNumber) {
//             successMsg = obj.PolicyNo + " updated Successfully";
//           }
//           dispatch({
//             type: "ADD_INSURANCE_DATA",
//             obj,
//             successMsg,
//             random: Math.random(),
//           });
//           dispatch(getInsurance(params));
//         }
//       });
//   };
// };

export const deleteInsurance = (obj) => {
  return (dispatch, getState) => {
    let params = getState().insurance.params;
    let PolicyNo = obj.PolicyNo;
    delete obj.PolicyNo;
    axios
      .post(apiEndPoints.deleteInsurance, obj, getHeaders)
      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "DELETE_INSURANCE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = PolicyNo + " deleted Successfully";
          dispatch({
            type: "DELETE_INSURANCE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getInsurance(params));
        }
      });
  };
};
