const Product = require('./model');

module.exports = {
    index: async (req, res) => {
        res.render('product/index');
    },
    viewAdd: async (req, res) => {
        res.render('product/viewAdd');
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params
        res.render('product/viewDetail', { productId: _id });
    }
}