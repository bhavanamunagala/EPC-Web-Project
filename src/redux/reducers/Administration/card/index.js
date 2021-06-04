const initialState = {
  data: [],
  params: null,
};

const CardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CARD_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
      };

    case "ADD_CARD_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_CARD_DATA":
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

export default CardReducer;
