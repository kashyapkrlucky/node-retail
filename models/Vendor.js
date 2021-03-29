const mongoose = require('mongoose');
const { Schema } = mongoose;

const VendorSchema = new Schema({
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    password: { type: String, required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Vendor', VendorSchema);
