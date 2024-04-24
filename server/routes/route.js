const express = require("express");
const router = express.Router();

// routes
const AuthRoute = require("./AuthRoute");
const AdminRoute = require("./AdminRoute");
const DoctorRoute = require("./DoctorRoute");
const AppointmentRoute = require("./AppointmentRoute");
const ProfileRoute = require("./ProfileRoute");

router.use("/auth", AuthRoute);
router.use("/admin", AdminRoute);
router.use("/doctor", DoctorRoute);
router.use("/appointment", AppointmentRoute);
router.use("/patient", ProfileRoute);

module.exports = router;
