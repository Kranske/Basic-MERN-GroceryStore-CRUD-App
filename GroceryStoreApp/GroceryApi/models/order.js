// models/order.js
const mongoose = require('../db');

const orderSchema = new mongoose.Schema({
    orderNo: Number,
    orderDate: Date,
    custNo: Number,
    productCode: Number,
    productName: String,
    productPrice: Number,
    productQuantity: Number,
    total: Number,
    modeOfPayment: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
