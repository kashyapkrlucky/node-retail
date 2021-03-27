const jwt = require('jsonwebtoken');
const { secret } = require('./keys');
const { unauthorize } = require('./customResponse');

// Validate Token
exports.validate = (req, res, next) => {
    const bearer = req['headers']['authorization'];
    if (bearer) {
        const token = bearer.split(' ')[1];
        jwt.verify(token, secret, function (err, value) {
            if (value) {
                next();
            } else {
                unauthorize(res, '', 'Invalid Token');
            }
        });
    } else {
        unauthorize(res, '', 'You are not authorize to view');
    }
}

// Validate User by Id
exports.validateUser = (req, res, next) => {
    const bearer = req['headers']['authorization'];
    if (bearer) {
        const token = bearer.split(' ')[1];
        jwt.verify(token, secret, function (err, value) {
            if (value) {
                if (value.id === req.params.id) {
                    next();
                } else {
                    unauthorize(res, '', 'You are not authorize to view');
                }
            } else {
                unauthorize(res, '', 'Invalid Token');
            }
        });
    } else {
        unauthorize(res, '', 'You are not authorize to view');
    }
}

// Validate Vendor User
exports.isCustomerUser = (req, res, next) => {
    const bearer = req['headers']['authorization'];
    if (bearer) {
        const token = bearer.split(' ')[1];
        jwt.verify(token, secret, function (err, value) {
            if (value) {
                if (value.type === 'customer') {
                    next();
                } else {
                    unauthorize(res, '', 'You are not authorize to view');
                }
            } else {
                unauthorize(res, '', 'Invalid Token');
            }
        });
    } else {
        unauthorize(res, '', 'You are not authorize to view');
    }
}

// Validate Vendor User
exports.isVendorUser = (req, res, next) => {
    const bearer = req['headers']['authorization'];
    if (bearer) {
        const token = bearer.split(' ')[1];
        jwt.verify(token, secret, function (err, value) {
            if (value) {
                if (value.type === 'vendor') {
                    next();
                } else {
                    unauthorize(res, '', 'You are not authorize to view');
                }
            } else {
                unauthorize(res, '', 'Invalid Token');
            }
        });
    } else {
        unauthorize(res, '', 'You are not authorize to view');
    }
}
