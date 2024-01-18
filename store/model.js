const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Model = new Schema({
  brand: String,
  model: String,
});

module.exports = mongoose.model("Model", Model);
