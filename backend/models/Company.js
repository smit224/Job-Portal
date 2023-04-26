const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  c_logo: [String],
  c_name: String,
  c_email: String,
  c_description: String,
  c_address: String,
  c_city: String,
  c_zipcode: Number,
  c_country: String,
  c_state: String,
  c_website: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  // num_of_jobs: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs" }
});

const CompanyModel = mongoose.model("Company", CompanySchema);

module.exports = CompanyModel;
