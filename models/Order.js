const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProductListSchema = Schema({
    product: { type: ObjectId, ref: 'Product', required: true },
    vendor: { type: ObjectId, ref: 'Vendor', required: true },
    price: { type: Number, required: true },
    customer: { type: ObjectId, ref: 'Customer', required: true },
    address: { type: ObjectId, ref: 'Address', required: true },
    status: { type: Boolean, default: 1, enum: [1, 2, 3, 4, 5, 6] }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('ProductList', ProductListSchema);

// Status => 1 - Pending, 2 - Accepted, 3 - Shipped, 4 - Delivered