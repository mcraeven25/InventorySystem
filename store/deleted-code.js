const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deletedCode = new Schema({
  code:String,
  brand: String,
  model: String,
  variant: String,
  colors: Array,
  price: String,
});

module.exports = mongoose.model("DeletedCode", deletedCode);