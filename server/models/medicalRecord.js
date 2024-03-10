const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  detail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("medicalRecord", medicalRecordSchema);
