const initialState = {
  data: [],
  params: null,
};

const DeductionMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DEDUCTION_MASTER_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_DEDUCTION_MASTER_DROPDOWN_DATA":
      return {
        ...state,
        
        error: action.error,
        params: action.params,
      };

    case "GET_DEDUCTION_MASTER_BY_ID":
      return {
        ...state,
        selectedDEDUCTION_MASTER: action.data,
      };

    case "ADD_DEDUCTION_MASTER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_DEDUCTION_MASTER_DATA":
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

export default DeductionMasterReducer;
