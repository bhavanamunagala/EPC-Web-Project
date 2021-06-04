const initialState = {
  data: [],
  params: null,
  projectList: [],
  coutryList: [],
  stateList: [],
  districtList: [],
  cityList: [],
};

const RoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ROOM_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "GET_ROOM_META_DATA":
      return {
        ...state,
        projectList: action.data.Projects,
        countryList: action.data.Countries,
        stateList: action.data.States,
        districtList: action.data.Districts,
        cityList: action.data.Cities,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "ADD_ROOM_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    default:
      return state;
  }
};

export default RoomReducer;
