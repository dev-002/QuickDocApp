const Appointment = require("../models/appointment");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const AppointmentRequestController = async (req, res, next) => {
  let { patient, doctor, date, timeSlot, patientGender } = req.body;
  patient = new ObjectId(patient);
  doctor = new ObjectId(doctor);

  try {
    if (Boolean(patient, doctor, date, timeSlot, patientGender)) {
      const appointment = await Appointment.create({
        patient,
        doctor,
        date,
        timeSlot,
        patientGender,
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

const AppointmentResponseController = async (req, res, next) => {
  const { status } = req.body;
  const appointment_id = req.params.id;

  try {
    if (Boolean(appointment_id)) {
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
  AppointmentRequestController,
  AppointmentResponseController,
};
