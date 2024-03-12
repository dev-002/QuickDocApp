const express = require("express");
const {
  AppointmentRequest,
  AppointmentResponse,
} = require("../controllers/AppointmentController");
const router = express.Router();

router.post("/", AppointmentRequest);
router.post("/statusChange", AppointmentResponse);

module.exports = router;
