const User = require("../models/user");
const jwt = require("jsonwebtoken");

const ProfileController = async (req, res, next) => {
  let { token } = req.body;

  try {
    console.log("Before:", token);
    token = token.split(" ")[1];
    console.log("After:", token);
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenVerify) {
      console.log(tokenVerify);
      return res.status(200).json({ ack: true });
    } else return res.status(400).json({ ack: false });
  } catch (error) {
    console.log("Error in Profile Route:", error);
    return res.status(500).json({ ack: false, err: error });
  }
};

module.exports = { ProfileController };
