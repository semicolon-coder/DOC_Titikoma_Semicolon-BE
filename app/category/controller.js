const Category = require('./model');

module.exports = {
    index: async (req, res) => {
        res.render('category/index');
    },
    viewAdd: async (req, res) => {
        res.render('category/viewAdd');
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params;

        res.render('category/viewDetail', { _id });
    }
}