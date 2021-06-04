const initialState = {
  data: [],
  params: null,
  VehicleTypeList: [],
  VehicleList: [],
  file: [],
};

const InsuranceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INSURANCE_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_INSURANCE_DROPDOWN_DATA":
      return {
        ...state,
        VehicleTypeList: action.data.VehicleTypes,
        VehicleList: action.data.Vehicles,
        error: action.error,
        params: action.params,
      };

    case "GET_INSURANCE_BY_ID":
      return {
        ...state,
        selectedINSURANCE: action.data,
      };

    case "GET_INSURANCE_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_INSURANCE_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_INSURANCE_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_INSURANCE_DATA":
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

export default InsuranceReducer;
