const initialState = {
  data: [],
  params: null,
  totalPages: 0,
};

const CountryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COUNTRY_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
      };

    case "ADD_COUNTRY_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_COUNTRY_DATA":
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

export default CountryReducer;
