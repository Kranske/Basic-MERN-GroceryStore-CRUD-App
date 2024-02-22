// models/Product.js
const mongoose = require('../db');

const productSchema = new mongoose.Schema({
  productCode: Number,
  productName: String,
  productPrice: Number,
  productQuantity: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
