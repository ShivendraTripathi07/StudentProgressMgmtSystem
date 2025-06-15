const mongoose = require("mongoose");

const contestHistorySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  contestId: String,
  name: String,
  ratingChange: Number,
  rank: Number,
  newRating: Number,
  problemsUnsolved: Number,
  date: Date,
});

const contestHistoryModel = mongoose.model("contestHistory",contestHistorySchema)

module.exports = contestHistoryModel
