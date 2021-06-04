const initialState = {
  data: [],
  params: null,
  projectList: [],
  supplierList: [],
  basedOnList: [],
  itemList: [],
  unitList: [],
  departmentList: [],
  purchaseIndentList: [],
  taxList: [],
  selectedPO: {},
  inwList: [],
  file: [],
};

const PurchaseOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PURCHASE_ORDER_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_PURCHASE_ORDER_DROPDOWN_DATA":
      return {
        ...state,
        projectList: action.data.Projects,
        supplierList: action.data.Suppliers,
        basedOnList: action.data.BasedOn,
        itemList: action.data.Items,
        unitList: action.data.Units,
        departmentList: action.data.Departments,
        purchaseIndentList: action.data.PurchaseIndents,
        taxList: action.data.Taxes,
        error: action.error,
        params: action.params,
      };

    case "GET_PURCHASE_ORDER_BY_ID":
      return {
        ...state,
        selectedPO: action.data,
        inwList: action.data.PODetails,
      };

    case "GET_PURCHASE_ORDER_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_PURCHASE_ORDER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_PURCHASE_ORDER_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_PURCHASE_ORDER_DATA":
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

export default PurchaseOrderReducer;
