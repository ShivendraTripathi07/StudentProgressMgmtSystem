const mongoose = require("mongoose");

const problemCollectionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  problemId: String,
  rating: Number,
  tags: [String],
  dateSolved: Date,
  difficulty: Number,
});

const problemCollectionModel = mongoose.model(
  "problemCollection",
  problemCollectionSchema
);

module.exports = problemCollectionModel;
