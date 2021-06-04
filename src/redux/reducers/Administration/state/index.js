const initialState = {
  params: null,
  stateList: [],
};

const StateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STATE_DATA":
      return {
        ...state,
        stateList: action.stateList,
        error: action.error,
        params: action.params,
      };

    case "ADD_STATE_DATA":
      return {
        ...state,
        error: action.error,
        successMsg: action.successMsg,
        random: action.random,
      };

    case "DELETE_STATE_DATA":
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

export default StateReducer;
