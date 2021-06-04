const initialState = {
  params: null,
  projectList: [],
  countryList: [],
  stateList: [],
  districtList: [],
  cityList: [],
  userList: [],
  projectStatusList: [],
};

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECT_DATA":
      return {
        ...state,
        projectList: action.data,
        error: action.error,
        params: action.params,
        successMsg: action.successMsg,
      };

    case "GET_PROJECT_META_DATA":
      return {
        ...state,
        countryList: action.data.Countries,
        stateList: action.data.States,
        districtList: action.data.Districts,
        cityList: action.data.Cities,
        projectStatusList: action.data.ProjectStatus,
        userList: action.data.Employess,
        error: action.error,
        totalPages: action.totalPages,
        params: action.params,
      };

    case "ADD_PROJECT_DATA":
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

export default ProjectReducer;
