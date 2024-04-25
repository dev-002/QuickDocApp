const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const Patient = require("../models/patient");
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

const listAppointment = async (req, res, next) => {
  let doctor = req.doctor;
  let { date, status, search, searchType } = req.query;
  try {
    let appointments;

    if (search != "")
      switch (searchType) {
        case "1": {
          appointments = await Appointment.find({
            doctorId: doctor._id,
          })
            .populate("doctorId")
            .populate("patientId");

          if (status !== "all")
            appointments = appointments.filter(
              (appointment) =>
                appointment.patientId.name == search &&
                appointment.status == status
            );
          else
            appointments = appointments.filter(
              (appointment) => appointment.patientId.name == search
            );
          break;
        }
      }
    else if (status !== "all") {
      appointments = await Appointment.find({ status, doctorId: doctor._id })
        .populate("doctorId")
        .populate("patientId");
    } else
      appointments = await Appointment.find({ doctorId: doctor._id })
        .populate("doctorId")
        .populate("patientId");

    if (appointments) {
      if (date) {
        date = new Date(date);
        appointments = appointments.filter((appointment) => {
          return new Date(appointment.date) >= date;
        });
        return res.status(200).json({ ack: true, appointments });
      } else return res.status(200).json({ ack: true, appointments });
    } else throw new Error("Error fetching Appointment List");
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

const fetchPaitent = async (req, res, next) => {
  let { id, activeTab } = req.body;
  const doctor = req.doctor;
  try {
    let patient = await Patient.findById(id).populate("medicalRecord");
    if (patient) {
      if (activeTab === "specific")
        patient = patient.filter(
          (p) => p.medicalRecord?.doctorID === doctor._id
        );

      return res.status(200).json({ ack: true, patient });
    } else return res.status(400).json({ ack: false, err: "No Patient Found" });
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

const fetchList = async (req, res, next) => {
  try {
    const doctorId = req.doctor._id;
    let patientList = await Appointment.find({ doctorId }).populate(
      "patientId"
    );
    if (patientList.length > 0) {
      const list = [];
      patientList.map((appointment) => {
        if (!list.includes(appointment.patientId))
          list.push(appointment.patientId);
      });
      return res.status(200).json({ ack: true, list });
    }
  } catch (err) {
    return res.status(500).json({ ack: false, msg: err });
  }
};

const applyLeave = async (req, res, next) => {
  const doctor = req.doctor;
  const { leave } = req.body;

  try {
    const user = await Doctor.findById(doctor._id);
    const response = await Doctor.findByIdAndUpdate(
      doctor._id,
      {
        $push: { leaveDays: { date, limit } },
      },
      { new: true }
    );
    if (response) {
      return res.status(200).json({ ack: true, doctor: response });
    } else return res.status(404).json({ ack: false, msg: "No User Found" });
  } catch (err) {
    return res.status(500).json({ ack: false, msg: err });
  }
};

const fetchProfile = async (req, res, next) => {
  const doctor = req.doctor;

  try {
    const response = await Doctor.findById(doctor._id);
    if (response) {
      return res.status(200).json({ ack: true, doctor: response });
    } else throw new Error("Error while updating profile");
  } catch (err) {
    return res.status(500).json({ ack: false, msg: err });
  }
};

const updateProfile = async (req, res, next) => {
  const doctor = req.doctor;
  const { updateData } = req.body;
  try {
    const response = await Doctor.findByIdAndUpdate(doctor._id, {
      $set: { ...updateData },
    });
    if (response) {
      console.log("updated success");
      return res.status(200).json({ ack: true, updatedDoctor: response });
    } else throw new Error("Error while updating profile");
  } catch (err) {
    return res.status(500).json({ ack: false, msg: err });
  }
};

module.exports = {
  listDoctor,
  listAppointment,
  getAllSpecialization,
  fetchPaitent,
  fetchList,
  applyLeave,
  updateProfile,
  fetchProfile,
};
