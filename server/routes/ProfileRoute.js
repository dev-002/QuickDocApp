const express = require("express");
const router = express.Router();

const {
  getProfile,
  getAppointments,
  updateProfile,
  getSpecificDoctor,
  cancelAppointment,
} = require("../controllers/ProfileControllers");

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.get("/appointments", getAppointments);
router.get("/specific", getSpecificDoctor);
router.put("/cancelapp", cancelAppointment);

module.exports = router;
