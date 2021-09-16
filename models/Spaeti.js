const { Schema, model } = require('mongoose');

const spaetiSchema = new Schema({
  name: String,
  imageUrl: String,
  location: {
  address: {
      street: String,
      zipcode: Number,
      city: String,
    },
  },
  owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
  latitude: Number,
  longitude: Number,
  reviews: [
    {
      user: String,
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
      name: String,
      price: String,
      imageUrl: String
    },
  ],
  price: {
    type: String,
    enum: ['€', '€€', '€€€'],
  },
});

const Spaeti = model('Spaeti', spaetiSchema);

module.exports = Spaeti;
