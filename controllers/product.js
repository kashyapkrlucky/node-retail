// Helpers
const { success, error } = require("../helpers/customResponse");
const Product = require("../models/Product");
const ProductList = require("../models/ProductList");

// Exported Controller to get Product list
exports.list = (req, res, next) => {
    const { page, size } = req.params;
    const limit = parseInt(size, 10) || 10;
    const skip = page && page === 1 ? 0 : (page - 1) * limit;
    Product
        .find()
        .skip(skip)
        .limit(limit)
        .select({
            brandName: true,
            productName: true,
            description: true,
            price: true,
            image: true,
        })
        .then(docs => {
            success(res, docs, `${docs.length} product found`);
        })
        .catch(err => {
            error(res, err, "product not found");
        });
}

// Exported Controller to get Product details
exports.details = (req, res, next) => {
    Product
        .findById(req.params.id)
        .select({ created_at: false, updated_at: false, __v: false })
        .then(doc => {
            success(res, doc, `Product information ${doc ? "found" : "not found"}`);
        })
        .catch(err => {
            error(res, "", "Product information not found");
        });
}

// View Product Info
exports.inStock = (req, res, next) => {
    ProductList
        .find({
            product: req.params.id
        })
        .select({ vendor: true, price: true, count: true })
        .populate({
            path: 'vendor',
            select: { companyName: true, phone: true }
        })
        .then(doc => {
            success(res, doc, `Product information ${doc ? "found" : "not found"}`);
        })
        .catch(err => {
            error(res, "", "Product information not found");
        });
}

// Get Available Vendors for product
