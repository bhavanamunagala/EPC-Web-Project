const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  PersonList: [],
  selectedCashReceipt: {},
};

const CashReceiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CASH_RECEIPT_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_CASH_RECEIPT_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        PersonList: action.data.Employess,
        error: action.error,
        params: action.params,
      };

    case "GET_CASH_RECEIPT_BY_ID":
      return {
        ...state,
        selectedCashReceipt: action.data,
      };

    case "GET_CASH_RECEIPT_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_CASH_RECEIPT_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_CASH_RECEIPT_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_CASH_RECEIPT_DATA":
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

export default CashReceiptReducer;
