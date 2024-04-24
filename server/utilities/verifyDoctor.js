const Doctor = require("../models/doctor");
const { ObjectId } = require("mongoose").Types;

module.exports = async (req, res, next) => {
  try {
    let { doctorid } = req.headers;
    if (doctorid) {
      doctorid = new ObjectId(doctorid);
      const doctor = await Doctor.findById(doctorid);
      if (doctor) {
        req.doctor = doctor;
        next();
      } else return res.status(404).json({ ack: false, msg: "No user found" });
    } else return res.status(401).json({ ack: false, msg: "Not Authorized" });
  } catch (err) {
    return res.status(500).json({ ack: false, msg: err });
  }
};
