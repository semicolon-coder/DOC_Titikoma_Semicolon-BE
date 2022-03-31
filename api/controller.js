const mongoose = require('mongoose');
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
    getAllCategory: async (req, res) => {
        await Category.find({})
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan semua kategori!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    addOrder: async (req, res) => {
        const { historyCart, historyPromo, subtotal, discount, tax, total, customer, payment } = req.body;
        const orderId = `INV-${new Date().getTime()}`;
        const status = 'Aktif';

        await Order.create({ orderId, status, historyCart, historyPromo, subtotal, discount, tax, total, customer, payment })
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil membuat data order!', data: r });
            })
            .catch(e => {
                console.log(e)
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null });
            })
    },
    getOrderById: async (req, res) => {
        const { _id } = req.params;

        await Order.findById(_id)
            // .populate({path: 'cart.product', select: '_id productId name price'})
            .then(r => {
                if(r === null || r === {} || r === []) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}) }
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data order!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    getOrderByOrderId: async (req, res) => {
        const { orderId } = req.params;

        await Order.findOne({ orderId })
            // .populate({path: 'cart.product', select: '_id productId name price'})
            .then(r => {
                if(r === null || r === {} || r === []) {
                    return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null})
                } else {
                    return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data order!', data: r});
                }
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
    getAllProduct: async (req, res) => {
        const { view } = req.query;
        const categoryMatch = await Category.find({})
            .then(r => {
                return r.find((item) =>  item._id.toString() === view );
            })

        if(view === 'popular') {
            await Product.find({})
                .select('_id name price status image productId')
                .then(r => {
                    const filteredProduct = r.filter((item) => item.status !== false)

                    return res.status(200).json({
                        error: false,
                        message: 'Berhasil mendapatkan semua data produk yang populer!',
                        data: filteredProduct.slice(0,4)
                    });
                })
                .catch(e => {
                    return res.status(500).json({error: true, message: `Error: ${e.message}`, data: null});
                })
        } else if (categoryMatch) {
            await Product.find({})
                .populate({
                    path: 'category',
                    match: { '_id': categoryMatch._id }
                })
                .then(r => {
                    const filteredProduct = r.filter((item) => {
                        if(item.status !== false) {
                            return item.category !== null
                        }
                    })
                    return res.status(200).json({ error: false, message: 'Berhasil mendapatkan semua data produk!', data: filteredProduct});
                })
                .catch(e => {
                    return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
                })
        } else {
            await Product.find({  })
                .populate('category')
                .then(r => {
                    const filteredProduct = r.filter((item) => {
                        return item.status !== false
                    })

                    return res.status(200).json({ error: false, message: 'Berhasil mendapatkan semua data produk!', data: filteredProduct});
                })
                .catch(e => {
                    return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
                })
        }
    },
    getPromoByCode: async (req, res) => {
      const { code } = req.params;

        await Promo.findOne({ code })
            .then(r => {
                if(r === null) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}); }
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data promo!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    getPromoById: async (req, res) => {
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
    getAllPromo: async (req, res) => {
        await Promo.find({})
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan semua promo!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    addTestimonial: async (req, res) => {
        const { name, description } = req.body;

        await Testimonial.create({ name, description })
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil input data testimonial!', data: r});
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
