const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deletedBrand = new Schema({
  brand: String,
});

module.exports = mongoose.model("DeleteBrand", deletedBrand);