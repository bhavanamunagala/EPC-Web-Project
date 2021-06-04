import { actions } from "react-table";

const initialState = {
  data: [],
  params: null,
  totalPages: 0,
  ProjectList: [],
  SupplierList: [],
  VehicleList: [],
};

const DieselPurchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DIESEL_PURCHASE_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "GET_DIESEL_PURCHASE_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        SupplierList: action.data.Suppliers,
        VehicleList: action.data.Vehicles,
        params: action.params,
        error: action.error,
        totalPages: action.totalPages,
        successMsg: action.successMsg,
      };

    case "ADD_DIESEL_PURCHASE_DATA":
      return {
        ...state,
        error: action.error,
        successMsg: action.successMsg,
        random: action.random,
      };

    case "GET_DIESEL_PURCHASE_META_DATA":
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

export default DieselPurchaseReducer;
