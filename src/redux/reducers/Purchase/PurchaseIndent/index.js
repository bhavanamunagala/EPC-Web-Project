const initialState = {
  data: [],
  params: null,
  projectList: [],
  locationList: [],
  itemList: [],
  unitList: [],
  selectedPurchaseIndent: {},
  PODetails: [],
};

const PurchaseIndentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PURCHASE_INDENT_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_PURCHASE_INDENT_DROPDOWN_DATA":
      return {
        ...state,
        projectList: action.data.Projects,
        locationList: action.data.Locations,
        itemList: action.data.Items,
        unitList: action.data.Units,
        error: action.error,
        params: action.params,
      };

    case "GET_PURCHASE_INDENT_BY_ID":
      return {
        ...state,
        selectedPurchaseIndent: action.data,
        PODetails: action.data.ItemDetails,
      };

    case "ADD_PURCHASE_INDENT_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_PURCHASE_INDENT_DATA":
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

export default PurchaseIndentReducer;
