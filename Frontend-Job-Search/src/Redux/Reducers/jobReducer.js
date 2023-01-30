import {
  GET_ALLJOB_SUCCESS,
  GET_JOBLIST_FAIL,
  GET_JOBLIST_REQUEST,
  GET_JOBLIST_REST,
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

const initStateReg = {
  error: false,
  jobPostStatus: false,
  loading: false,
  message: "",
  jobInfo: {},
};

export const jobPostReducer = (state = initStateReg, action) => {
  switch (action.type) {
    case JOB_POST_REQUEST:
      return { ...initStateReg, loading: true };
    case JOB_POST_SUCCESS:
      return { ...initStateReg, jobPostStatus: true, jobInfo: action.payload };

    case JOB_POST_FAIL:
      return { ...initStateReg, error: action.payload };

    default:
      return state;
  }
};

const initStateGet = {
  loading: false,
  jobGetStatus: false,
  jobs: [],
};
export const jobListReducer = (state = initStateGet, action) => {
  switch (action.type) {
    case GET_JOBLIST_REQUEST:
      return { ...initStateGet, loading: true };

    case GET_ALLJOB_SUCCESS:
      return { ...initStateGet, jobGetStatus: true, jobs: action.payload };

    case GET_JOBLIST_REST:
      return { ...initStateGet };
      
    case GET_JOBLIST_FAIL:
      return { ...initStateGet, error: action.payload };

    default:
      return state;
  }
};

let singleJobState = {
  getSingleJobStauts: false,
  singleJobloading: false,
  jobData: {},
};
export const singleJobReducer = (state = singleJobState, action) => {
  switch (action.type) {
    case GET_SINGLEJOB_REQUEST:
      return { ...singleJobState, singleJobloading: true };
    case GET_SINGLE_JOB_SUCCESS:
      return { ...singleJobState, getSingleJobStauts: true, jobData: action.payload };
    case GET_SINGLE_JOB_FAIL:
      return { ...singleJobState, error: action.payload };
    case REST_SINGLEJOB:
      return { ...singleJobState };

    default:
      return state;
  }
};

let initEditState = {
  editStauts: false,
  editloading: false,
  updatedData: {},
};

export const jobEditReducer = (state = initEditState, action) => {
  switch (action.type) {
    case JOB_EDIT_REQUEST:
      return { ...initEditState, editloading: true };
    case JOB_EDIT_SUCCESS:
      return { ...initEditState, editStauts: true, updatedData: action.payload.updatedJob };
    case JOB_EDIT_FAIL:
      return { ...initEditState, error: action.payload };

    default:
      return state;
  }
};

export const jobDeleteReducer = (state = { success: false, loading: false }, action) => {
  switch (action.type) {
    case JOB_DELETE_REQUEST:
      return { loading: true };
    case JOB_DELETE_SUCCESS:
      return { loading: false, success: true };
    case JOB_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
