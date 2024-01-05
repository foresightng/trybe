const express = require("express");
const router = express.Router();

const {
  registerUser,
  login,
  getBanks,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.post("/login", login);
router.post("/register", registerUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
// router.get('/banks', getBanks)

module.exports = router;
