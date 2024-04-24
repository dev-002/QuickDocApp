const express = require("express");
const router = express.Router();

const {
  getProfile,
  getAppointments,
  updateProfile,
  getSpecificDoctor,
} = require("../controllers/ProfileControllers");
const verifyPatient = require("../utilities/verifyPatient");

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.get("/appointments", getAppointments);
router.get("/specific", getSpecificDoctor);

module.exports = router;
