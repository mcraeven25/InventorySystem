const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deletedVariant = new Schema({
  brand: String,
  model: String,
  variant: String,
});

module.exports = mongoose.model("DeletedVariant", deletedVariant);
