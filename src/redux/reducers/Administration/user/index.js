const initialState = {
  params: null,
  userList: [],
  userMetaData: [],
  error: "",
  successMsg: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_DATA":
      return {
        ...state,
        userList: action.data,
        error: action.error,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "ADD_USER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_USER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "GET_USER_META_DATA":
      return {
        ...state,
        userMetaData: action.data,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
        successMsg: action.successMsg,
      };

    default:
      return state;
  }
};

export default UserReducer;
