const mongoose = require("mongoose");
const { Schema } = mongoose;
const patient = require("./patient");
const doctor = require("./doctor");

const medicalRecordSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },
  doctorID: {
    type: Schema.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "appointment",
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("record", medicalRecordSchema);
