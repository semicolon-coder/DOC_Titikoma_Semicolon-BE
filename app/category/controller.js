// Import category schema
const Category = require('./model');

module.exports = {
    index: async (req, res) => {
        // Initialize alert notification
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert = { status: `${alertStatus}`, message: `${alertMessage}` }

        // Query find all category in categories database
        await Category.find({})
            .then(r => {
                // Onulfilled do render category page and send response data
                res.render('category/index', { r, alert });
            })
            .catch(e => {
                // Onerror do redirect to dashboard page
                res.redirect('/');
            })
    },
    viewAdd: async (req, res) => {
        res.render('category/viewAdd');
    },
    actionAdd: async (req, res) => {
        // Get name from body
        const { name } = req.body;

        // Query create category
        await Category.create({ name })
            .then(r => {
                // Onulfilled do redirect to category page and send success alert
                req.flash('alertStatus', 'success');
                req.flash('alertMessage', 'Berhasil menambahkan data kategori!');

                res.redirect('/category')
            })
            .catch(e => {
                // Onerror do redirect to category page and send failed alert
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', 'Gagal menambahkan data kategori!');

                res.redirect('/category')
            })
    },
    viewDetail: async (req, res) => {
        // Get id from url parameter
        const { _id } = req.params;

        // Query category using _id
        await Category.findById(_id)
            .then(r => {
                res.render('category/viewDetail', { r });
            })
            .catch(e => {
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', 'Gagal mendapatkan data kategori!');

                res.redirect('/category')
            })
    },
    actionUpdate: async (req, res) => {
        const { _id } = req.params;
        const { name } = req.body;

        // Query find category _id and update category
        await Category.findByIdAndUpdate(_id,{ name })
            .then(r => {
                req.flash('alertStatus', 'success');
                req.flash('alertMessage', 'Berhasil mengubah data kategori!');

                res.redirect('/category')
            })
            .catch(e => {
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', 'Gagal mengubah data kategori!');

                res.redirect('/category')
            })
    },
    actionDelete: async (req, res) => {
        const { _id } = req.params;

        // Query find category _id and delete category
        await Category.findByIdAndDelete(_id)
            .then(r => {
                req.flash('alertStatus', 'success');
                req.flash('alertMessage', 'Berhasil menghapus data kategori!');

                res.redirect('/category')
            })
            .catch(e => {
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', 'Gagal mengubah menghapus data kategori!');

                res.redirect('/category')
            })
    }
}