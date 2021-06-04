const initialState = {
  data: [],
  params: null,
  totalPages: 0,
  ProjectList: [],
  SupplierList: [],
  VehicleList: [],
  UnitList: [],
};

const DieselIssueReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DIESEL_ISSUE_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "GET_DIESEL_ISSUE_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        SupplierList: action.data.Suppliers,
        VehicleList: action.data.Vehicles,
        UnitList: action.data.Units,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "ADD_DIESEL_ISSUE_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "GET_DIESEL_ISSUE_META_DATA":
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

export default DieselIssueReducer;
