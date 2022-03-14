const Product = require('./model');
const Category = require('../category/model');
const multer = require('multer')
const upload = multer().single('image')

module.exports = {
    index: async (req, res) => {
        await Product.find({})
            .populate('category', 'name')
            .then(r => {
                res.render('product/index', { r });
            })
            .catch(e => {
                console.log(e);
                res.redirect('/product');
            })
    },
    viewAdd: async (req, res) => {
        await Category.find({})
            .then(r => {
                res.render('product/viewAdd', { r });
            })
            .catch(e => {
                console.log(e);
                res.redirect('/product');
            })
    },
    actionCreate: async (req, res) => {
        const { productId, name, description, category, stock, status, price } = req.body;

        if(req.file !== undefined) {
            const image = `${process.env.IMG_URL}/${req.file.filename}`;
            await Product.create({ productId, name, description, category, stock, status, price, image })
                .then(r => {
                    return res.redirect('/product');
                })
                .catch(e => {
                    return res.redirect('/product');
                })
        } else {
            res.redirect('/product');
        }
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params;

        await Product.findById(_id)
            .then(async product => {
                await Category.find({})
                    .then(category => {
                        res.render('product/viewDetail', { product, category });
                    })
            })
    },
    actionUpdate: async (req, res) => {
        const { _id } = req.params;
        const { productId, name, description, category, stock, status, price } = req.body;

        if(req.file !== undefined) {
            const newImage = `${process.env.IMG_URL}/${req.file.filename}`;
            await Product.findByIdAndUpdate(_id, { productId, name, description, category, stock, status, price, image: newImage })
                .then(r => {
                    return res.redirect('/product');
                })
                .catch(e => {
                    console.log(e);
                    return res.redirect('/product');
                })
        } else {
            await Product.findByIdAndUpdate(_id, { productId, name, description, category, stock, status, price })
                .then(r => {
                    return res.redirect('/product');
                })
                .catch(e => {
                    console.log(e);
                    return res.redirect('/product');
                })
        }
    },
    actionDelete: async (req, res) => {
        const { _id } = req.params;

        await Product.findByIdAndDelete(_id)
            .then(r => {
                res.redirect('/product');
            })
            .catch(e => {
                console.log(e);
                res.redirect('/product');
            })
    }
}