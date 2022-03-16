const mongoose = require('mongoose');

// Data structure for MongoDB using mongoose for object modeling
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama produk harus ada!']
    }
})

// Export schema/data
const Category = mongoose.model('category', categorySchema);
module.exports = Category;