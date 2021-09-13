const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  imageUrl: { 
    type: String,
    default: '/public/images/Späti.jpg'
 },
  reviews: [],
  hasSeating: false,
  hasAtm: false,
  hasWC: false,
  inventory: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Inventory'
      }
  ],
  price: String
});

const Spaeti = model("Spaeti", spaetiSchema);

module.exports = Spaeti;
