const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deletedModel = new Schema({
  brand: String,
  model: String,
});

module.exports = mongoose.model("DeletedModel", deletedModel);
