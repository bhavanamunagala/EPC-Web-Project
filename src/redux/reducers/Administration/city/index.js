const initialState = {
  cityList: [],
  params: null,
};

const CityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CITY_DATA":
      return {
        ...state,
        cityList: action.cityList,
        error: action.error,
        params: action.params,
      };

    case "ADD_CITY_DATA":
      return {
        ...state,
        error: action.error,
        successMsg: action.successMsg,
        random: action.random,
      };

    case "DELETE_CITY_DATA":
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

export default CityReducer;
