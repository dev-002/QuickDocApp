const express = require("express");
const {
  AppointmentRequest,
  AppointmentResponse,
  listTodayAppointment,
} = require("../controllers/AppointmentController");
const verifyDoctor = require("../utilities/verifyDoctor");
const verifyPatient = require("../utilities/verifyPatient");

const router = express.Router();

router.post("/", verifyPatient, AppointmentRequest);
router.post("/today", verifyDoctor, listTodayAppointment);
router.post("/statusChange", AppointmentResponse);

module.exports = router;
