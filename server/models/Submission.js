const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, default: "" },
  interests: { type: String, default: "" },
  message: { type: String, required: true },
  submitted_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
