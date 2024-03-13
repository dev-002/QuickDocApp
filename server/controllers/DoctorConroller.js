const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const { ObjectId } = require("mongoose").Types;

const listDoctor = async (req, res, next) => {
  try {
    const doctorList = await Doctor.find();
    if (doctorList) {
      return res.status(200).json({ ack: true, doctorList });
    } else
      return res
        .status(500)
        .json({ ack: false, err: "Error fetching doctorList" });
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

const listAppointment = async (req, res, next) => {
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

module.exports = { listDoctor, listAppointment, listAllAppointment };
