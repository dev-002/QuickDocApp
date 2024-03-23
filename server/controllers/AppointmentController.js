const appointment = require("../models/appointment");
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

const listTodayAppointment = async (req, res, next) => {
  let { doctorId } = req.body;
  doctorId = new ObjectId(doctorId);

  const date = new Date();
  let today = [date.getDate(), date.getMonth(), date.getFullYear()].join("-");

  try {
    if (Boolean(doctorId)) {
      const appointmentList = await Appointment.find({
        $and: [
          {
            doctorId,
            date: today,
          },
          {
            $or: [
              { status: "pending" },
              { status: "approved" },
              { status: "rejected" },
            ],
          },
        ],
      });

      if (appointmentList) {
        const appointmentSlot = {
          slot1: [],
          slot2: [],
          slot3: [],
          slot4: [],
          slot5: [],
          slot6: [],
        };
        appointmentList.map((appointment) => {
          appointmentSlot[appointment.timeSlot].push(appointment);
        });
        return res.status(200).json({ ack: true, appointmentSlot });
      } else
        return res
          .status(500)
          .json({ ack: false, err: "Error Fetching Appoinment" });
    } else
      return res.status(404).json({ ack: false, err: "No Values Provided" });
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
