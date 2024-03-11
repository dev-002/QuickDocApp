const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

const fetchListDoctor = async (req, res, next) => {
  const { role } = req.body;

  if (role == 1) {
    let doctorList = await Doctor.find({ role: 2 });

    if (doctorList) {
      doctorList = doctorList.map((doc) => {
        const docObject = doc.toObject();
        docObject.password = null;
        return docObject;
      });
      return res.status(200).json({ ack: true, doctorList });
    }
  } else
    return res.status(401).json({ ack: false, err: "Unauthorized Access" });
};

const fetchListPatient = async (req, res, next) => {
  const { role } = req.body;

  if (role == 1) {
    let patientList = await Patient.find({ role: 3 });

    if (patientList) {
      patientList = patientList.map((doc) => {
        const docObject = doc.toObject();
        docObject.password = null;
        return docObject;
      });
      return res.status(200).json({ ack: true, patientList });
    }
  } else
    return res.status(401).json({ ack: false, err: "Unauthorized Access" });
};

module.exports = { fetchListDoctor, fetchListPatient };
