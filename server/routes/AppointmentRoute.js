const express = require("express");
const {
  AppointmentRequest,
  AppointmentResponse,
  listTodayAppointment,
} = require("../controllers/AppointmentController");
const router = express.Router();

router.post("/", AppointmentRequest);
router.post("/today", listTodayAppointment);
router.post("/statusChange", AppointmentResponse);

module.exports = router;
