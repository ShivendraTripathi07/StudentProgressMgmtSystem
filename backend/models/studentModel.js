const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  cfHandle: String,
  currentRating: Number,
  maxRating: Number,
  lastSynced: Date,
  autoEmailEnabled: Boolean,
  reminderCount: Number,
});

const studentModel = mongoose.model("student", studentSchema);
module.exports = studentModel;
