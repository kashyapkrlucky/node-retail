// Required Imports
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// Models Imported
const Vendor = require("../models/Vendor");

// Helpers
const { success, error } = require("../helpers/customResponse");
const { secret } = require("../helpers/keys");
const Product = require("../models/Product");
const ProductList = require("../models/ProductList");
const Order = require("../models/Order");

// Exported Controller to get user signed in
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    // if email exists
    const emailFound = await Vendor.findOne({ email }).select({ _id: true, password: true });
    if (emailFound) {
        // Validate Password
        const verifyPassword = await bcryptjs.compareSync(password, emailFound.password);
        if (verifyPassword) {
            // Generate and Send Token
            let signOptions = { issuer: "Retail App", expiresIn: "23h" };
            const authToken = jwt.sign({ id: emailFound._id, type: 'vendor' }, secret, signOptions);
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
    Vendor
        .findById(req.params.id)
        .select({ _id: false, password: false, createdOn: false, __v: false })
        .then(doc => {
            success(res, doc, `Vendor information ${doc ? "found" : "not found"}`);
        })
        .catch(err => {
            error(res, "", "User information not found");
        });
};

// Add Product
exports.addProduct = async (req, res, next) => {
    const { category, brandName, productName, description, price, image, color, count } = req.body;
    const bearer = await req['headers']['authorization'];
    const token = await bearer && bearer.split(' ')[1];
    const vendor = await jwt.verify(token, secret);
    const isProductAdded = await Product.findOne({ productName });
    const isVendorAdded = await isProductAdded && ProductList.findOne({ product: isProductAdded._id, vendor: vendor.id });

    if (isVendorAdded) {
        success(res, '', `product added already`);
    } else {
        const productSaved = await new Product({ category, brandName, productName, description, price, image, color }).save();
        const productList = new ProductList({
            vendor: vendor.id,
            product: isProductAdded ? isProductAdded._id : productSaved._id,
            price,
            count
        });
        productList
            .save()
            .then(doc => {
                success(res, doc._id, `product added`);
            })
            .catch(err => {
                error(res, err, "Error in product adding");
            });
    }
}

// View Added Products
exports.viewProducts = (req, res, next) => {
    const { page, size, id } = req.params;
    const limit = parseInt(size, 10) || 10;
    const skip = page && page === 1 ? 0 : (page - 1) * limit;
    ProductList
        .find({ vendor: id })
        .skip(skip)
        .limit(limit)
        .select({ __v: false, vendor: false, created_at: false, updated_at: false, })
        .populate({
            path: 'product',
            select: { __v: false, created_at: false, updated_at: false, }
        })
        .then(docs => {
            success(res, docs, `${docs.length} Products found`);
        })
        .catch(err => {
            error(res, err, "Products not found");
        });
}

// Update Product List
// Customer Orders
exports.customerOrders = (req, res, next) => {
    const { vendorId, orderStatus } = req.params;
    Order
        .find({
            vendor: vendorId,
            orderStatus
        })
        .select({ vendor: false, __v: false, updated_at: false })
        .populate({
            path: 'product',
            select: { image: true, productName: true, brandName: true }
        })
        .populate({
            path: 'address',
            select: { created_at: false, __v: false, customerId: false, updated_at: false }
        })
        .populate({
            path: 'customer',
            select: { firstname: true, lastname: true, email: true, phone: true }
        })
        .then(docs => {
            success(res, docs, `${docs.length} order found`);
        })
        .catch(err => {
            error(res, err, "order not found");
        });
}

// Change Order Status
exports.updateOrder = (req, res, next) => {
    const { orderId, orderStatus } = req.body;
    Order
        .findByIdAndUpdate(
            orderId,
            { orderStatus },
            { new: true }
        )
        .then(doc => {
            success(res, doc._id, `Order updated`);
        })
        .catch(err => {
            error(res, err, "Error in updating");
        });
}
