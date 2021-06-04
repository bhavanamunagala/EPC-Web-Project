const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  ContractorList: [],
  ItemList: [],
  UnitList: [],
  file: [],
};

const WorkOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WORK_ORDER_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_WORK_ORDER_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        ContractorList: action.data.Contractors,
        ItemList: action.data.Items,
        UnitList: action.data.Units,
        error: action.error,
        params: action.params,
      };

    case "GET_WORK_ORDER_BY_ID":
      return {
        ...state,
        selectedWORK_ORDER: action.data,
      };

    case "GET_WORK_ORDER_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_WORK_ORDER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_WORK_ORDER_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_WORK_ORDER_DATA":
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

export default WorkOrderReducer;
