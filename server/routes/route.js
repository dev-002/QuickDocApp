const express = require("express");
const router = express.Router();

// routes
const AuthRoute = require("./AuthRoute");

router.use("/", (req, res) => res.send("Hello basic route"));
router.use("/auth", AuthRoute);

module.exports = router;
