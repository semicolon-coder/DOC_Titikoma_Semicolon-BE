const Category = require('../app/category/model');
const Order = require('../app/order/model');
const Product = require('../app/product/model');
const Promo = require('../app/promo/model');
const Testimonial = require('../app/testimonial/model');

module.exports = {
    getCategory: async (req, res) => {
        const { _id } = req.params;

        await Category.findById(_id)
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan kategori!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    addOrder: async (req, res) => {
        const { status, cart, price, tax, totalPrice, customer, payment } = req.body;
        const orderId = `INV-${new Date().getTime()}`;

        await Order.create({ orderId, status, cart, price, tax, totalPrice, customer, payment })
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil membuat data order!', data: r });
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null });
            })
    },
    getOrderById: async (req, res) => {
        const { _id } = req.params;

        await Order.findById(_id)
            .populate({path: 'cart.product', select: '_id productId name price'})
            .then(r => {
                if(r === null) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}) }
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data order!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    getOrderByOrderId: async (req, res) => {
        const { orderId } = req.params;

        await Order.find(orderId)
            .populate({path: 'cart.product', select: '_id productId name price'})
            .then(r => {
                if(r === null) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}) }
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data order!', data: r[0]});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    getProductById: async (req, res) => {
        const { _id } = req.params;

        await Product.findById(_id)
            .populate('category')
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data produk!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    getProductByProductId: async (req, res) => {
        const { productId } = req.params;

        await Product.find({ productId })
            .populate('category')
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data produk!', data: r[0]});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    getPromo: async (req, res) => {
        const { _id } = req.params;

        await Promo.findById(_id)
            .then(r => {
                if(r === null) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}); }
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data promo!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    getTestimonial: async (req, res) => {
        const { _id } = req.params;

        await Testimonial.findById(_id)
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data testimonial!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    getAllTestimonial: async (req, res) => {
        await Testimonial.find({})
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan semua data testimonial!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    }
}