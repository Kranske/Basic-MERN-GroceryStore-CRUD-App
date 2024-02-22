// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Routes for Grocery Items
router.get('/', auth,  orderController.getAllOrders);
router.get('/:id', auth,  orderController.getOrderById);
router.post('/', auth,  orderController.createOrder);
router.put('/:id', auth,  orderController.updateOrder);
router.delete('/:id', auth,  orderController.deleteOrder);

module.exports = router;
