import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_REST,
  USER_REGISTER_SUCCESS,
  USER_WRONG_CREDENTIALS,
} from "../ActionTypes/userActionTypes";

const initStateReg = {
  error: false,
  registerStatus: false,
  loading: false,
  message: "",
  userInfo: {},
};

export const registerReducer = (state = initStateReg, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...initStateReg, loading: true };

    case USER_REGISTER_SUCCESS:
      return { ...initStateReg, registerStatus: true, userInfo: action.payload };

    case USER_REGISTER_REST:
      return { ...initStateReg };

    case USER_REGISTER_FAIL:
      return { ...initStateReg, error: action.payload };

    default:
      return state;
  }
};

const loginState = {
  credentialsStatus: false,
  error: false,
  loginStatus: false,
  loading: false,
  errorMsg: "",
  token: {},
};
export const userLoginReducer = (state = loginState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...loginState, loading: true };

    case USER_LOGIN_SUCCESS:
      return { ...loginState, loginStatus: true, token: action.payload };

    case USER_WRONG_CREDENTIALS:
      return { ...loginState, credentialsStatus: true, errorMsg: action.payload };

    case USER_LOGIN_FAIL:
      return { ...loginState, error: true, errorMsg: action.payload };

    case USER_LOGOUT:
      return { ...loginState };

    default:
      return state;
  }
};
