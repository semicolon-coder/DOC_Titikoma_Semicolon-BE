const moment =  require('moment');
const Testimonial = require('./model');

moment.locale('id');

module.exports = {
    index: async (req, res) => {
        await Testimonial.find({})
            .then(r => {
                res.render('testimonial/index', { r, moment });
            })
            .catch(e => {
                console.log(e);
                res.redirect('/');
            })
    }
}