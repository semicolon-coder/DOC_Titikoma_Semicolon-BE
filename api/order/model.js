const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    status: {
        type: Number,
        required: true
    },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        qty: {
            type: Number,
            required: true
        }
    }],
    price: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    customer: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    },
    payment: {
        name: {
            type: String
        },
        category: {
            type: String
        },
        accountNumber: {
            type: String
        }
    }
}, { timestamps: true })

const Order = mongoose.model('order', orderSchema);
module.exports = Order;