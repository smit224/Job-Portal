const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  try {
    const user = await User.create({
      name,
      email,
      password: hash,
      user_type: userType,
    });

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (e) {
    res.status(422).json(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    console.log("===pasok===", passOk);
    if (passOk) {
      jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET_KEY,
        {},
        (err, token) => {
          console.log("-=-=-=-token-=-=-22=", token);
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
};

const profile = (req, res) => {
  const { token } = req.cookies;
  console.log("-=-=-=-=token-=-=-=", token);
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

const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

module.exports = {
  registration,
  login,
  profile,
  logout,
};
