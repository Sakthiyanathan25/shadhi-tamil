const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default:"Other",
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Please enter phone numbers"],
  },
  address: {
    type: String,
  },
  dob: {
    type: String,
  },
  education: {
    type: String,
  },
  occupation: {
    type: String,
  },
  salary: {
    type: String,
  },
  religion: {
    type: String,
  },
  caste: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  cigOrAlcohol: {
    type: String,
    enum: ["true", "false"],
    default: "false",
  },
  fatherName: {
    type: String,
  },
  fatherOccupation: {
    type: String,
  },
  motherName: {
    type: String,
  },
  motherOccupation: {
    type: String,
  },
  siblings: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "warning", "disabled", "deactive"],
  },
  dp: {
    type: String,
  },
  about: {
    type: String,
  },
  location: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetOtp: String,
  otpExpiry: Date,
});

module.exports = mongoose.model("User", userSchema);
