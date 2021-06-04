const initialState = {
  params: null,
  totalPages: 0,
  districtList: [],
};

const DistrictReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DISTRICT_DATA":
      return {
        ...state,
        districtList: action.districtList,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
      };

    case "ADD_DISTRICT_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_DISTRICT_DATA":
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

export default DistrictReducer;
