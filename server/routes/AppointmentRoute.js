const express = require("express");
const {
  AppointmentRequestController,
  AppointmentResponseController,
} = require("../controllers/AppointmentController");
const router = express.Router();

router.post("/", AppointmentRequestController);
router.post("/:id", AppointmentResponseController);

module.exports = router;
