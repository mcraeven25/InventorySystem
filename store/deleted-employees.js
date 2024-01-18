const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deletedEmployee = new Schema({
   
  firstName: {
    type: String,
    required: [true, "First name is required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  number: {
    type: Number,
    required: [true, "Number is required!"],
  },
  userName: {
    type: String,
    required: [true, "Username is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  position: {
    type: String,
    enum: ["Manager", "Employee"],
  },
 
   id: {
    type: Number,
    required: [true, "Employee ID is required!"]
  }
});

module.exports = mongoose.model("DeletedEmployee", deletedEmployee);
