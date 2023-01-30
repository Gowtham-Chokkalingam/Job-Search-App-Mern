const AppliedJob = require("../models/appliedJobModel");
const Job = require("../models/jobModel");

const postAppliedJob = async (req, res) => {
  try {
    let foundJob = await Job.findById(req.body.jobId);
    if (foundJob) {
      let Apply = await AppliedJob.create({ job: req.body.jobId, user: req.userId });
      setTimeout(() => {
        res.status(201).json(Apply);
      }, 500);
    } else {
      res.send("Theres is Problem with finding job");
    }
  } catch (error) {
    console.log("error:", error.message);
    res.status(400).send({ message: error.message });
  }
};

// GET
const getAppliedJob = async (req, res) => {
  try {
    let appliedJobs = await AppliedJob.find({ user: req.userId }).populate([{ path: "user", select: ["email", "_id", "name"] }, "job"]);
    res.status(201).json({ appliedJobs: appliedJobs });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateAppliedJob = async (req, res) => {
  const { Status } = req.body;

  const job = await AppliedJob.findById(req.params.id);

  if (job.user.toString() !== req.userId.toString()) {
    throw new Error("You can't perform this action");
  }
  try {
    job.Status = Status;

    const updatedJob = await job.save();
    res.status(201).json({ updatedJob: updatedJob });
  } catch (error) {
    res.status(400).json({ Error: error.message });
    throw new Error("Job Not Found", error.message);
  }
};

const deleteAppliedJob = async (req, res) => {
  const job = await AppliedJob.findById(req.params.id).populate("job");

  if (job.user.toString() !== req.userId.toString()) {
    res.status(400).json({ jobDelted: "You can't perform this action" });
    // throw new Error("You can't perform this action");
  }
  try {
    await job.remove();

    res.status(201).json({ DeleteStatus: "Success", jobDelted: job.job });
  } catch (error) {
    res.status(400).json({ DeleteStatus: error.message });
    throw new Error("You can't perform this action", error.message);
  }
};

module.exports = { postAppliedJob, getAppliedJob, updateAppliedJob, deleteAppliedJob };
 