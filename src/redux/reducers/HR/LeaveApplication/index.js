const initialState = {
  data: [],
  params: null,
  LeaveTypesList:[],

  EmployeeList: [],
  selectedLeaveApplication: {},
};

const LeaveApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LEAVE_APPLICATION_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_LEAVE_APPLICATION_DROPDOWN_DATA":
      return {
        ...state,
        LeaveTypesList: action.data.LeaveTypes,
        EmployeeList: action.data.Employess,
        error: action.error,
        params: action.params,
      };

    case "GET_LEAVE_APPLICATION_BY_ID":
      return {
        ...state,
        selectedLeaveApplication: action.data,
      };

    case "GET_LEAVE_APPLICATION_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_LEAVE_APPLICATION_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_LEAVE_APPLICATION_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_LEAVE_APPLICATION_DATA":
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

export default LeaveApplicationReducer;
