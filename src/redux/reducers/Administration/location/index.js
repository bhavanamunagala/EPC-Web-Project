const initialState = {
  data: [],
  params: null,
};

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOCATION_DATA":
      return {
        ...state,
        data: action.data,
        params: action.params,
        error: action.error,
        random: action.random,
      };

    case "ADD_LOCATION_DATA":
      return {
        ...state,
        error: action.error,
        successMsg: action.successMsg,
        random: action.random,
      };

    default:
      return state;
  }
};

export default LocationReducer;
