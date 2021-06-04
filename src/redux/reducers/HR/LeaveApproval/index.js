const initialState = {
  data: [],
  params: null,
  EmployeeList: [],
  EmployeeCodeList: [],
};

const LeaveApprovalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LEAVE_APPROVAL_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_LEAVE_APPROVAL_DROPDOWN_DATA":
      return {
        ...state,
        EmployeeList: action.data.Employees,
     
        error: action.error,
        params: action.params,
      };

    case "GET_LEAVE_APPROVAL_BY_ID":
      return {
        ...state,
        selectedLEAVE_APPROVAL: action.data,
      };

    case "ADD_LEAVE_APPROVAL_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_LEAVE_APPROVAL_DATA":
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

export default LeaveApprovalReducer;
