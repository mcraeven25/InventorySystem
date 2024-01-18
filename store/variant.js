const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Variant = new Schema({
  brand: String,
  model: String,
  variant: String,
});

module.exports = mongoose.model("Variant", Variant);
