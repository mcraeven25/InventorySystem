const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Returned = new Schema({
  imei: Number,
  replace: Number,
  firstName: String,
  lastName: String,
  address: String,
  number: Number,
  brand: String,
  model: String,
  status: String,
  action: String,
  reason: String,
  date: Date,
  returnedDate: Date,
});

module.exports = mongoose.model("Returned", Returned);
