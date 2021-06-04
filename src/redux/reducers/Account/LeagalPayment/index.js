const initialState = {
  data: [],
  params: null,
  ProjectList: [],
};

const LeagalPaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LEAGAL_PAYMENT_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_LEAGAL_PAYMENT_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        error: action.error,
        params: action.params,
      };

    case "GET_LEAGAL_PAYMENT_BY_ID":
      return {
        ...state,
        selectedLeagalPayment: action.data,
      };
    case "GET_LEAGAL_PAYMENT_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_LEAGAL_PAYMENT_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_LEAGAL_PAYMENT_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_LEAGAL_PAYMENT_DATA":
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

export default LeagalPaymentReducer;
