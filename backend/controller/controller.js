const User = require("../models/User");
const Jobs = require("../models/Jobs");
const Company = require("../models/Company");
const AppliedJobs = require("../models/AppliedJobs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      process.env.SECRET_KEY,
      {},
      async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      }
    );
  });
}

const registration = async (req, res) => {
  const { name, email, password, userType } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log("====req.body===", req.body);

  if (name === "") {
    return res.status(400).json({ error: "Please enter name" });
  } else if (email === "") {
    return res.status(400).json({ error: "Please enter email" });
  } else if (password === "") {
    return res.status(400).json({ error: "Please enter password" });
  } else if (userType === "") {
    return res.status(400).json({ error: "Please enter your type" });
  }

  try {
    const user = await User.create({
      name,
      email,
      password: hash,
      user_type: userType,
      phone: "",
      linkedInURL: "",
      job_role: "",
      gender: "",
      ethinicity: "",
    });

    const token = createToken(user._id);
    return res.status(200).json({ user, token });
  } catch (e) {
    return res.status(400).json(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET_KEY,
        {},
        (err, token) => {
          if (err) throw err;
         return res.cookie("token", token).json(user);
        }
      );
    } else {
      // res.status(422).json("pass not ok");
      return res.status(400).json({ error: "Wrong Password " });
    }
  } else {
    // res.json("not found");
    return res.status(400).json({ error: "Email address not found" });
  }
};

const resetpassword = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.findOneAndUpdate(
    { email: email },
    { password: hash },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        const token = createToken(updatedUser._id);
        return res.status(200).json({
          updatedUser,
          token,
          message: "Password updated successfully",
        });
      }
      return res.status(200).json({ error: "Something went wrong" });
    })
    .catch((error) => {
      res.status(400).json({ error: "Something went wrong" });
    });
};

const profile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, {}, async (err, user) => {
      if (err) throw err;
      const userInfo = await User.findById(user.id);
      res.json(userInfo);
    });
  } else {
    res.json(null);
  }
};

const updateUserInfo = async (req, res) => {
  console.log("-=-=-=-=-=-req body-=-=-=-=", req.body);
  const {userData} = req.body;
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, {}, async (err, user) => {
      if (err) throw err;
      const userInfo = await User.findById(user.id);
      console.log("-=-=-=userInfo=-=-=", userInfo.email);
      User.findOneAndUpdate(
        { email: userInfo.email },
        {
          $set: {
            name: userData.userName,
            phone: userData.phone,
            linkedInURL: userData.linkedinURL,
            job_role: userData.jobRole,
            gender: userData.gender,
          },
        },
        { new: true }
      )
        .then((response) => {
          res.status(200).json({message: "Data Updated Successfully"})
        })
        .catch((err) => {
          console.log("-=-=-=-er-=-=-", err);
          res.status(400).json({error: "Something Went Wrong"})
        });
    });
  } else {
    console.log("-=-=-else-=-=-");
  }
};

const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

const createjob = async (req, res) => {
  const job = req.body;

  const jobs = await Jobs.create({
    j_title: job.j_title,
    j_description: job.j_description,
    j_type: job.j_type,
    j_category: job.j_category,
    j_salary_range: job.j_salary,
    company_id: job.company_id,
    j_skills: job.j_skills,
    j_applicant: job.j_applicant,
  });
  res.status(200).json({ jobs });
};

const companylogo = (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace("uploads/", ""));
  }
  res.status(200).json(uploadFiles);
};

const createcompany = async (req, res) => {
  const userData = await getUserDataFromReq(req);

  const {
    clogo,
    cname,
    cemail,
    cdescription,
    caddress,
    ccity,
    czipcode,
    ccountry,
    cstate,
    cwebsite,
  } = req.body;
  Company.create({
    c_logo: clogo,
    c_name: cname,
    c_email: cemail,
    c_description: cdescription,
    c_address: caddress,
    c_city: ccity,
    c_zipcode: czipcode,
    c_country: ccountry,
    c_state: cstate,
    c_website: cwebsite,
    user_id: userData.id,
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

const company = async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const company_list = await Company.find({ user_id: userData.id });
  const num_of_jobs = [];
  for (let i = 0; i < company_list.length; i++) {
    const xyz = await Jobs.find({ company_id: company_list[i]._id });
    num_of_jobs.push(xyz.length);
  }
  res.status(200).json({ company_list, num_of_jobs });
};

const singlecompany = async (req, res) => {
  const { id } = req.params;
  res.json(await Company.findById(id));
};

const jobs = async (req, res) => {
  const { id } = req.params;
  // const jobs = await Jobs.find({ company_id: id })
  // const job_applicants = await AppliedJobs.find({ job_id: id });
  res.status(200).json(await Jobs.find({ company_id: id }));
};

const alljobs = async (req, res) => {
  const jobs = await Jobs.find();
  const company = [];
  for (let data of jobs) {
    const company_records = await Company.findById({ _id: data.company_id });
    company.push(company_records);
  }
  res.status(200).json({ company, jobs });
};

const particularJob = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const job = await Jobs.findById({ _id: id });
    const company = await Company.findById({ _id: job.company_id });
    res.status(200).json({ job, company });
  }
};

const createjobsapplied = async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { jobApplied, inputValues, particularJob } = req.body;

  const appliedjob = await AppliedJobs.find({ job_id: particularJob });

  const job = await Jobs.findOneAndUpdate(
    { _id: particularJob },
    { $set: { j_applicant: appliedjob.length + 1 } },
    { new: true }
  )
    .then((updatedDoc) => {
      console.log(updatedDoc);
    })
    .catch((err) => {
      console.error(err);
    });

  AppliedJobs.create({
    a_resume: jobApplied.a_resume,
    a_summary: jobApplied.a_summary,
    a_experience: jobApplied.a_experience,
    a_skills: jobApplied.a_skills,
    a_que: inputValues,
    a_status: jobApplied.a_status,
    job_id: particularJob,
    user_id: userData.id,
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

const appliedjobs = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const applicant = await AppliedJobs.find({ job_id: id });
    const job = await Jobs.findById({ _id: id });

    const users = [];
    for (let i = 0; i < applicant.length; i++) {
      const user = await User.find({ _id: applicant[i].user_id });
      users.push(user);
    }
    res.status(200).json({ applicant, job, users });
  }
};

const appliedStatus = async (req, res) => {
  const obj = req.body;
  await AppliedJobs.updateOne(
    { _id: obj.applied_job_id },
    { a_status: obj.applied_job_status }
  )
    .then(() => {
      res.status(200).json({ message: "Successfully Updated the status" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "Something went wrong" });
    });
};

const yourjobs = async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const user_applied_jobs = await AppliedJobs.find({ user_id: userData.id });
  const applied_jobs = [];
  const applied_company = [];
  for (let i = 0; i < user_applied_jobs.length; i++) {
    const job = await Jobs.findById({ _id: user_applied_jobs[i].job_id });
    applied_jobs.push(job);
    const company = await Company.findById({ _id: job.company_id });
    applied_company.push(company);
  }
  res.status(200).json({ user_applied_jobs, applied_jobs, applied_company });
};

module.exports = {
  registration,
  login,
  profile,
  logout,
  createjob,
  jobs,
  alljobs,
  particularJob,
  companylogo,
  createcompany,
  company,
  singlecompany,
  createjobsapplied,
  appliedjobs,
  appliedStatus,
  yourjobs,
  resetpassword,
  updateUserInfo,
};
