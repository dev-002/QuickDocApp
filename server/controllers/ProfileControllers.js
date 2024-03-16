const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res, next) => {
  let { token } = req.body;

  try {
    token = token.split(" ")[1];
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenVerify) {
      if (tokenVerify.role == 2) {
        const user = await Doctor.findOne({ _id: tokenVerify._id });
      } else {
        const user = await Patient.findOne({ _id: tokenVerify._id });
      }
      if (user) return res.status(200).json({ ack: true, user });
      else return res.status(404).json({ ack: false, err: "No user found" });
    } else return res.status(400).json({ ack: false });
  } catch (error) {
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
