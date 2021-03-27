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
router.get('/:id', auth.validateUser, customer.getProfile);

// Customer List
router.get('/list/:page/:size', customer.getList);

module.exports = router;
