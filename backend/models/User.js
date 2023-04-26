const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  user_type: String,
  phone: Number,
  linkedInURL: String,
  job_role: String,
  gender: String,
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
