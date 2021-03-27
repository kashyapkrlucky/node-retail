const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProductListSchema = Schema({
    product: { type: ObjectId, ref: 'Product', required: true },
    vendor: { type: ObjectId, ref: 'Vendor', required: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('ProductList', ProductListSchema);