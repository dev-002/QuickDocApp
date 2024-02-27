const bcrypt = require("bcrypt");
const User = require("../models/user");

const LoginController = async (req, res, next) => {
  const { mobile, password } = req.body;

  try {
    if (mobile && password) {
      const user = await User.findOne({ mobile });
      if (user) {
        if (bcrypt.compare(password, user.password)) {
          return res.status(200).json(user);
        } else return res.status(401).json("Wrong Credentials");
      } else return res.status(404).json("No user found");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const RegisterController = async (req, res, next) => {
  const { fullName, mobile, password, role } = req.body;

  try {
    if (fullName && mobile && password && role) {
      const user = await User.create({ fullName, mobile, password, role });
      if (user) {
        return res.status(201).json(user);
      } else return res.status(404).json("Data not sent");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { LoginController, RegisterController };
