const moment =  require('moment');
const Promo = require('./model');

moment.locale('id');

module.exports = {
    index: async (req, res) => {
        await Promo.find({})
            .then(r => {
                res.render('promo/index', { r, moment });
            })
            .catch(e => {
                console.log(e);
                res.redirect('/');
            })
    },
    viewAdd: async (req, res) => {
        res.render('promo/viewAdd');
    },
    actionAdd: async (req, res) => {
        let { code, name, discountValue, status, startDate, expiryDate } = req.body
        startDate = moment.utc(startDate).subtract('7', "hours").format()
        expiryDate = moment.utc(expiryDate).subtract('7', "hours").format();

        await Promo.create({ code, name, discountValue, status, startDate, expiryDate })
            .then(r => {
                res.redirect('/promo')
            })
            .catch(e => {
                console.log(e);
                res.redirect('/');
            })
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params;

        await Promo.findById(_id)
            .then(r => {
                res.render('promo/viewDetail', { r, moment });
            })
            .catch(e => {
                console.log(e);
                res.redirect('/');
            })
    },
    actionUpdate: async (req, res) => {
        const { _id } = req.params;
        let { name, discountValue, status, startDate, expiryDate } = req.body

        startDate = moment.utc(startDate).subtract('7', "hours").format()
        expiryDate = moment.utc(expiryDate).subtract('7', "hours").format();

        await Promo.findByIdAndUpdate(_id, { name, discountValue, status, startDate, expiryDate })
            .then(r => {
                res.redirect('/promo')
            })
            .catch(e => {
                console.log(e);
                res.redirect('/');
            })
    },
    actionDelete: async (req, res) => {
        const { _id } = req.params;

        await Promo.findByIdAndDelete(_id)
            .then(r => {
                res.redirect('/promo')
            })
            .catch(e => {
                console.log(e);
                res.redirect('/');
            })
    }
}