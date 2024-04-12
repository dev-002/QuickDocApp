const express = require("express");
const router = express.Router();

const {
  getProfile,
  getAppointments,
  updateProfile,
} = require("../controllers/ProfileControllers");

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post('/appointments',getAppointments);

module.exports = router;
