const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Testimonial = mongoose.model('testimonial', testimonialSchema);
module.exports = Testimonial;