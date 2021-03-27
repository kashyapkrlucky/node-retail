const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = Schema({
    category: { type: String, required: true },
    brandName: { type: String, required: true },
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    image: { type: String },
    color: { type: String },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Product', ProductSchema);