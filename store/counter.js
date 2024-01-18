const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Counter = new Schema({
    employee: Boolean,
    number: Number
});

module.exports = mongoose.model("Counter", Counter);