const express = require("express");
const router = express.Router();

const {
  listDoctor,
  listAppointment,
} = require("../controllers/DoctorConroller");

router.get("/list", listDoctor);
router.post("/appointment", listAppointment);

module.exports = router;
