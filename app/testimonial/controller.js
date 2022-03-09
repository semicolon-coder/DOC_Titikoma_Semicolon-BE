const Testimonial = require('./model');

module.exports = {
    index: async (req, res) => {
        res.render('testimonial/index', {position: 'testimonial', title: "Testimonial - TITIKOMA"});
    }
}