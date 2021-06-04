const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  CardList: [],
  AccountList: [],
};

const CardPaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CARD_PAYMENT_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_CARD_PAYMENT_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        CardList: action.data.Cards,
        AccountList: action.data.Acount,
        error: action.error,
        params: action.params,
      };

    case "GET_CARD_PAYMENT_BY_ID":
      return {
        ...state,
        selectedCARD_PAYMENT: action.data,
      };

    case "ADD_CARD_PAYMENT_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_CARD_PAYMENT_DATA":
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

export default CardPaymentReducer;
