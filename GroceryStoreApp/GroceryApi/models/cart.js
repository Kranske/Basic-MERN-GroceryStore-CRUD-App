// models/cart.js
const mongoose = require('../db');

const cartSchema = new mongoose.Schema({
  customerName: String,
  products: [String],
  createdAt: Date,
});

const Cart = mongoose.model('Carts', cartSchema);

module.exports = Cart;









