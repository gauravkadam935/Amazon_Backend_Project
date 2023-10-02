const express = require("express");
const { default: mongoose } = require("mongoose");

const userSchema = {
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  mobileNo: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
    default: "",
  },
};

const User = mongoose.model("users", userSchema);
module.exports = User;
