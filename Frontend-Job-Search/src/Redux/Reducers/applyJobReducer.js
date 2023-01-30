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

let initJobApply = {
  applyLoding: false,
  appliedStatus: false,
  response: {},
};

export const jobApplyReducer = (state = initJobApply, action) => {
  switch (action.type) {
    case APPLY_JOB_REQUEST:
      return { ...initJobApply, applyLoding: true };
    case APPLY_JOB_SUCCESS:
      return { ...initJobApply, appliedStatus: true, response: action.payload };
    case APPLY_JOB_REST:
      return { ...initJobApply, appliedStatus: false };

    case APPLY_JOB_FAIL:
      return { ...initJobApply, error: action.payload };

    default:
      return state;
  }
};

const appliedJobsState = {
  error: "",
  jobAppliedListStatus: false,
  loading: false,
  message: "",
  response: [],
};

export const applyJobsListReducer = (state = appliedJobsState, action) => {
  switch (action.type) {
    case APPLIED_JOBLIST_REQUEST:
      return { ...appliedJobsState, loading: true };
    case APPLIED_JOBLIST_SUCCESS:
      return { ...appliedJobsState, jobAppliedListStatus: true, response: action.payload };

    case APPLIED_JOBLIST_FAIL:
      return { ...appliedJobsState, error: action.payload };
    case APPLY_JOBLIST_REST:
      return { ...appliedJobsState, jobAppliedListStatus: false };
    default:
      return state;
  }
};

const updateAppliedJobsState = {
  error: "",
  updateAppliedJobStatus: false,
  loading: false,
  message: "",
  response: {},
};
export const updateApplyJobReducer = (state = updateAppliedJobsState, action) => {
  switch (action.type) {
    case APPLIED_JOB_UPDATE_REQUEST:
      return { ...updateApplyJobReducer, loading: true };
    case APPLIED_JOB_UPDATE_SUCCESS:
      return { ...updateApplyJobReducer, jobAppliedListStatus: true, response: action.payload };

    case APPLIED_JOB_UPDATE_FAIL:
      return { ...updateApplyJobReducer, error: action.payload };

    default:
      return state;
  }
};

const deleteAppliedJobsState = {
  error: "",
  deleteAppliedJobStatus: false,
  loading: false,
  message: "",
  response: {},
};
export const deleteApplyJobReducer = (state = deleteAppliedJobsState, action) => {
  switch (action.type) {
    case DELETE_APPLIED_JOB_REQUEST:
      return { ...deleteAppliedJobsState, loading: true };
    case DELETE_APPLIED_JOB_SUCCESS:
      return { ...deleteAppliedJobsState, loading: false, deleteAppliedJobStatus: true, response: action.payload };
    case DELETE_JOBLIST_REST:
      return { ...deleteAppliedJobsState, loading: false, deleteAppliedJobStatus: false };
    case DELETE_APPLIED_JOB_FAIL:
      return { ...deleteAppliedJobsState, loading: false, deleteAppliedJobStatus: false, error: action.payload };

    default:
      return state;
  }
};
