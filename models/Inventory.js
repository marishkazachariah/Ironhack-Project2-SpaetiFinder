const { Schema, model } = require("mongoose");

const inventorySchema = new Schema({
item: {
    name: String,
    price: Number
},
image: String,
});

const Inventory = model("Inventory", userSchema);

module.exports = Inventory;