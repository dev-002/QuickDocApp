const express = require("express");
const router = express.Router();
const {
  fetchListDoctor,
  fetchListPatient,
  fetchAppointments,
  DoctorSignup,
  fetchAnalytic,
} = require("../controllers/AdminController");

router.get("/anayltic", fetchAnalytic);
router.get("/fetch/doctor", fetchListDoctor);
router.post("/add/doctor", DoctorSignup);
router.get("/fetch/patient", fetchListPatient);
router.get("/fetch/appointments", fetchAppointments);

module.exports = router;
