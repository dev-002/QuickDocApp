const express = require("express");
const router = express.Router();

const {
  listDoctor,
  listAppointment,
  listAllAppointment,
} = require("../controllers/DoctorConroller");

router.get("/list", listDoctor);
router.post("/appointment/all", listAllAppointment);

module.exports = router;
