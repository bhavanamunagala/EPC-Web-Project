const initialState = {
  data: [],
  params: null,
 
};

const HolidayMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_HOLIDAY_MASTER_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_HOLIDAY_MASTER_DROPDOWN_DATA":
      return {
        ...state,
  
        error: action.error,
        params: action.params,
      };

    case "GET_HOLIDAY_MASTER_BY_ID":
      return {
        ...state,
        selectedHOLIDAY_MASTER: action.data,
      };

    case "ADD_HOLIDAY_MASTER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_HOLIDAY_MASTER_DATA":
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

export default HolidayMasterReducer;
