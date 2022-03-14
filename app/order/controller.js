const moment = require('moment');
const Order = require('./model');

module.exports = {
    index: async (req, res) => {
        await Order.find({})
            .select('_id orderId customer payment totalPrice status createdAt')
            .then(r => {
                res.render('order/index', { r, moment });
            })
            .catch(e => {
                console.log(e);
                res.redirect('/');
            })
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params;

        await Order.findById(_id)
            .then(r => {
                res.render('order/viewDetail', { r, moment });
            })
            .catch(e => {
                console.log(e);
                res.redirect('/history-order');
            })
    },
    updateOrder: async (req, res) => {
        const { _id } = req.params;
        const { status } = req.body;

        await Order.findByIdAndUpdate(_id, { status })
            .then(r => {
                res.redirect('/history-order');
            })
            .catch(e => {
                console.log(e);
                res.redirect('/history-order')
            })
    }
}