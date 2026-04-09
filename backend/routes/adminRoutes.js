const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Reminder = require("../models/Reminder");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// Admin login (route: /api/admin/login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, isAdmin: true });
  if (!user) return res.status(401).json({ message: "Admin not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });
  const token = jwt.sign({ id: user._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});

// Middleware for admin auth
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) throw new Error();
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin features
router.get("/users", adminAuth, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

router.get("/reminders", adminAuth, async (req, res) => {
  const reminders = await Reminder.find({}).populate("userId", "name email");
  res.json(reminders);
});


// Remove user
router.delete("/user/:id", adminAuth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Reminder.deleteMany({ userId: req.params.id });
  res.json({ message: "User and their reminders deleted" });
});

// Block user
router.patch("/user/:id/block", adminAuth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { blocked: true }, { new: true });
  res.json({ message: "User blocked", user });
});

// Unblock user
router.patch("/user/:id/unblock", adminAuth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { blocked: false }, { new: true });
  res.json({ message: "User unblocked", user });
});

// Update user (name/email)
router.put("/user/:id", adminAuth, async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
  res.json({ message: "User updated", user });
});

// Export all users and reminders as JSON
router.get("/export", adminAuth, async (req, res) => {
  const users = await User.find({}, "-password");
  const reminders = await Reminder.find({});
  const data = { users, reminders };
  const json = JSON.stringify(data, null, 2);
  const filePath = "exported_data.json";
  fs.writeFileSync(filePath, json);
  res.download(filePath, (err) => {
    if (!err) fs.unlinkSync(filePath);
  });
});

router.delete("/reminder/:id", adminAuth, async (req, res) => {
  await Reminder.findByIdAndDelete(req.params.id);
  res.json({ message: "Reminder deleted" });
});

module.exports = router;
