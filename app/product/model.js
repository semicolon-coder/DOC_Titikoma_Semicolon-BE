const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        // Relational to category collection
        ref: 'category'
    },
    stock: {
      type: Number,
      required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('product', productSchema);
module.exports = Product;