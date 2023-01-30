import axios from "axios";
import { API_URL } from "../../API/api";
import { GET_JOBLIST_REST } from "../ActionTypes/jobActionTypes";
import { APPLY_JOBLIST_REST, APPLY_JOB_REST } from "../ActionTypes/JobAppliedTypes";
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

// const API = `http://localhost:8080`;
const API = API_URL;

// > signup Action
export const userSignUpAction = (formData) => async (dispatch) => {
  try {

    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(`${API}/register`, formData, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.message || error.message });
  }
};

// //> Signin Action

export const userLoginInAction = (email, password, Toaster) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(`${API}/login`, { email, password });

    if (data && !data.error) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      Toaster(
        `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} Login Success`,
        `Welcome To Job Search ${data.role.toUpperCase()} Page`,
        "success"
      );
    } else {
      dispatch({ type: USER_WRONG_CREDENTIALS, payload: "User not Found" });
      Toaster(` Login Failed`, `${data.message} Try Again`, "warning");
    }
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message || error.message });
  }
};

// > Logout

export const userLogoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: APPLY_JOBLIST_REST });
  dispatch({ type: APPLY_JOB_REST });
  dispatch({ type: GET_JOBLIST_REST });
  dispatch({ type: USER_REGISTER_REST });
};
