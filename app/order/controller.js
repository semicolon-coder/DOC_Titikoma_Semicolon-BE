const moment = require('moment');
// Import order schema
const Order = require('./model');

module.exports = {
    index: async (req, res) => {
        // Initialize alert
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert = { status: `${alertStatus}`, message: `${alertMessage}` }

        // Query find all order data with selected fields
        await Order.find({})
            .select('_id orderId customer payment total status createdAt')
            .then(r => {
                res.render('order/index', { r, moment, alert });
            })
            .catch(e => {
                res.redirect('/');
            })
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params;

        // Query find order by id
        await Order.findById(_id)
            .then(r => {
                res.render('order/viewDetail', { r, moment });
            })
            .catch(e => {
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', 'Gagal mendapatkan data order!');

                res.redirect('/history-order');
            })
    },
    updateOrder: async (req, res) => {
        const { _id } = req.params;
        const { status } = req.body;

        // Query find order by id and update
        await Order.findByIdAndUpdate(_id, { status })
            .then(r => {
                req.flash('alertStatus', 'success');
                req.flash('alertMessage', 'Berhasil mengubah status order!');

                res.redirect('/history-order');
            })
            .catch(e => {
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', 'Gagal update order!');

                res.redirect('/history-order')
            })
    }
}
