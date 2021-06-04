const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  PersonList: [],
  selectedEmployeeTransfer: {},
};

const EmployeeTransferReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEE_AND_PROJECT_BINDING_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_EMPLOYEE_AND_PROJECT_BINDING_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        PersonList: action.data.Employess,
        error: action.error,
        params: action.params,
      };

    case "GET_EMPLOYEE_TRANSFER_BY_ID":
      return {
        ...state,
        selectedEmployeeTransfer: action.data,
      };

    case "GET_EMPLOYEE_TRANSFER_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_EMPLOYEE_TRANSFER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_EMPLOYEE_TRANSFER_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_EMPLOYEE_TRANSFER_DATA":
      return {
        ...state,
        successMsg: action.successMsg,
        error: action.error,
        random: action.random,
      };

    default:
      return state;
  }
};

export default EmployeeTransferReducer;
