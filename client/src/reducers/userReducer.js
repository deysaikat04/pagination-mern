import {
  SET_USER,
  LOGOUT_USER,
  AUTH_ERROR,
  RESET_AUTH_ERROR,
} from "../actions/action-types";

const initState = {
  isLoggedin: false,
  token: "",
  error: false,
  errorMsg: "",
};

export default function userReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        token: payload,
        isLoggedin: true,
        error: false,
        errorMsg: "",
      };

    case LOGOUT_USER:
      return {
        ...state,
        isLoggedin: false,
        token: "",
        error: false,
        errorMsg: "",
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoggedin: false,
        token: "",
        error: true,
        errorMsg: payload,
      };
    case RESET_AUTH_ERROR:
      return {
        ...state,
        error: false,
        errorMsg: "",
      };

    default:
      return {
        ...state,
      };
  }
}
