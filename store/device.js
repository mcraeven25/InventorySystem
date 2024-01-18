const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Device = new Schema({
  brand: String,
  model: String,
  variant: String,
  colors: Array,
  price: String,
});

module.exports = mongoose.model("Device", Device);
