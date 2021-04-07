const express = require('express');
const router = express.Router();

const admin = require('../controllers/admin');
const auth = require('../helpers/authentication');

/***************** Admin Actions ******************/
// Admin Create
router.post('/create', admin.create);

// Admin Sign In
router.post('/sign-in', admin.signin);

// Admin Profile
router.get('/:id', auth.isAdminUser, admin.getProfile);

// Create Vendor
router.post('/vendor/create', auth.isAdminUser, admin.createVendor);

// Get Vendor List
router.get('/vendor/list/:page/:size', auth.isAdminUser, admin.getVendorList);

// Get Customer List
router.get('/customer/list/:page/:size', auth.isAdminUser, admin.getCustomerList);

module.exports = router;
