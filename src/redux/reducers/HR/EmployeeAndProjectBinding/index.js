const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  PersonList: [],
  selectedProjectEmpMaster: {},
};

const ProjectEmpMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEE_AND_PROJECT_BINDING_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_EMPLOYEE_AND_PROJECT_BINDING_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        PersonList: action.data.Projects,
        error: action.error,
        params: action.params,
      };

    case "GET_PROJECT_WISE_ATTENDANCE_BY_ID":
      return {
        ...state,
        selectedProjectEmpMaster: action.data,
      };

    case "GET_PROJECT_WISE_ATTENDANCE_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_PROJECT_WISE_ATTENDANCE_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_PROJECT_WISE_ATTENDANCE_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_PROJECT_WISE_ATTENDANCE_DATA":
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

export default ProjectEmpMasterReducer;
