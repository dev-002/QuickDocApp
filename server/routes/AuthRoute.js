const express = require("express");
const {
  LoginController,
  RegisterController,
} = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", LoginController);
router.post("/register", RegisterController);

module.exports = router;
