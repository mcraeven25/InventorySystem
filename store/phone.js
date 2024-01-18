const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Phone = new Schema({
  code: String,
  brand: String,
  model: String,
  variant: String,
  color: String,
  price: String,
});

module.exports = mongoose.model("Phone", Phone);
