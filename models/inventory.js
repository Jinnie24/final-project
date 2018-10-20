const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: {type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
