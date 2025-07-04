const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// 🔐 JWT generator
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

// 📧 Nodemailer email sender
const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `"Stock API" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });
};

//
// ✅ Register Controller
//
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

//
// ✅ Login Controller
//
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

//
// ✅ Logout Controller
//
const logoutController = (req, res) => {
  res.json({ message: "Logout successful (handled on client)" });
};

//
// ✅ Get Profile Controller
//
const getProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch profile" });
  }
};

//
// ✅ Forgot Password Controller
//
const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = user.generateResetToken();
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `
      <p>You requested a password reset.</p>
      <p>Click <a href="${resetURL}">here</a> to reset your password.</p>
      <p>This link will expire in 15 minutes.</p>
    `;

    await sendEmail(user.email, "Reset your password", message);
    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send reset email" });
  }
};

//
// ✅ Reset Password Controller
//
const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashed,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Token invalid or expired" });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Password reset failed" });
  }
};

//
// ✅ Export all as named module
//
module.exports = {
  registerController,
  loginController,
  logoutController,
  getProfileController,
  forgotPasswordController,
  resetPasswordController
};
