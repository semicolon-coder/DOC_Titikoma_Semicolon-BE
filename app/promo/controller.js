const Promo = require('./model');

module.exports = {
    index: async (req, res) => {
        await Promo.find({})
            .then(r => {
                res.render('promo/index', { r });
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
        const { code, name, discountValue, status, startDate, expiryDate } = req.body

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
                res.render('promo/viewDetail', { r });
            })
            .catch(e => {
                console.log(e);
                res.redirect('/');
            })
    },
    actionUpdate: async (req, res) => {
        const { _id } = req.params;
        const { name, discountValue, status, startDate, expiryDate } = req.body

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