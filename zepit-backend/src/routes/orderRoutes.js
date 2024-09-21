const express = require('express');
const { createOrder, getOrder, getAllOrders } = require('../controllers/orderController');
const router = express.Router();

// POST route to create a new order
router.post('/api/orders', createOrder);

// GET route to fetch a single order by ID
router.get('/api/orders/:id', getOrder);

// GET route to fetch all orders
router.get('/api/orders', getAllOrders);

module.exports = router;
