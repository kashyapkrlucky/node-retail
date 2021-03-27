const express = require('express');
const router = express.Router();

const vendor = require('../controllers/vendor');
const auth = require('../helpers/authentication');


/***************** Vendor Actions ******************/
// Vendor Sign Up
router.post('/create', vendor.create);

// Vendor Sign In
router.post('/sign-in', vendor.signin);

// Vendor Profile
router.get('/:id', auth.isVendorUser, vendor.getProfile);

// Vendor List
router.get('/list/:page/:size', vendor.getList);

// Vendor Add Product
router.post('/product/add', auth.isVendorUser, vendor.addProduct);

// Vendor Added Product List
router.get('/product/list/:page/:size/:id', auth.isVendorUser, vendor.viewProducts);

module.exports = router;