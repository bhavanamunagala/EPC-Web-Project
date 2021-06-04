import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getEmployee = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getEmployeeList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_EMPLOYEE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_EMPLOYEE_DATA",
            data: response.data.Data,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const addEmployee = (obj) => {
  return (dispatch, getState) => {
    let params = getState().employee.params;
    axios
      .post(apiEndPoints.addUser, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_EMPLOYEE_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.EmpName + " added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.EmpName + " updated Successfully";
          }
          dispatch({
            type: "ADD_EMPLOYEE_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getEmployee(params));
        }
      });
  };
};

export const deleteEmployee = (obj) => {
  return (dispatch, getState) => {
    let params = getState().employee.params;
    let UserName = obj.EmployeeName;
    delete obj.EmployeeName;
    axios.post(apiEndPoints.deleteUser, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "DELETE_EMPLOYEE_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = UserName + " deleted Successfully";
        dispatch({
          type: "DELETE_EMPLOYEE_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getEmployee(params));
      }
    });
  };
};
