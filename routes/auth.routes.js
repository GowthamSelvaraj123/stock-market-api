const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const {
  registerController,
  loginController,
  logoutController,
  getProfileController,
  forgotPasswordController,
  resetPasswordController
} = require("../controllers/auth.controller");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/profile", authMiddleware, getProfileController);

router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

module.exports = router;
