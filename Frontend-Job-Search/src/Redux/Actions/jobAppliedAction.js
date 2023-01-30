import axios from "axios";
import { API_URL } from "../../API/api";
import {
  APPLIED_JOBLIST_FAIL,
  APPLIED_JOBLIST_REQUEST,
  APPLIED_JOBLIST_SUCCESS,
  APPLIED_JOB_UPDATE_FAIL,
  APPLIED_JOB_UPDATE_REQUEST,
  APPLIED_JOB_UPDATE_SUCCESS,
  APPLY_JOBLIST_REST,
  APPLY_JOB_FAIL,
  APPLY_JOB_REQUEST,
  APPLY_JOB_REST,
  APPLY_JOB_SUCCESS,
  DELETE_APPLIED_JOB_FAIL,
  DELETE_APPLIED_JOB_REQUEST,
  DELETE_APPLIED_JOB_SUCCESS,
  DELETE_JOBLIST_REST,
} from "../ActionTypes/JobAppliedTypes";

const API = API_URL;

//> Post-Create

export const jobApplyAction = (jobId, Toaster) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPLY_JOB_REQUEST });

    const {
      UserLogin: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };
    const { data } = await axios.post(`${API}/job/applyJob`, { jobId }, config);

    dispatch({ type: APPLY_JOB_SUCCESS, payload: data });
    dispatch({ type: APPLY_JOBLIST_REST });
    Toaster("Job Applied", `You Have Applied New Job`, "success");
  } catch (error) {
    dispatch({ type: APPLY_JOB_FAIL, payload: error.response.data.message || error.message });
  }
};

//> GetAll
export const getAppliedJobAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLIED_JOBLIST_REQUEST,
    });
   
    dispatch({ type: DELETE_JOBLIST_REST });
    const {
      UserLogin: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",

        Authorization: `Bearer ${token.token}`,
      },
    };
    const { data } = await axios.get(`${API}/job/getAppliedjobs`, config);

    dispatch({
      type: APPLIED_JOBLIST_SUCCESS,
      payload: data.appliedJobs,
    });
    dispatch({ type: APPLY_JOB_REST });
  } catch (error) {
    dispatch({ type: APPLIED_JOBLIST_FAIL, payload: error.response.data.message || error.message });
  }
};

//> Update

export const updateAppliedJobAction = (id, Status,Toaster) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLIED_JOB_UPDATE_REQUEST,
    });

    const {
      UserLogin: { token },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    const { data } = await axios.patch(`${API}/job/updateAppliedjob/${id}`, { Status }, config);
    console.log("data:", data);

    dispatch({
      type: APPLIED_JOB_UPDATE_SUCCESS,
      payload: data.appliedJobs,
    });
    Toaster("Status Updated", `You Have Updated Job Status To ${Status} `, "success");

  } catch (error) {
    dispatch({ type: APPLIED_JOB_UPDATE_FAIL, payload: error.response.data.message || error.message });
  }
};

//> Delete
export const deleteAppliedJobAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_APPLIED_JOB_REQUEST,
    });

    const {
      UserLogin: { token },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    const { data } = await axios.delete(`${API}/job/deleteAppliedjob/${id}`, config);

    dispatch({
      type: DELETE_APPLIED_JOB_SUCCESS,
      payload: data,
    });
    dispatch({ type: APPLY_JOBLIST_REST });
  } catch (error) {
    dispatch({ type: DELETE_APPLIED_JOB_FAIL, payload: error.response.data.message || error.message });
  }
};

//> Reset
export const appliedJobListReset = () => async (dispatch) => {
  dispatch({ type: APPLY_JOBLIST_REST });
};
