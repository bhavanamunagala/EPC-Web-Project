import { authConstants } from "../../../constant/auth.constant";

let initialState = {
  user: null,
  loginMetaData: {},
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_WITH_EMAIL: {
      return { ...state, values: action.payload };
    }

    case authConstants.LOGIN_WITH_JWT: {
      return {
        ...state,
        values: action.payload,
        user: action.payload.loggedInUser,
      };
    }
    case authConstants.LOGOUT_WITH_JWT: {
      return { ...state, values: action.payload, user: null };
    }

    case authConstants.CHANGE_ROLE: {
      return { ...state, userRole: action.userRole };
    }

    case "GET_LOGIN_META_DATA":
      return {
        ...state,
        loginMetaData: action.data,
      };

    default: {
      return state;
    }
  }
};
