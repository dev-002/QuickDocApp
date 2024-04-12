const express = require("express");
const router = express.Router();

const {
  listDoctor,
  listAllAppointment,
  getAllSpecialization,
  fetchPaitent,
} = require("../controllers/DoctorConroller");

router.get("/list", listDoctor);
router.get("/specialization", getAllSpecialization);
router.post("/appointment/all", listAllAppointment);
router.post('/fetchPaitent', fetchPaitent)

module.exports = router;
