const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  CardList: [],
  BillList: [],
  RequestList: [],
  ContractorList: [],
  selectedPaymentToContractor: {},
};

const PaymentToContractorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PAYMENT_TO_CONTRACTOR_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_PAYMENT_TO_CONTRACTOR_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        CardList: action.data.Cards,
        BillList: action.data.ContractorBills,
        RequestList: action.data.PaymentRequests,
        ContractorList: action.data.Contractors,
        error: action.error,
        params: action.params,
      };

    case "GET_PAYMENT_TO_CONTRACTOR_BY_ID":
      return {
        ...state,
        selectedPaymentToContractor: action.data,
      };

    case "GET_PAYMENT_TO_CONTRACTOR_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_PAYMENT_TO_CONTRACTOR_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_PAYMENT_TO_CONTRACTOR_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_PAYMENT_TO_CONTRACTOR_DATA":
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

export default PaymentToContractorReducer;
