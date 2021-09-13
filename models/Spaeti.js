const { Schema, model } = require('mongoose');

const spaetiSchema = new Schema({
  name: String,
  imageUrl: String,
  location: {
    coords: [Number],
    address: {
      street: String,
      zipcode: Number,
      city: String,
    },
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String,
    },
  ],
  hasSeating: {
    type: Boolean,
    default: false,
  },
  hasAtm: {
    type: Boolean,
    default: false,
  },
  hasWC: {
    type: Boolean,
    default: false,
  },
  inventory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  price: {
    type: String,
    enum: ['€', '€€', '€€€'],
  },
});

const Spaeti = model('Spaeti', spaetiSchema);

module.exports = Spaeti;
