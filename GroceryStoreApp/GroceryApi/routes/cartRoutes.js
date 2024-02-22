// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

// Routes for cart
router.get('/', auth,  cartController.getAllCarts);
router.get('/:id', auth,  cartController.getCartById);
router.post('/', auth,  cartController.createCart);
router.put('/:id', auth,  cartController.updateCart);
router.delete('/:id', auth,  cartController.deleteCart);

module.exports = router;
