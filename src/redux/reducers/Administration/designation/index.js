const initialState = {
  designationList: [],
  params: null,
  error: "",
  successMsg: "",
};

const DesignationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DESIGNATION_DATA":
      return {
        ...state,
        designationList: action.data,
        error: action.error,
        params: action.params,
      };

    case "ADD_DESIGNATION_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_DESIGNATION_DATA":
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

export default DesignationReducer;
