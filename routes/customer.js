const express = require('express');
const router = express.Router();

const customer = require('../controllers/customer');
const auth = require('../helpers/authentication');


/***************** Customer Actions ******************/
// Customer Sign Up
router.post('/sign-up', customer.signup);

// Customer Sign In
router.post('/sign-in', customer.signin);

// Customer Profile
router.get('/:id', auth.isCustomerUser, customer.getProfile);

// Customer Address Add
router.post('/address/add', auth.isCustomerUser, customer.addAddress);

// Customer Addresses
router.get('/address/list/:customerId', auth.isCustomerUser, customer.myAddresses);

// Customer Address Add
router.post('/order/add/:customerId', auth.isCustomerUser, customer.addOrder);

// Customer Addresses
router.get('/order/list/:customerId', auth.isCustomerUser, customer.myOrders);

module.exports = router;
