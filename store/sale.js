const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sale = new Schema({
  imei: Number,
  firstName: String,
  lastName: String,
  address: String,
  number: Number,
  brand: String,
  model: String,
  variant: String,
  color: String,
  date: Date,
  sellerID: String,
});

module.exports = mongoose.model("Sale", Sale);
