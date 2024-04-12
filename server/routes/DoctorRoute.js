const express = require("express");
const router = express.Router();

const {
  listDoctor,
  listAllAppointment,
  getAllSpecialization,
} = require("../controllers/DoctorConroller");

router.get("/list", listDoctor);
router.get("/specialization", getAllSpecialization);
router.post("/appointment/all", listAllAppointment);

module.exports = router;
