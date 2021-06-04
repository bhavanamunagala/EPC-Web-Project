const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  CardList: [],
  file: [],
};

const CardReceiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CARD_RECEIPT_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_CARD_RECEIPT_DROPDOWN_DATA":
      console.log("data", action.data);
      return {
        ...state,
        ProjectList: action.data.Projects,
        CardList: action.data.Cards,
        error: action.error,
        params: action.params,
      };

    case "GET_CARD_RECEIPT_BY_ID":
      return {
        ...state,
        selectedCARD_RECEIPT: action.data,
      };

    case "GET_CARD_RECEIPT_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_CARD_RECEIPT_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_CARD_RECEIPT_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_CARD_RECEIPT_DATA":
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

export default CardReceiptReducer;
