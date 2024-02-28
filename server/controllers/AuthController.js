const bcrypt = require("bcrypt");
const User = require("../models/user");
const { genToken } = require("../utilities/AuthToken");
const user = require("../models/user");

const RegisterController = async (req, res, next) => {
  const { fullName, mobile, password, gender, role } = req.body;

  try {
    if (Boolean(role && gender && fullName && mobile && password)) {
      let user = await User.create({
        fullName,
        mobile,
        password,
        role,
        gender,
      });
      if (user) {
        const token = genToken(user._id, user.role, user.fullName);
        if (token) {
          user = { ...user._doc, password: null };
          return res.status(201).json({ user, token });
        } else return res.status(500).json({ err: "Error Generating Token" });
      } else return res.status(404).json({ err: "Data not sent" });
    } else return res.status(500).json({ err: "Values not provided" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const LoginController = async (req, res, next) => {
  const { mobile, password } = req.body;

  try {
    if (mobile && password) {
      let user = await User.findOne({ mobile });
      if (user) {
        if (bcrypt.compare(password, user.password)) {
          const token = genToken(user._id, user.role, user.fullName);
          if (token) {
            user = { ...user._doc, password: null };
            return res.status(200).json({ user, token });
          } else return res.status(500).json({ err: "Error Generating Token" });
        } else return res.status(401).json({ err: "Wrong Credentials" });
      } else return res.status(404).json({ err: "No user found" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { LoginController, RegisterController };
