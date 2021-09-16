const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  avatar: String,
  role: {
    type: String,
    enum: ['user', 'owner'],
    default: 'user'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Spaeti',
    },
  ],
  favSpaeti: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Spaeti',
    },
  ],
});

const User = model('User', userSchema);

module.exports = User;
