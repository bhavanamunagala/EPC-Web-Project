const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};
const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
      };
    case "GET_GROUP_RIGHTS":
      return {
        ...state,
        rights: action.data,
        error: action.error,
      };
    case "GET_DEFAULT_RIGHTS":
      return {
        ...state,
        rights: action.data,
        error: action.error,
      };
    case "SUBMIT_ROLE_DATA":
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
export default RoleReducer;
