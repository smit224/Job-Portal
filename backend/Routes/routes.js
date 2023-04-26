const express = require("express");
const multer = require("multer");

const {
  registration,
  login,
  profile,
  logout,
  createjob,
  jobs,
  alljobs,
  companylogo,
  createcompany,
  company,
  singlecompany,
  particularJob,
  createjobsapplied,
  appliedjobs,
  appliedStatus,
  yourjobs,
  resetpassword,
  updateUserInfo,
} = require("../controller/controller");

const router = express.Router();
router.post("/registration", registration);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/createjob", createjob);
const photosMiddleware = multer({ dest: "uploads/" });
router.post("/companylogo", photosMiddleware.array("photos", 100), companylogo);
router.post("/createcompany", createcompany);
router.get("/company", company);
router.get("/company/:id", singlecompany);
router.get("/jobs/:id", jobs);
router.get("/alljobs", alljobs);
router.get("/job/:id", particularJob);
router.post("/createjobsapplied", createjobsapplied);
router.get("/appliedjobs/:id", appliedjobs);
router.post("/status", appliedStatus);
router.get("/yourjobs", yourjobs);
router.post("/resetpassword", resetpassword);
router.put("/userInfo", updateUserInfo);

module.exports = router;
