const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
  changePassword
} = require("../controllers/profileController");

const router = express.Router();

// All profile routes are protected
router.use(authMiddleware);

// GET user profile
router.get("/", getUserProfile);

// UPDATE user profile
router.put("/", updateUserProfile);

// CHANGE password
router.put("/change-password", changePassword);

module.exports = router;
