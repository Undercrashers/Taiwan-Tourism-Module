const mongoose = require("mongoose");

const AttractionSchema = new mongoose.Schema({
  region_id: Number,
  name: String,
  description: String,
});

const RegionSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  key: { type: String, unique: true },
  name: String,
  color: String,
  summary: String,
  attraction: [AttractionSchema],
});

module.exports = mongoose.model("Region", RegionSchema);
