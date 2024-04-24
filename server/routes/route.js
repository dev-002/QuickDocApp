const express = require("express");
const router = express.Router();

// routes
const AuthRoute = require("./AuthRoute");
const AdminRoute = require("./AdminRoute");
const DoctorRoute = require("./DoctorRoute");
const AppointmentRoute = require("./AppointmentRoute");
const ProfileRoute = require("./ProfileRoute");

const verifyPatient = require("../utilities/verifyPatient");
// const verifyDoctor = require("../utilities/verifyDoctor");

router.use("/auth", AuthRoute);
router.use("/admin", AdminRoute);
router.use("/doctor", DoctorRoute);
router.use("/appointment", AppointmentRoute);
router.use("/patient", verifyPatient, ProfileRoute);

module.exports = router;
