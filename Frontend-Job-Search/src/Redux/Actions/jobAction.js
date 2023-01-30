import axios from "axios";
import { API_URL } from "../../API/api";
import {
  GET_ALLJOB_SUCCESS,
  GET_JOBLIST_FAIL,
  GET_JOBLIST_REQUEST,
  GET_SINGLEJOB_REQUEST,
  GET_SINGLE_JOB_FAIL,
  GET_SINGLE_JOB_SUCCESS,
  JOB_DELETE_FAIL,
  JOB_DELETE_REQUEST,
  JOB_DELETE_SUCCESS,
  JOB_EDIT_FAIL,
  JOB_EDIT_REQUEST,
  JOB_EDIT_SUCCESS,
  JOB_POST_FAIL,
  JOB_POST_REQUEST,
  JOB_POST_SUCCESS,
  REST_SINGLEJOB,
} from "../ActionTypes/jobActionTypes";
import { APPLY_JOBLIST_REST } from "../ActionTypes/JobAppliedTypes";

const API = API_URL;

export const jobPostAction = (formData, Toaster) => async (dispatch) => {
  // const { company, position, location, contract } = formData;

  try {
    dispatch({ type: JOB_POST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(`${API}/adminjobpost`, formData, config);
    let {
      message: { companyName },
    } = data;

    dispatch({ type: JOB_POST_SUCCESS, payload: data.message });
    Toaster("New Job Added", `${companyName} Job Added`, "success");
  } catch (error) {
    dispatch({ type: JOB_POST_FAIL, payload: error.response.data.message || error.message });
  }
};

export const getJobListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_JOBLIST_REQUEST,
    });

    const { data } = await axios.get(`${API}/getJobList`);

    dispatch({
      type: GET_ALLJOB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_JOBLIST_FAIL, payload: error.response.data.message || error.message });
  }
};

export const getSingleJobAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SINGLEJOB_REQUEST,
    });

    const { data } = await axios.get(`${API}/getSingleJob/${id}`);

    dispatch({
      type: GET_SINGLE_JOB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: GET_SINGLE_JOB_FAIL,
      payload: message,
    });
  }
};

export const resetSingleJobAction = () => async (dispatch) => {
  dispatch({ type: REST_SINGLEJOB });
};

export const jobEditAction = (form, Toaster) => async (dispatch, getState) => {
  console.log("form:", form);
  try {
    dispatch({
      type: JOB_EDIT_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.put(`${API}/adminjobpostEidt/${form._id}`, form, config);
    let {
      updatedJob: { companyName },
    } = data;
    console.log("companyName:", companyName);
    Toaster("Job Updated", `${companyName} Job Updated Successfully`, "success");
    dispatch({
      type: JOB_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: JOB_EDIT_FAIL,
      payload: message,
    });
  }
};

export const deleteNoteAction = (id, Toaster) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`${API}/getJobList/${id}`);
    console.log("data:", data);
    let {
      deletedJob: { companyName },
    } = data;
    dispatch({
      type: JOB_DELETE_SUCCESS,
      payload: data,
    });

    Toaster("Job Deleted", `${companyName} Job Deleted Successfully`, "warning");
    dispatch({
      type: APPLY_JOBLIST_REST,
    });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: JOB_DELETE_FAIL,
      payload: message,
    });
  }
};
