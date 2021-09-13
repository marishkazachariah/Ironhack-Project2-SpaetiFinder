const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true 
  },
  password: String,
  googleId: String,
  avatar: String,
  reviews: [],
  favSpaeti: []
});

const User = model("User", userSchema);

module.exports = User;
