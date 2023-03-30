const express = require("express");

const {
  registration,
  login,
  profile,
  logout,
} = require("../controller/controller");

const router = express.Router();
router.post("/registration", registration);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);

module.exports = router;
