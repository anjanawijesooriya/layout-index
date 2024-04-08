const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter the username"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    select: false,
    minlength: 6,
  },
});

//this is for register route
UserSchema.pre("save", async function (next) {
  //password encryption goes here
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //await is only can use in async function only

  next();
});

//this is for login route
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password); //check the entered password and password which is received from the db
};

//for register json web token (JWT)
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("user", UserSchema);
module.exports = User;