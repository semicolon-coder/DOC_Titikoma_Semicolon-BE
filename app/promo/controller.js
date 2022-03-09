const Promo = require('./model');

module.exports = {
    index: async (req, res) => {
        res.render('promo/index');
    },
    viewAdd: async (req, res) => {
        res.render('promo/viewAdd');
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params;

        res.render('promo/viewDetail', { _id });
    }
}