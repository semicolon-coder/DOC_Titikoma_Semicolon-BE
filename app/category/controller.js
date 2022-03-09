const Category = require('./model');

module.exports = {
    index: async (req, res) => {
        await Category.find({})
            .then(r => {
                res.render('category/index', { r });
            })
            .catch(e => {
                res.redirect('/');
            })
    },
    viewAdd: async (req, res) => {
        res.render('category/viewAdd');
    },
    actionAdd: async (req, res) => {
        const { name } = req.body;

        await Category.create({ name })
            .then(r => {
                res.redirect('/category')
            })
            .catch(e => {
                console.log(e);
                res.redirect('/category')
            })
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params;

        await Category.findById(_id)
            .then(r => {
                res.render('category/viewDetail', { r });
            })
            .catch(e => {
                console.log(e);
                res.redirect('/category')
            })
    },
    actionUpdate: async (req, res) => {
        const { _id } = req.params;
        const { name } = req.body;

        await Category.findByIdAndUpdate(_id,{ name })
            .then(r => {
                res.redirect('/category')
            })
            .catch(e => {
                console.log(e);
                res.redirect('/category')
            })
    },
    actionDelete: async (req, res) => {
        const { _id } = req.params;

        await Category.findByIdAndDelete(_id)
            .then(r => {
                res.redirect('/category')
            })
            .catch(e => {
                console.log(e);
                res.redirect('/category')
            })
    }
}