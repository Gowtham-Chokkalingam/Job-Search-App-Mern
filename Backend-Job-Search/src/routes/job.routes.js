const express = require("express");
const { adminPostJob, getJobList, deleteJob, getSingleJob, adminEditJob, getJobByCity } = require("../controllers/jobController");

const router = express.Router();

//> Jobs Route
router.post("/adminjobpost", adminPostJob);
router.get("/getJobList", getJobList);
router.put("/adminjobpostEidt/:id", adminEditJob);

router.get("/getSingleJob/:id", getSingleJob);
router.delete("/getJobList/:id", deleteJob);

router.get("/getJobByCity", getJobByCity);

module.exports = router;
 