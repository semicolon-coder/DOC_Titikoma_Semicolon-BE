const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    code: {
      type: String,
      required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    }
})

const Promo = mongoose.model('promo', promoSchema);
module.exports = Promo;