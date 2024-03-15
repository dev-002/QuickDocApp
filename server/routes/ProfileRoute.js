const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
} = require("../controllers/ProfileControllers");

router.get("/profile", getProfile);
router.put("/profile", updateProfile);

module.exports = router;
