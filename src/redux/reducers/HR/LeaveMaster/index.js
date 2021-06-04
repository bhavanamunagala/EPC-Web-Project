const initialState = {
  data: [],
  params: null,
 
  LeaveTypeList: [],
  selectedLeaveMaster: {},
};

const LeaveMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LEAVE_MASTER_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_LEAVE_MASTER_DROPDOWN_DATA":
      return {
        ...state,
    
        LeaveTypeList: action.data.LeaveTypes,
        error: action.error,
        params: action.params,
      };

    case "GET_LEAVE_MASTER_BY_ID":
      return {
        ...state,
        selectedLeaveMaster: action.data,
      };

    case "GET_LEAVE_MASTER_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_LEAVE_MASTER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_LEAVE_MASTER_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_LEAVE_MASTER_DATA":
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

export default LeaveMasterReducer;
