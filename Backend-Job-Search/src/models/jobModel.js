const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    position: {
      type: String,
    },
    contract: {
      type: String,
      enum: ["Full-Time", "Part-Time"],
      default: "Full-Time",
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Job = mongoose.model.jobs || mongoose.model("job", jobSchema);

module.exports = Job;
