const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Color = new Schema({
  brand: String,
  model: String,
  variant: String,
  colors: Array,
});

module.exports = mongoose.model("Color", Color);
