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

// Validate User
exports.validateUser = (req, res, next) => {
    const bearer = req['headers']['authorization'];
    if (bearer) {
        const token = bearer.split(' ')[1];
        jwt.verify(token, secret, function (err, value) {
            if (value) {
                console.log(value.id, req.params.id);
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