const express = require("express");
const router = express.Router();

// routes
const AuthRoute = require("./AuthRoute");

router.use("/auth", AuthRoute);

module.exports = router;
