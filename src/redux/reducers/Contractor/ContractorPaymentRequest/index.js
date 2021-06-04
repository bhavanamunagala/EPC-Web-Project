const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  ContractorList: [],
  WorkOrderList: [],
  BillList: [],
};

const ContractorPaymentRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONTRACTOR_PAYMENT_REQUEST_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_CONTRACTOR_PAYMENT_REQUEST_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        ContractorList: action.data.Contractors,
        WorkOrderList: action.data.WorkOrders,
        BillList: action.data.ContractorBills,
        error: action.error,
        params: action.params,
      };

    case "GET_CONTRACTOR_PAYMENT_REQUEST_BY_ID":
      return {
        ...state,
        selectedCONTRACTOR_PAYMENT_REQUEST: action.data,
      };

    case "ADD_CONTRACTOR_PAYMENT_REQUEST_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_CONTRACTOR_PAYMENT_REQUEST_DATA":
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

export default ContractorPaymentRequestReducer;
