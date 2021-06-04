const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  AccountList: [],
  selectedCashPayment: {},
};

const CashPaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CASH_PAYMENT_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_CASH_PAYMENT_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        AccountList: action.data.Acount,
        error: action.error,
        params: action.params,
      };

    case "GET_CASH_PAYMENT_BY_ID":
      return {
        ...state,
        selectedCashPayment: action.data,
      };

    case "ADD_CASH_PAYMENT_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_CASH_PAYMENT_DATA":
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

export default CashPaymentReducer;
