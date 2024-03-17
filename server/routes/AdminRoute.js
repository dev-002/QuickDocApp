const express = require("express");
const router = express.Router();
const {
  fetchListDoctor,
  fetchListPatient,
  fetchAppointments,
} = require("../controllers/AdminController");

router.get("/fetch/doctor", fetchListDoctor);
router.get("/fetch/patient", fetchListPatient);
router.get("/fetch/appointments", fetchAppointments);

module.exports = router;
