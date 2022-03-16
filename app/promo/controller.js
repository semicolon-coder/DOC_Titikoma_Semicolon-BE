// Import momentjs for date formatter
const moment = require('moment');
// Import promo schema
const Promo = require('./model');

// Set timezone to id
moment.locale('id');

module.exports = {
    index: async (req, res) => {
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert = { status: `${alertStatus}`, message: `${alertMessage}` }

        // Query find all promo data
        await Promo.find({})
            .then(r => {
                res.render('promo/index', { r, moment, alert });
            })
            .catch(e => {
                res.redirect('/promo');
            })
    },
    viewAdd: async (req, res) => {
        res.render('promo/viewAdd');
    },
    actionAdd: async (req, res) => {
        // Get form data from request body
        let { code, name, discountValue, status, startDate, expiryDate } = req.body
        // Subtract 7 hours to match the timezone, why subtract? because when we store the raw date it will become UTC+00 timezone.
        // If you want to query the date and time, it will be UTC+07 because momentjs automatically set the date to UTC+07
        startDate = moment.utc(startDate).subtract('7', "hours").format()
        expiryDate = moment.utc(expiryDate).subtract('7', "hours").format();

        // Query create promo data
        await Promo.create({ code, name, discountValue, status, startDate, expiryDate })
            .then(r => {
                req.flash('alertStatus', 'success');
                req.flash('alertMessage', 'Berhasil menambahkan data promo!');

                res.redirect('/promo');
            })
            .catch(e => {
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', 'Gagal menambahkan data promo!');

                res.redirect('/promo');
            })
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params;

        // Query find promo by _id
        await Promo.findById(_id)
            .then(r => {
                res.render('promo/viewDetail', { r, moment });
            })
            .catch(e => {
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', 'Gagal mendapatkan data promo!');

                res.redirect('/promo');
            })
    },
    actionUpdate: async (req, res) => {
        const { _id } = req.params;
        let { name, discountValue, status, startDate, expiryDate } = req.body

        startDate = moment.utc(startDate).subtract('7', "hours").format()
        expiryDate = moment.utc(expiryDate).subtract('7', "hours").format();

        // Query find promo by id and update
        await Promo.findByIdAndUpdate(_id, { name, discountValue, status, startDate, expiryDate })
            .then(r => {
                req.flash('alertStatus', 'success');
                req.flash('alertMessage', 'Berhasil mengubah data promo!');

                res.redirect('/promo')
            })
            .catch(e => {
                req.flash('alertStatus', 'failed')
                req.flash('alertMessage', 'Gagal mengubah data promo!');

                res.redirect('/promo');
            })
    },
    actionDelete: async (req, res) => {
        const { _id } = req.params;

        // Query find promo by id and delete
        await Promo.findByIdAndDelete(_id)
            .then(r => {
                req.flash('alertStatus', 'success');
                req.flash('alertMessage', 'Berhasil menghapus data promo!');

                res.redirect('/promo')
            })
            .catch(e => {
                req.flash('alertStatus', 'failed')
                req.flash('alertMessage', 'Gagal menghapus data produk!');

                res.redirect('/promo');
            })
    }
}