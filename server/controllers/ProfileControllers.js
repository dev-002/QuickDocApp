const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res, next) => {
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

const updateProfile = async (req, res, next) => {
  let { token, profile } = req.body;

  try {
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenVerify) {
      if (role == 3) {
        const patient = await Patient.findByIdAndUpdate(token._id, {
          $set: { ...profile },
        });
        if (patient) {
          return res.status(200).json({ ack: true, user: patient });
        } else
          return res
            .status(500)
            .json({ ack: false, err: "Error updating user profile" });
      } else {
        const doctor = await Doctor.findByIdAndUpdate(token._id, {
          $set: { ...profile },
        });
        if (doctor) {
          return res.status(200).json({ ack: true, user: doctor });
        } else
          return res
            .status(500)
            .json({ ack: false, err: "Error updating user profile" });
      }
    } else return res.status(400).json({ ack: false });
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

module.exports = { getProfile, updateProfile };
