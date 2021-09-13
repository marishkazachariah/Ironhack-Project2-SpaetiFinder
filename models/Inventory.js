const { Schema, model } = require("mongoose");

const inventorySchema = new Schema({
item: {
    name: String,
    price: Number
},
image: String,
});

const Inventory = model("Inventory", inventorySchema);

module.exports = Inventory;