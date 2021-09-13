const { Schema, model } = require("mongoose");

const spaetiSchema = new Schema({
  name: { type: String },
  imageUrl: { 
    type: String,
    default: '/public/images/Späti.jpg'
 },
  reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Reviews'
    }
  ],
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
