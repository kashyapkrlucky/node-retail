// Required Imports
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// Models Imported
const Customer = require("../models/Customer");

// Helpers
const { success, error } = require("../helpers/customResponse");
const { secret } = require("../helpers/keys");

// Exported Controller to get user signed up
exports.signup = async (req, res, next) => {
    const { firstname, lastname, email, phone, password } = req.body;
    const userExists = await Customer.findOne({ email }).select({ _id: true });

    // If email exists in system
    if (userExists === null) {
        // Generate Password Hash
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);
        const customer = new Customer({
            firstname, lastname, email, password: hashedPass, phone
        });
        customer
            .save()
            .then(doc => {
                success(res, "", `${firstname} ${lastname} added in system`);
            })
            .catch(err => {
                error(res, err, `error in adding user ${err}`);
            });
    } else {
        // Sending response already registered with us
        success(res, "", `email already registered with us`);
    }
};

// Exported Controller to get user signed in
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    // if email exists
    const emailFound = await Customer.findOne({ email }).select({ _id: true, password: true });
    if (emailFound) {
        // Validate Password
        const verifyPassword = await bcryptjs.compareSync(password, emailFound.password);
        if (verifyPassword) {
            // Generate and Send Token
            let signOptions = { issuer: "Retail App", expiresIn: "23h" };
            const authToken = jwt.sign({ id: emailFound._id, type: 'customer' }, secret, signOptions);
            success(res, authToken, `Authenticated`);
        } else {
            error(res, "", `Invalid User name or Password`);
        }
    } else {
        error(res, "", `Invalid User name or Password`);
    }
};

// Exported Controller to get user profile
exports.getProfile = (req, res, next) => {
    Customer
        .findById(req.params.id)
        .select({ _id: false, password: false, createdOn: false, __v: false })
        .then(doc => {
            success(res, doc, `Customer information ${doc ? "found" : "not found"}`);
        })
        .catch(err => {
            error(res, "", "Customer information not found");
        });
};

// Exported Controller to get user list
exports.getList = (req, res, next) => {
    const { page, size } = req.params;
    const limit = parseInt(size, 10) || 10;
    const skip = page && page === 1 ? 0 : (page - 1) * limit;
    Customer
        .find()
        .skip(skip)
        .limit(limit)
        .select({ password: false, __v: false, _id: false, updated_at: false })
        .then(docs => {
            success(res, docs, `${docs.length} Customer found`);
        })
        .catch(err => {
            error(res, err, "Customer not found");
        });
}

// Exported Controller to add orders
// My Orders
// Add address
// My addresses
