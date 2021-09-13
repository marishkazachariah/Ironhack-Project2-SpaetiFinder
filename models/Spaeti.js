const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  imageUrl: { 
    type: String,
    default: 'https://images.unsplash.com/photo-1582317361770-c0b3040d8d0c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3AlQzMlQTR0aXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
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
