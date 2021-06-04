const initialState = {
  data: [],
  params: null,

};

const AutoPayslipReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_AUTO_PAYSLIP_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_AUTO_PAYSLIP_DROPDOWN_DATA":
      return {
        ...state,
      
        error: action.error,
        params: action.params,
      };

    case "GET_AUTO_PAYSLIP_BY_ID":
      return {
        ...state,
        selectedAUTO_PAYSLIP: action.data,
      };

    case "ADD_AUTO_PAYSLIP_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_AUTO_PAYSLIP_DATA":
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

export default AutoPayslipReducer;
