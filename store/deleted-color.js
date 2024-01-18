const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deletedColor = new Schema({
  brand: String,
  model: String,
  variant: String,
  color: String,
  colors: Array,
});

module.exports = mongoose.model("DeletedColor", deletedColor);