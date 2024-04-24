const express = require("express");
const router = express.Router();

const {
  listDoctor,
  listAppointment,
  getAllSpecialization,
  fetchPaitent,
  fetchList,
} = require("../controllers/DoctorConroller");
const verifyDoctor = require("../utilities/verifyDoctor");

router.get("/list", listDoctor);
router.get("/specialization", getAllSpecialization);
router.get("/appointment", verifyDoctor, listAppointment);
router.post("/fetchPaitent", verifyDoctor, fetchPaitent);
router.get("/fetch/list", verifyDoctor, fetchList);

module.exports = router;
