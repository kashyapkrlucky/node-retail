const express = require('express');
const router = express.Router();
const auth = require('../helpers/authentication');
const product = require('../controllers/product');

// Product listing
router.get('/list/:page/:size', product.list);

// Product details
router.get('/detail/:id', product.details);

// Product details
router.get('/in-stock/:id', product.inStock);

module.exports = router;