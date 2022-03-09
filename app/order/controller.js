const Order = require('./model');

module.exports = {
    index: async (req, res) => {
        res.render('order/index', {position: 'history-order', title: "History Penjualan - TITIKOMA"});
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params;

        res.render('order/viewDetail', { productId: _id });
    }
}