const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  ContractorList: [],
  WorkOrderList: [],
  RequestList: [],
  BillList: [],
};

const ContractorAdvancedSettlementReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONTRACTOR_ADVANCED_SETTLEMENT_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_CONTRACTOR_ADVANCED_SETTLEMENT_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        ContractorList: action.data.Contractors,
        WorkOrderList: action.data.WorkOrders,
        RequestList: action.data.PaymentRequests,
        BillList: action.data.ContractorBills,
        error: action.error,
        params: action.params,
      };

    case "GET_CONTRACTOR_ADVANCED_SETTLEMENT_BY_ID":
      return {
        ...state,
        selectedContractorAdvancedSettlement: action.data,
      };

    case "ADD_CONTRACTOR_ADVANCED_SETTLEMENT_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_CONTRACTOR_ADVANCED_SETTLEMENT_DATA":
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

export default ContractorAdvancedSettlementReducer;
