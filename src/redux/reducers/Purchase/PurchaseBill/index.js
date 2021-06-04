const initialState = {
  data: [],
  params: null,
  basedOnList: [],
  grnList: [],
  departmentList: [],
  projectList: [],
  supplierList: [],
  locationList: [],
  itemList: [],
  unitList: [],
  taxList: [],
  purchaseOrderList: [],
};

const PurchaseBillReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PURCHASE_BILL_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_PURCHASE_BILL_DROPDOWN_DATA":
      return {
        ...state,
        basedOnList: action.data.BasedOn,
        grnList: action.data.GRN,
        departmentList: action.data.Departments,
        projectList: action.data.Projects,
        supplierList: action.data.Suppliers,
        locationList: action.data.Locations,
        itemList: action.data.Items,
        unitList: action.data.Units,
        taxList: action.data.Taxes,
        error: action.error,
        params: action.params,
      };

    case "GET_PURCHASE_BILL_BY_ID":
      return {
        ...state,
        selectedPURCHASE_BILL: action.data,
      };

    case "ADD_PURCHASE_BILL_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_PURCHASE_BILL_DATA":
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

export default PurchaseBillReducer;
