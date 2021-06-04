const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  file: [],
};

const ProjectAttendanceMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECT_ATTENDANCE_MASTER_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_PROJECT_ATTENDANCE_MASTER_DROPDOWN_DATA":
      console.log("data", action.data);
      return {
        ...state,
        ProjectList: action.data.Projects,
      
        error: action.error,
        params: action.params,
      };

    case "GET_PROJECT_ATTENDANCE_MASTER_BY_ID":
      return {
        ...state,
        selectedProjectAttendanceMaster: action.data,
      };

    case "GET_PROJECT_ATTENDANCE_MASTER_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_PROJECT_ATTENDANCE_MASTER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_PROJECT_ATTENDANCE_MASTER_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_PROJECT_ATTENDANCE_MASTER_DATA":
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

export default ProjectAttendanceMasterReducer;
