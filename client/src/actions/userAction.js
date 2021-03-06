import axios from "axios";
import {
  SET_USER,
  LOGOUT_USER,
  AUTH_ERROR,
  RESET_AUTH_ERROR,
} from "./action-types";

export const registerUser = (data) => {
  return (dispatch) => {
    axios
      .post("/api/auth/register", data)
      .then((res) => {
        let d = new Date();
        d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
        document.cookie =
          "token=" + res.data.token + ";expires=" + d.toUTCString() + ";path=/";

        dispatch(logIn(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(authError(error.response.data.message));
        } else {
          dispatch(authError(error.message));
        }
      });
  };
};

export const loginUser = (data) => {
  return (dispatch) => {
    axios
      .post("/api/auth/login", data)
      .then((res) => {
        let d = new Date();
        d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
        document.cookie =
          "token=" + res.data.token + ";expires=" + d.toUTCString() + ";path=/";
        dispatch(logIn(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(authError(error.response.data.message));
        } else {
          dispatch(authError(error.message));
        }
      });
  };
};

export const logIn = (data) => {
  return {
    type: SET_USER,
    payload: data,
  };
};

export const logOut = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

export const resetAuthError = () => {
  return {
    type: RESET_AUTH_ERROR,
  };
};
