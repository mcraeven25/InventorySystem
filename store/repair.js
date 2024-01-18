const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Repair = new Schema({
  imei: Number,
  firstName: String,
  lastName: String,
  number: Number,
  brand: String,
  model: String,
  reason: String,
  status: {
    enum: ["pending", "ongoing", "completed"],
  },
});

module.exports = mongoose.model("Repair", Repair);
