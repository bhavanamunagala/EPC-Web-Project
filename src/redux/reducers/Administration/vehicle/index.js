const initialState = {
  data: [],
  params: null,
  vehicleMetaData: [],
  projectList: [],
};

const VehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VEHICLE_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "GET_VEHICLE_META_DATA":
      return {
        ...state,
        vehicleMetaData: action.data,
        projectList: action.data.Projects,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "ADD_VEHICLE_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    default:
      return state;
  }
};

export default VehicleReducer;
