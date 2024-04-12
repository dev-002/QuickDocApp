const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const { ObjectId } = require("mongoose").Types;

const listDoctor = async (req, res, next) => {
  try {
    let doctorList = await Doctor.find();
    if (doctorList) {
      doctorList = doctorList.map((doc) => ({ ...doc._doc, password: null }));
      return res.status(200).json({ ack: true, doctorList });
    } else
      return res
        .status(500)
        .json({ ack: false, err: "Error fetching doctorList" });
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

const listAllAppointment = async (req, res, next) => {
  let { doctorId } = req.body;
  doctorId = new ObjectId(doctorId);

  try {
    if (Boolean(doctorId)) {
      const appointmentList = await Appointment.find({
        doctorId,
      });

      if (appointmentList)
        return res.status(200).json({ ack: true, appointmentList });
      else
        return res
          .status(500)
          .json({ ack: false, err: "Error Fetching Appoinment" });
    } else
      return res.status(404).json({ ack: false, err: "No Values Provided" });
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

const getAllSpecialization = async (req, res, next) => {
  try {
    const doctorList = await Doctor.find({});

    if (doctorList) {
      const specialization = [];
      doctorList.map((doc) => {
        if (
          !specialization.includes(doc._doc?.specialization) &&
          doc._doc.specialization != null
        )
          specialization.push(doc._doc?.specialization);
      });
      return res.status(200).json({ ack: true, category: specialization });
    } else
      return res
        .status(500)
        .json({ ack: false, err: "Error Fetching Appoinment" });
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

module.exports = { listDoctor, listAllAppointment, getAllSpecialization };
