const initialState = {
  data: [],
  params: null,
  paymentList: [],
  employeeList: [],
  selectedEmpSalaryInfo: {},

};

const EmpSalaryInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMP_SALARY_INFO_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_EMP_SALARY_INFO_DROPDOWN_DATA":
      return {
        ...state,
        paymentList: action.data.PaymentTypes,
        employeeList: action.data.Employess,
        error: action.error,
        params: action.params,
      };

    case "GET_EMP_SALARY_INFO_BY_ID":
      return {
        ...state,
        selectedEmpSalaryInfo: action.data,

      };

    case "ADD_EMP_SALARY_INFO_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_EMP_SALARY_INFO_DATA":
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

export default EmpSalaryInfoReducer;
