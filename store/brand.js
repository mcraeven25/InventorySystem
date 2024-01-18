const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Brand = new Schema({
  brand: String,
});

module.exports = mongoose.model("Brand", Brand);
