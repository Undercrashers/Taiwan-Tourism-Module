const mongoose = require("mongoose");

const InfoItemSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  category: {
    type: String,
    enum: ["transportation", "accommodation", "shopping"],
  },
  icon: String,
  title: String,
  body: String,
});

module.exports = mongoose.model("InfoItem", InfoItemSchema);
