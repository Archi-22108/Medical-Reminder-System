const Reminder = require("../models/Reminder");

// ADD
exports.addReminder = async (req, res) => {
  try {
    const { medicineName, date, time } = req.body;

    // Validation
    if (!medicineName || !date || !time) {
      return res.status(400).json({ message: 'Medicine name, date, and time are required' });
    }

    const reminder = await Reminder.create({
      medicineName,
      date,
      time,
      userId: req.user.id // Add user association
    });

    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    if (reminder.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
