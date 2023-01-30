import { legacy_createStore, combineReducers, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import { applyJobsListReducer, deleteApplyJobReducer, jobApplyReducer, updateApplyJobReducer } from "./Redux/Reducers/applyJobReducer";
import { jobDeleteReducer, jobEditReducer, jobListReducer, jobPostReducer, singleJobReducer } from "./Redux/Reducers/jobReducer";
import { registerReducer, userLoginReducer } from "./Redux/Reducers/userReducer";

const reducer = combineReducers({
  UserSignup: registerReducer,
  UserLogin: userLoginReducer,

  JobPost: jobPostReducer,
  JobList: jobListReducer,
  JobDelete: jobDeleteReducer,
  SingleJob: singleJobReducer,
  EditJob: jobEditReducer,

  JobApply: jobApplyReducer,
  AppliedJobs: applyJobsListReducer,
  UpdateAppliedJob: updateApplyJobReducer,
  DelteAppliedJob:deleteApplyJobReducer
});


const middleware = [thunk];
const store = legacy_createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));
export default store;
