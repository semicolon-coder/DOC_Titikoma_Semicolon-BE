const Product = require('./model');
const Category = require('../category/model');

module.exports = {
    index: async (req, res) => {
        // Initialize alert notification
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert = { status: `${alertStatus}`, message: `${alertMessage}` }

        // Query all product data
        await Product.find({})
            // Expand category document with selected field
            .populate('category', 'name')
            .then(r => {
                res.render('product/index', { r, alert });
            })
            .catch(e => {
                res.redirect('/product');
            })
    },
    viewAdd: async (req, res) => {
        // Query category data for relational with product
        await Category.find({})
            .then(r => {
                res.render('product/viewAdd', { r });
            })
            .catch(e => {
                res.redirect('/product');
            })
    },
    actionCreate: async (req, res) => {
        const { productId, name, description, category, stock, status, price } = req.body;

        // If file not equal to undefined do create product data
        if(req.file !== undefined) {
            const image = `${process.env.IMG_URL}/${req.file.filename}`;
            // Create query product data
            await Product.create({ productId, name, description, category, stock, status, price, image })
                .then(r => {
                    req.flash('alertStatus', 'success');
                    req.flash('alertMessage', 'Berhasil membuat data produk!');

                    return res.redirect('/product');
                })
                .catch(e => {
                    req.flash('alertStatus', 'failed');
                    req.flash('alertMessage', e.message);

                    return res.redirect('/product');
                })
        //    if file not found do redirect to product page
        } else {
            res.redirect('/product');
        }
    },
    viewDetail: async (req, res) => {
        const { _id } = req.params;

        // Query product with _id
        await Product.findById(_id)
            .then(async product => {
                // Query category data for relational with product
                await Category.find({})
                    // Onfulfilled render product viewdetail page
                    .then(category => {
                        res.render('product/viewDetail', { product, category });
                    })
            })
            .catch(e => {
                // Onerror redirect to product page and send failed alert
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', 'Id produk tidak ditemukan!');

                res.redirect('/product');
            })
    },
    actionUpdate: async (req, res) => {
        const { _id } = req.params;
        const { productId, name, description, category, stock, status, price } = req.body;

        // if file not equal to undefined add image to query
        if(req.file !== undefined) {
            const newImage = `${process.env.IMG_URL}/${req.file.filename}`;
            await Product.findByIdAndUpdate(_id, { productId, name, description, category, stock, status, price, image: newImage })
                .then(r => {
                    req.flash('alertStatus', 'success');
                    req.flash('alertMessage', 'Berhasil mengubah data produk!');

                    res.redirect('/product');
                })
                .catch(e => {
                    req.flash('alertStatus', 'failed');
                    req.flash('alertMessage', 'Gagal mengubah data produk!');

                    res.redirect('/product');
                })
        //    if file not found update without image
        } else {
            await Product.findByIdAndUpdate(_id, { productId, name, description, category, stock, status, price })
                .then(r => {
                    req.flash('alertStatus', 'success');
                    req.flash('alertMessage', 'Berhasil mengubah data produk!');

                    res.redirect('/product');
                })
                .catch(e => {
                    req.flash('alertStatus', 'failed');
                    req.flash('alertMessage', 'Gagal mengubah data produk!');

                    res.redirect('/product');
                })
        }
    },
    actionDelete: async (req, res) => {
        const { _id } = req.params;

        // Query find product by _id and delete the product
        await Product.findByIdAndDelete(_id)
            .then(r => {
                req.flash('alertStatus', 'success');
                req.flash('alertMessage', 'Berhasil menghapus data produk!');

                res.redirect('/product');
            })
            .catch(e => {
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', 'Gagal menghapus data produk!');

                res.redirect('/product');
            })
    }
}