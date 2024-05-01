const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const MedicalRecord = require("../models/medicalRecord");

const getProfile = async (req, res, next) => {
  let patient = req.patient;
  try {
    if (patient.role == 3) {
      patient = await Patient.findById(patient._id);

      if (patient.medicalRecord?.length > 0) {
        patient = await Patient.findById(patient._id)
          ?.populate("medicalRecord")
          .populate({
            path: "medicalRecord",
            populate: {
              path: "doctorID",
              model: "doctor",
            },
          });
      }
      if (patient) return res.status(200).json({ ack: true, patient });
      else return res.status(404).json({ ack: false, err: "No user found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ack: false, err: error });
  }
};

const updateProfile = async (req, res, next) => {
  let { updateData } = req.body;
  let patient = req.patient;

  try {
    if (patient.role == 3) {
      patient = await Patient.findByIdAndUpdate(patient._id, {
        $set: { ...updateData },
      });
      if (patient) {
        let updatedPatient = await Patient.findById(patient._id)
          .populate("medicalRecord")
          .populate({
            path: "medicalRecord",
            populate: {
              path: "doctorID",
              model: "doctor",
            },
          });
        return res.status(200).json({ ack: true, updatedPatient });
      } else throw new Error("Error updating user profile");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ack: false, err });
  }
};

const getAppointments = async (req, res, next) => {
  const patient = req.patient;
  const { status } = req.query;
  try {
    let appointmentList;
    if (status == "all") {
      appointmentList = await Appointment.find({
        patientId: patient._id,
        // date: {
        //   $gte: date,
        // },
      }).populate("doctorId");
    } else
      appointmentList = await Appointment.find({
        patientId: patient._id,
        status,
      }).populate("doctorId");
    if (appointmentList) {
      return res.status(200).json({ ack: true, appointmentList });
    } else throw new Error("Error fetching Appointments");
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

const getSpecificDoctor = async (req, res, next) => {
  const { specialization } = req.query;

  try {
    let doctorList;
    if (specialization != "all")
      doctorList = await Doctor.find({
        specialization,
      });
    else doctorList = await Doctor.find({});

    if (doctorList) {
      return res.status(200).json({ ack: true, doctorList });
    } else throw new Error("Error fetching Appointments");
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

const cancelAppointment = async (req, res, next) => {
  const patient = req.patient;
  const { status, appointmentID } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentID,
      {
        $set: { status },
      },
      { new: true }
    );
    console.log(appointment);
    if (appointment) {
      return res.status(200).json({ ack: true });
    } else throw new Error("Error fetching Appointments");
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAppointments,
  getSpecificDoctor,
  cancelAppointment,
};
