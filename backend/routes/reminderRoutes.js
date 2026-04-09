const express = require("express");
const router = express.Router();

const {
  addReminder,
  getAllReminders,
  deleteReminder
} = require("../controllers/reminderController");

const protect = require("../middleware/authMiddleware");

router.post("/add", protect, addReminder);
router.get("/all", protect, getAllReminders);
router.delete("/:id", protect, deleteReminder);


module.exports = router;