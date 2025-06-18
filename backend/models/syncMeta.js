// models/SyncMeta.js
const mongoose = require("mongoose");

const syncMetaSchema = new mongoose.Schema({
  lastSynced: Date,
});

module.exports = mongoose.model("SyncMeta", syncMetaSchema);
