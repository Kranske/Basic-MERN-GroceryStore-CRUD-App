// controllers/cartController.js
const Cart = require('../models/cart');

// Get all grocery items
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get a cart item by ID
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Cart not found' });
  }
};

// Create a new grocery item
exports.createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const cart = await newCart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a grocery item by ID
exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a grocery item by ID
exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};