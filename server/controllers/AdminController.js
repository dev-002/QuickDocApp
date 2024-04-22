const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Appointment = require("../models/appointment");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { genToken } = require("../utilities/AuthToken");

const fetchAnalytic = async (req, res, next) => {
  try {
    const doctor = await Doctor.find();
    const patient = await Patient.find({ role: 3 });

    return res.status(200).json({
      ack: true,
      docCount: doctor.length,
      patientCount: patient.length,
    });
  } catch (err) {
    console.log("Error in fetchAnalytic: ", err);
    return res.status(500).json({ ack: false, msg: err });
  }
};

const fetchListDoctor = async (req, res, next) => {
  const { role } = req.body;

  // if (role == 1) {
  let doctorList = await Doctor.find({ role: 2 });

  if (doctorList) {
    doctorList = doctorList.map((doc) => {
      const docObject = doc.toObject();
      docObject.password = null;
      return docObject;
    });
    return res.status(200).json({ ack: true, doctorList });
  }
  // } else
  //   return res.status(401).json({ ack: false, err: "Unauthorized Access" });
};

const DoctorSignup = async (req, res, next) => {
  const { role, doctor } = req.body;
  try {
    // if admin then only allow
    if (role == 1) {
      const { name, password, mobile, gender, experience, specialization } =
        doctor;

      if (Boolean(name, password, mobile, gender, experience, specialization)) {
        let doctor = await Doctor.create({
          name,
          password,
          mobile,
          gender,
          experience,
          specialization,
        });
        if (doctor) {
          const token = genToken(doctor._id, doctor.role, doctor.name);
          if (token) {
            doctor = { ...doctor._doc, password: null };
            return res.status(201).json({ ack: true, user: doctor, token });
          } else
            return res
              .status(500)
              .json({ ack: false, err: "Error Generating Token" });
        } else
          return res
            .status(500)
            .json({ ack: false, msg: "Error Creating doctor document" });
      } else
        return res.status(500).json({ ack: false, err: "Values not provided" });
    }
  } catch (err) {
    return res.status(400).json({ ack: false, err });
  }
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

const fetchAppointments = async (req, res, next) => {
  let { role, doctorId } = req.body;

  try {
    if (role == 2) {
      if (doctorId) {
        doctorId = ObjectId(doctorId);
        const appointments = await Appointment.find({ doctorId });
      } else {
        const appointments = await Appointment.find();
      }

      return res.status(200).json({ ack: true, appointments });
    } else return res.status(401).json({ ack: false, err: "Unauthorized" });
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

module.exports = {
  fetchAnalytic,
  fetchListDoctor,
  DoctorSignup,
  fetchListPatient,
  fetchAppointments,
};
