// models/cronConfig.js
const mongoose = require("mongoose");

const cronConfigSchema = new mongoose.Schema({
  schedule: { type: String, required: true },
});

module.exports = mongoose.model("CronConfig", cronConfigSchema);
