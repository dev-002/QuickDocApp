const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  patientGender: {
    type: Number,
    enum: [1, 2],
    // 1-Male 2-Female
    required: true,
  },
  status: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("appointment", appointmentSchema);
