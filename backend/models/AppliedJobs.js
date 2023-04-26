const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppliedJobsSchema = new Schema({
  a_resume: [String],
  a_summary: String,
  a_experience: Number,
  a_skills: [String],
  a_que: {type: Schema.Types.Mixed},
  a_status: String,
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  // num_of_jobs: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs" }
});

const AppliedJobsModel = mongoose.model("AppliedJobs", AppliedJobsSchema);

module.exports = AppliedJobsModel;
