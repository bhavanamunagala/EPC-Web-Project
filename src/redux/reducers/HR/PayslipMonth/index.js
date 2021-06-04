const initialState = {
  data: [],
  params: null,
 EmployeeList: [],
  
};

const PayslipMonthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PAYSLIP_MONTH_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_PAYSLIP_MONTH_DROPDOWN_DATA":
      return {
        ...state,
       EmployeeList: action.data.Employess,
        error: action.error,
        params: action.params,
      };

    case "GET_PAYSLIP_MONTH_BY_ID":
      return {
        ...state,
        selectedPAYSLIP_MONTH: action.data,
      };

    case "ADD_PAYSLIP_MONTH_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_PAYSLIP_MONTH_DATA":
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

export default PayslipMonthReducer;
