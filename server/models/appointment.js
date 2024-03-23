const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
  reason: { type: String, required: true },

  status: {
    type: String,
    enum: ["completed", "approved", "rejected", "pending"],
    default: "pending",
  },
});

module.exports = mongoose.model("appointment", appointmentSchema);
