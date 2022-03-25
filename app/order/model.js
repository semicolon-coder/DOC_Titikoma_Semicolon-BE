const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    historyCart: [{
        productId: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            // Total product price * quantity
            default: function () {
                return this.productPrice * this.qty;
            }
        }
    }],
    historyPromo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'promo'
    },
    subtotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    total: {
        type: Number,
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
