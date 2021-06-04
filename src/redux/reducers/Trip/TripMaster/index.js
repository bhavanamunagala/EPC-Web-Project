const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  SupplierList: [],
  VehicleList: [],
  purchaseOrderList: [],
};

const TripReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TRIP_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_TRIP_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        SupplierList: action.data.Suppliers,
        VehicleList: action.data.Vehicles,
        error: action.error,
        params: action.params,
      };

    case "GET_TRIP_BY_ID":
      return {
        ...state,
        selectedTRIP: action.data,
      };

    case "ADD_TRIP_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_TRIP_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_TRIP_DATA":
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

export default TripReducer;
