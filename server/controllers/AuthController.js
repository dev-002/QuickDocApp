const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const bcrypt = require("bcrypt");
const { genToken } = require("../utilities/AuthToken");

const RegisterController = async (req, res, next) => {
  const { role } = req.body;

  try {
    // doctor
    if (role == 2) {
      const { name, mobile, password, gender } = req.body;

      if (Boolean(name && mobile && password && gender)) {
        let doctor = await Doctor.create({
          name,
          mobile,
          password,
          gender,
        });
        if (doctor) {
          const token = genToken(doctor._id, doctor.role, doctor.name);
          if (token) {
            doctor = { ...doctor._doc, password: null };
            return res.status(201).json({ ack: true, doctor, token });
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
    // patient or admin
    else {
      const { name, password, mobile, gender } = req.body;
      if (Boolean(name && password && mobile && gender)) {
        let patient = await Patient.create({
          role,
          name,
          password,
          mobile,
          gender,
        });
        if (patient) {
          const token = genToken(patient._id, patient.role, patient.name);
          if (token) {
            patient = { ...patient._doc, password: null };
            return res.status(201).json({ ack: true, patient, token });
          } else
            return res
              .status(500)
              .json({ ack: false, err: "Error Generating Token" });
        } else
          return res
            .status(500)
            .json({ ack: false, msg: "Error Creating patient document" });
      } else
        return res.status(500).json({ ack: false, err: "Values not provided" });
    }
  } catch (err) {
    return res.status(400).json({ ack: false, err });
  }
};

const LoginController = async (req, res, next) => {
  const { role, mobile, password } = req.body;

  try {
    if (Boolean(mobile && password && role)) {
      if (role == 2) {
        let doctor = await Doctor.findOne({ mobile });
        if (doctor) {
          if (await bcrypt.compare(password, doctor.password)) {
            const token = genToken(doctor._id, doctor.role, doctor.name);
            if (token) {
              doctor = { ...doctor._doc, password: null };
              return res.status(200).json({ user: doctor, token });
            } else
              return res
                .status(500)
                .json({ ack: false, err: "Error Generating Token" });
          } else
            return res
              .status(401)
              .json({ ack: false, err: "Wrong Credentials" });
        } else
          return res.status(404).json({ ack: false, err: "No doctor found" });
      } else {
        let patient = await Patient.findOne({ mobile });

        if (patient) {
          if (await bcrypt.compare(password, patient.password)) {
            const token = genToken(patient._id, patient.role, patient.name);
            if (token) {
              patient = { ...patient._doc, password: null };
              return res.status(200).json({ user: patient, token });
            } else
              return res
                .status(500)
                .json({ ack: false, err: "Error Generating Token" });
          } else
            return res
              .status(401)
              .json({ ack: false, err: "Wrong Credentials" });
        } else
          return res.status(404).json({ ack: false, err: "No patient found" });
      }
    }
    return res.status(404).json({ ack: false, err: "No values provided" });
  } catch (err) {
    return res.status(400).json({ ack: false, err });
  }
};

module.exports = { LoginController, RegisterController };
