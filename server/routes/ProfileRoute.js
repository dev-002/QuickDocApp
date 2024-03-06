const express = require("express");
const router = express.Router();

const { ProfileController } = require("../controllers/ProfileControllers");

router.get("/profile", ProfileController);

module.exports = router;
