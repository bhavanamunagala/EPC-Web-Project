const initialState = {
  data: [],
  params: null,
 
};

const EarningMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EARNING_MASTER_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_EARNING_MASTER_DROPDOWN_DATA":
      return {
        ...state,
  
        error: action.error,
        params: action.params,
      };

    case "GET_EARNING_MASTER_BY_ID":
      return {
        ...state,
        selectedEARNING_MASTER: action.data,
      };

    case "ADD_EARNING_MASTER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_EARNING_MASTER_DATA":
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

export default EarningMasterReducer;
