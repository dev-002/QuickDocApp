const express = require("express");
const router = express.Router();

const {
  listDoctor,
  listAppointment,
  getAllSpecialization,
  fetchPaitent,
  fetchList,
  applyLeave,
  updateProfile,
  fetchProfile,
  completeAppointment,
} = require("../controllers/DoctorConroller");
const verifyDoctor = require("../utilities/verifyDoctor");

router.get("/list", listDoctor);
router.get("/specialization", getAllSpecialization);
router.get("/appointment", verifyDoctor, listAppointment);
router.post("/fetchPaitent", verifyDoctor, fetchPaitent);
router.get("/fetch/list", verifyDoctor, fetchList);
router.post("/leave", verifyDoctor, applyLeave);
router.put("/profile", verifyDoctor, updateProfile);
router.get("/profile", verifyDoctor, fetchProfile);
router.post("/complete", completeAppointment);

module.exports = router;
