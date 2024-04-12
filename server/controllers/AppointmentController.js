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
  let { doctorId, today, approved } = req.body;
  doctorId = new ObjectId(doctorId);
  console.log(doctorId, today, approved);

  try {
    if (Boolean(doctorId)) {
      let appointmentList;
      let oneMonth = new Date(today);
      oneMonth.setMonth(oneMonth.getMonth()+1);
      if (approved) {
        appointmentList = await Appointment.find({
          doctorId,
          date: {
            $gte: today,
            $lt: oneMonth
          },
          status: "approved",
        }).populate("patientId");
      } else {
        let oneMonth = new Date(today);
        oneMonth.setMonth(oneMonth.getMonth()+1);
        appointmentList = await Appointment.find({
          doctorId,
          date: {
            $gte: today,
            $lt: oneMonth
          },
        }).populate("patientId");
      }
      if (appointmentList) {
        const appointmentSlot = {
          slot1: [],
          slot2: [],
          slot3: [],
          slot4: [],
          slot5: [],
          slot6: [],
        };
        const PatientList = [];
        appointmentList.map((appointment) => {
          appointmentSlot["slot" + appointment.timeSlot].push(appointment);
          PatientList.push(appointment.patientId);
        });
        return res
          .status(200)
          .json({ ack: true, appointmentSlot, PatientList });
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
