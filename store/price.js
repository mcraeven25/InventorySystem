const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Price = new Schema({
  brand: String,
  model: String,
  variant: String,
  price: String,
});

module.exports = mongoose.model("Price", Price);
