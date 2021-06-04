const initialState = {
  data: [],
  params: null,
 

  EmployeeList: [],
  selectedLeaveOpening: {},
};

const LeaveOpeningReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LEAVE_OPENING_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_LEAVE_OPENING_DROPDOWN_DATA":
      return {
        ...state,
    
       EmployeeList: action.data.Employess,
        error: action.error,
        params: action.params,
      };

    case "GET_LEAVE_OPENING_BY_ID":
      return {
        ...state,
        selectedLeaveOpening: action.data,
      };

    case "GET_LEAVE_OPENING_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_LEAVE_OPENING_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_LEAVE_OPENING_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_LEAVE_OPENING_DATA":
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

export default LeaveOpeningReducer;
