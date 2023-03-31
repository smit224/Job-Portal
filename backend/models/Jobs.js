const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  j_title: String,
  j_description: String,
  j_type: String,
  j_categories: String,
  j_location: String,
  j_salary_range: String,
  j_responsibility: String,
  j_requirements: String,
  j_applicant: Number,
});

const JobModel = mongoose.model("Jobs", JobSchema);

module.exports = JobModel;
