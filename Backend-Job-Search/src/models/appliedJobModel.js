const mongoose = require("mongoose");

const jobAppliedSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  Status: {
    type: String,
    enum: ["In-Progress", "Completed"],
    default: "In-Progress",
  },
});

const AppliedJob = mongoose.model.appliedJobs || mongoose.model("appliedJob", jobAppliedSchema);
module.exports = AppliedJob;
