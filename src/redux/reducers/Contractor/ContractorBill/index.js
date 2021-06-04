const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  ContractorList: [],
  WorkOrderList: [],
  ItemList: [],
  UnitList: [],
  TaxList: [],
  AccountList: [],
};

const ContractorBillReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONTRACTOR_BILL_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_CONTRACTOR_BILL_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        ContractorList: action.data.Contractors,
        WorkOrderList: action.data.WorkOrders,
        ItemList: action.data.Items,
        UnitList: action.data.Units,
        TaxList: action.data.Taxes,
        AccountList: action.data.Accounts,
        error: action.error,
        params: action.params,
      };

    case "GET_CONTRACTOR_BILL_BY_ID":
      return {
        ...state,
        selectedContractorBill: action.data,
      };

    case "GET_CONTRACTOR_BILL_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_CONTRACTOR_BILL_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_CONTRACTOR_BILL_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_CONTRACTOR_BILL_DATA":
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

export default ContractorBillReducer;
