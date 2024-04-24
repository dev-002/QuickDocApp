const Appointment = require("../models/appointment");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const AppointmentRequest = async (req, res, next) => {
  let { doctorId, date, timeSlot, reason } = req.body;
  doctorId = new ObjectId(doctorId);
  let patient = req.patient;
  try {
    if (Boolean(doctorId, date, timeSlot, reason)) {
      const appointment = await Appointment.create({
        patientId: patient._id,
        doctorId,
        date,
        timeSlot,
        reason,
      });

      if (appointment) return res.status(201).json({ appointment, ack: true });
      else throw new Error("Error while creating appointment");
    } else return res.status(404).json({ err: "Values not provided" });
  } catch (err) {
    return res
      .status(500)
      .json({ err, msg: "Error while creating appointment" });
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

const listTodayAppointment = async (req, res, next) => {
  let { today } = req.body;
  const doctor = req.doctor;
  today = new Date(today);
  let appointmentList;

  function isSame(a, b) {
    return (
      a.getDate() == b.getDate() &&
      a.getMonth() == b.getMonth() &&
      a.getFullYear() == b.getFullYear()
    );
  }

  try {
    appointmentList = await Appointment.find({
      doctorId: doctor._id,
      status: "approved",
    }).populate("patientId");

    if (appointmentList) {
      appointmentList = appointmentList.filter((app) => {
        if (isSame(new Date(app.date), today)) return app;
      });
      appointmentList.sort((a, b) => {
        return a.timeSlot.split("-")[0] - b.timeSlot.split("-")[0];
      });
      const PatientList = [];
      appointmentList.map((appointment) => {
        PatientList.push(appointment.patientId);
      });

      return res.status(200).json({ ack: true, appointmentList, PatientList });
    } else throw new Error("Error Fetching Appoinment");
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

module.exports = {
  AppointmentRequest,
  AppointmentResponse,
  // doctor
  listTodayAppointment,
};
