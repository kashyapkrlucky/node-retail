const express = require('express');
const router = express.Router();

const vendor = require('../controllers/vendor');
const auth = require('../helpers/authentication');


/***************** Vendor Actions ******************/

// Vendor Sign In
router.post('/sign-in', vendor.signin);

// Vendor Profile
router.get('/:id', auth.isVendorUser, vendor.getProfile);

// Vendor Add Product
router.post('/product/add', auth.isVendorUser, vendor.addProduct);

// Vendor Added Product List
router.get('/product/list/:page/:size/:id', auth.isVendorUser, vendor.viewProducts);

// Vendor Order List
router.get('/orders/:vendorId/:orderStatus', auth.isVendorUser, vendor.customerOrders);

// Vendor Order Update
router.put('/orders/update', auth.isVendorUser, vendor.updateOrder);

module.exports = router;
