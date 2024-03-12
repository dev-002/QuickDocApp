const Appointment = require("../models/appointment");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const AppointmentRequest = async (req, res, next) => {
  let { patientId, doctorId, date, timeSlot, reason } = req.body;
  patientId = new ObjectId(patientId);
  doctorId = new ObjectId(doctorId);

  try {
    if (Boolean(patientId, doctorId, date, timeSlot, reason)) {
      const appointment = await Appointment.create({
        patientId,
        doctorId,
        date,
        timeSlot,
        reason,
      });
      if (appointment) return res.status(201).json({ appointment, ack: true });
      else
        return res
          .status(500)
          .json({ err: "Error while creating appointment", ack: false });
    } else return res.status(404).json({ err: "Values not provided" });
  } catch (err) {
    return res
      .status(500)
      .json({ err, msg: "Error while creating appointment request" });
  }
};

const AppointmentResponse = async (req, res, next) => {
  const { status, appointment_id } = req.body;

  try {
    if (Boolean(appointment_id, status)) {
      const appointment = await Appointment.findByIdAndUpdate(
        appointment_id,
        { $set: { status } },
        { new: true }
      );
      if (appointment) return res.status(200).json({ ack: true, appointment });
      else
        return res
          .status(500)
          .json({ ack: false, msg: "Error Updating Status" });
    } else return res.status(404).json({ err: "Values not provided" });
  } catch (err) {
    return res
      .status(500)
      .json({ err, msg: "Error while Appointment Status Response" });
  }
};

module.exports = {
  AppointmentRequest,
  AppointmentResponse,
};
