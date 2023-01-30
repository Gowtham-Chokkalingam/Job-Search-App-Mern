const AppliedJob = require("../models/appliedJobModel");
const Job = require("../models/jobModel");

const adminPostJob = async (req, res) => {
  const { companyName, position, location, contract } = req.body;
  try {
    const newJob = await Job.create({
      companyName,
      position,
      location,
      contract,
    });

    res.status(201).json({ message: newJob, status: "New Job has been Added" });
  } catch (error) {
    console.log("Error at backend jobpost Route", error.message);
    res.status(500).json({ message: error.message });
  }
};

const adminEditJob = async (req, res) => {
  const { companyName, position, location, contract } = req.body;

  const job = await Job.findById(req.params.id);
  if (job) {
    job.companyName = companyName;
    job.position = position;
    job.location = location;
    job.contract = contract;

    //> here we are not useing job model becz its for crearting-- for updating we need to use the note which is getting from the findById

    const updatedJob = await job.save();
    res.json({ updatedJob: updatedJob });
  } else {
    res.status(400);

    throw new Error("Joblist Not Found");
  }
};

const getJobList = async (req, res) => {
  try {
    const jobList = await Job.find();

    res.status(201).json({ jobsList: jobList });
  } catch (error) {
    console.log("Error at backend jobpost Route", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getSingleJob = async (req, res) => {
  const singleJob = await Job.findById(req.params.id);

  if (singleJob) {
    // res.status(201).json({ SingleJob: singleJob });
    res.status(201).send({ SingleJob: singleJob });
  } else {
    res.status(400);

    throw new Error("jobList Not Found");
  }
};

const deleteJob = async (req, res) => {
  console.log("req.params.id:", req.params.id);
  const deletedJob = await Job.findOneAndDelete({ _id: req.params.id });
  console.log("deletedJob:", deletedJob);

  if (deletedJob) {
    const deletedApplied = await AppliedJob.deleteMany({
      "job": req.params.id,
    });
    console.log("deletedApplied:", deletedApplied);
    res.json({ deletedJob: deletedJob, status: "Job Deleted" });
  } else {
    res.status(400); 

    throw new Error("jobList Not Found");
  }
};

// `${API_URL}/getJobByCity?name=${query}
const getJobByCity = async (req, res) => {
  let { name } = req.query;

  if (!name) {
    name = "";
  }

  //> The $regex operator is used to create a regular expression that matches the user's input, and the $options parameter is set to "i" to perform a case-insensitive search.

  try {
    const data = await Job.find({ location: { $regex: new RegExp(name, "i") } });
    res.send(data);
  } catch (err) {
    res.send({ error: true, message: err.message });
  }
};

module.exports = { adminPostJob, getJobList, getJobByCity, getSingleJob, adminEditJob, deleteJob };
let response = [
  {
    _id: "63d62a098b6c0a2dadf3451e",
    job: {
      _id: "63d5566f2a43dc41da49e3cb",
      companyName: "OrangeTech",
      position: "Remote DevOps Engineer",
      contract: "Part-Time",
      location: "Coimbatore",
      createdAt: "2023-01-28T17:07:59.359Z",
      updatedAt: "2023-01-28T17:07:59.359Z",
      __v: 0,
    },
    user: {
      _id: "63cf7cb43cee471aab270240",
      email: "g@gmail.com",
      name: "Gowtham user",
    },
    Status: "In-Progress",
    __v: 0,
  },
  {
    _id: "63d62a4c8b6c0a2dadf34526",
    job: {
      _id: "63d556652a43dc41da49e3c9",
      companyName: "Facebook",
      position: "Haskell and Pure Script Dev",
      contract: "Full-Time",
      location: "Pune",
      createdAt: "2023-01-28T17:07:49.952Z",
      updatedAt: "2023-01-28T17:07:49.952Z",
      __v: 0,
    },
    user: {
      _id: "63cf7cb43cee471aab270240",
      email: "g@gmail.com",
      name: "Gowtham user",
    },
    Status: "In-Progress",
    __v: 0,
  },
];
