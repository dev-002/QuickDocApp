const Patient = require("../models/patient");
const { ObjectId } = require("mongoose").Types;

module.exports = async (req, res, next) => {
  try {
    let { patientid } = req.headers;
    if (patientid) {
      patientid = new ObjectId(patientid);
      const patient = await Patient.findById(patientid);
      if (patient) {
        req.patient = patient;
        next();
      } else return res.status(404).json({ ack: false, msg: "No user found" });
    } else return res.status(401).json({ ack: false, msg: "Not Authorized" });
  } catch (err) {
    return res.status(500).json({ ack: false, msg: err });
  }
};
