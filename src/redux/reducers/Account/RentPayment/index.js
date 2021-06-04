const initialState = {
  data: [],
  params: null,
  ProjectList: [],
  HouseList: [],
  selectedRentPayment: {},
};

const RentPaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RENT_PAYMENT_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_RENT_PAYMENT_DROPDOWN_DATA":
      return {
        ...state,
        ProjectList: action.data.Projects,
        HouseList: action.data.Rooms,
        error: action.error,
        params: action.params,
      };

    case "GET_RENT_PAYMENT_BY_ID":
      return {
        ...state,
        selectedRentPayment: action.data,
      };

    case "GET_RENT_PAYMENT_ATTACHMENT":
      return {
        ...state,
        file: action.data,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "ADD_RENT_PAYMENT_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };
    case "ADD_RENT_PAYMENT_ATTACHMENT":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_RENT_PAYMENT_DATA":
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

export default RentPaymentReducer;
