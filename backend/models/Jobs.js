const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  j_title: String,
  j_description: String,
  j_type: String,
  j_category: String,
  j_location: String,
  j_salary_range: String,
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  j_skills: [String],
  j_applicant: Number,
});

const JobModel = mongoose.model("Jobs", JobSchema);

module.exports = JobModel;
