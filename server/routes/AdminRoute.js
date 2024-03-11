const express = require("express");
const router = express.Router();
const {
  fetchListDoctor,
  fetchListPatient,
} = require("../controllers/AdminController");

router.get("/fetch/doctor", fetchListDoctor);
router.get("/fetch/patient", fetchListPatient);

module.exports = router;
