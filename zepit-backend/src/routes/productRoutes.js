const express = require('express');
const { createProduct } = require('../controllers/productController');
const {getProduct} = require('../controllers/productController')
const router = express.Router();

router.post('/api/products', createProduct);
router.get('/api/products/:id', getProduct);

module.exports = router;
