const express = require("express");
const router = express.Router();

// routes
const AuthRoute = require("./AuthRoute");
const AdminRoute = require("./AdminRoute");
const AppointmentRoute = require("./AppointmentRoute");

router.use("/auth", AuthRoute);
router.use("/admin", AdminRoute);
router.use("/appointment", AppointmentRoute);

module.exports = router;
