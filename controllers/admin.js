// Required Imports
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// Models Imported
const Admin = require("../models/Admin");
const Vendor = require("../models/Vendor");
const Customer = require("../models/Customer");

// Helpers
const { success, error } = require("../helpers/customResponse");
const { secret, adminKey } = require("../helpers/keys");

// Exported Controller to create admins
exports.create = async (req, res, next) => {
    const { name, email, phone, password } = req.body;
    if (req.body.adminKey === adminKey) {
        const userExists = await Admin.findOne({ email }).select({ _id: true });
        // // If email exists in system
        if (userExists === null) {
            // Generate Password Hash
            const salt = await bcryptjs.genSalt(10);
            const hashedPass = await bcryptjs.hash(password, salt);
            const admin = new Admin({
                name, email, password: hashedPass, phone
            });
            admin
                .save()
                .then(doc => {
                    success(res, "", `${doc.name} added in system`);
                })
                .catch(err => {
                    error(res, err, `error in adding ${err}`);
                });
        } else {
            // Sending response already registered with us
            success(res, "", `email already registered with us`);
        }
    } else {
        error(res, '', 'You are not allowed to create admin');
    }
};

// Exported Controller to get user signed in
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    // if email exists
    const emailFound = await Admin.findOne({ email }).select({ _id: true, password: true });
    if (emailFound && password) {
        // Validate Password
        const verifyPassword = await bcryptjs.compareSync(password, emailFound.password);
        if (verifyPassword) {
            // Generate and Send Token
            let signOptions = { issuer: "Retail App", expiresIn: "23h" };
            const authToken = jwt.sign({ id: emailFound._id, type: 'admin' }, secret, signOptions);
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
    Admin
        .findById(req.params.id)
        .select({ _id: false, password: false, createdOn: false, __v: false })
        .then(doc => {
            success(res, doc, `Information ${doc ? "found" : "not found"}`);
        })
        .catch(err => {
            error(res, "", "Information not found");
        });
};

// Exported Controller to create vendor
exports.createVendor = async (req, res, next) => {
    const { companyName, email, phone, password } = req.body;
    const userExists = await Vendor.findOne({ email }).select({ _id: true });

    // If email exists in system
    if (userExists === null) {
        // Generate Password Hash
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);
        const vendor = new Vendor({
            companyName, email, password: hashedPass, phone
        });
        vendor
            .save()
            .then(doc => {
                success(res, "", `${companyName} added in system`);
            })
            .catch(err => {
                error(res, err, `error in adding company ${err}`);
            });
    } else {
        // Sending response already registered with us
        success(res, "", `company already registered with us`);
    }
};

// Exported Controller to get list of vendors
exports.getVendorList = (req, res, next) => {
    const { page, size } = req.params;
    const limit = parseInt(size, 10) || 10;
    const skip = page && page === 1 ? 0 : (page - 1) * limit;
    console.log(skip, limit);
    Vendor
        .find()
        .skip(skip)
        .limit(limit)
        .select({ password: false, __v: false, _id: false, updated_at: false })
        .then(docs => {
            success(res, docs, `${docs.length} Vendor found`);
        })
        .catch(err => {
            error(res, err, "Vendor not found");
        });
}

// Exported Controller to get list of customers
exports.getCustomerList = (req, res, next) => {
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
// Exported Controller to get list of orders
// Exported Controller to get list of complaints