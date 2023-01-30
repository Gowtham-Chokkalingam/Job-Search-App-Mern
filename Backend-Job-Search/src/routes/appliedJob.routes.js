const express = require("express");
const { postAppliedJob, getAppliedJob, deleteAppliedJob, updateAppliedJob } = require("../controllers/aplliedJobContreller");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/applyJob").post(protect, postAppliedJob);
router.route("/getAppliedjobs").get(protect, getAppliedJob);
router.route("/deleteAppliedjob/:id").delete(protect, deleteAppliedJob);
router.route("/updateAppliedjob/:id").patch(protect, updateAppliedJob);

module.exports = router;
   