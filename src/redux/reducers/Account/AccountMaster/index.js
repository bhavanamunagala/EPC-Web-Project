const initialState = {
  data: [],
  params: null,
  AccountGroupList: [],
};

const AccountMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ACCOUNT_MASTER_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
      };

    case "GET_ACCOUNT_MASTER_DROPDOWN_DATA":
      return {
        ...state,
        AccountGroupList: action.data.AcountGroup,
        error: action.error,
        params: action.params,
      };

    case "GET_ACCOUNT_MASTER_BY_ID":
      return {
        ...state,
        selectedACCOUNT_MASTER: action.data,
      };

    case "ADD_ACCOUNT_MASTER_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    case "DELETE_ACCOUNT_MASTER_DATA":
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

export default AccountMasterReducer;
