const initialState = {
  data: [],
  params: null,
  projectList: [],
  locationList: [],
  itemList: [],
  unitList: [],
  supplierList: [],
  purchaseOrderList: [],
  inwList: [],
  selectedGRN: {},
  PVDetails: [],
};

const GRNReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_GRN_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_GRN_DROPDOWN_DATA":
      return {
        ...state,
        projectList: action.data.Projects,
        locationList: action.data.Locations,
        itemList: action.data.Items,
        unitList: action.data.Units,
        supplierList: action.data.Suppliers,
        purchaseOrderList: action.data.PurchaseOrders,
        inwList: action.data.INWDetails,
        error: action.error,
        params: action.params,
      };

    case "GET_GRN_BY_ID":
      return {
        ...state,
        selectedGRN: action.data,
        PVDetails: action.data.INWDetails,
      };

    case "ADD_GRN_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_GRN_DATA":
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

export default GRNReducer;
