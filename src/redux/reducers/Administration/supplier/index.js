const initialState = {
  data: [],
  params: null,
  totalPages: 0,
  supplierMetaData: [],
  supplierItemData: [],
  countryList: [],
  stateList: [],
  districtList: [],
  cityList: [],
  itemList: [],
  unitList: [],
  selectedSupplier: {},
};

const SupplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SUPPLIER_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "GET_SUPPLIER_BY_ID":
      return {
        selectedSupplier: action.data,
      };

    case "GET_SUPPLIER_ITEM_DATA":
      return {
        ...state,
        supplierItemData: action.data,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "ADD_SUPPLIER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "GET_SUPPLIER_META_DATA":
      return {
        ...state,
        supplierMetaData: action.data,
        itemList: action.data.Items,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
        successMsg: action.successMsg,
      };

    default:
      return state;
  }
};

export default SupplierReducer;
