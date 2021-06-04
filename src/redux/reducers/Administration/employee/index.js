const initialState = {
  params: null,
  employeeList: [],
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEE_DATA":
      return {
        ...state,
        employeeList: action.data,
        error: action.error,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "ADD_EMPLOYEE_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "DELETE_EMPLOYEE_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    default:
      return state;
  }
};

export default EmployeeReducer;
