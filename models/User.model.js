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
  favSpaeti: [],
  role: {
    type: String,
    // enumeration: only 'admin' and 'user' are allowed values for the role field
    enum: ['user', 'admin'],
    default: 'user'
  }
});

const User = model("User", userSchema);

module.exports = User;
