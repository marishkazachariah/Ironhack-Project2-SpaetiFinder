const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
});

const Item = model('Item', itemSchema);

module.exports = Item;
