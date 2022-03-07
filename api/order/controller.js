const Order = require('./model');

module.exports = {
    addOrder: async (req, res) => {
        const { status, cart, price, tax, totalPrice, customer, payment } = req.body;

        await Order.create({ status, cart, price, tax, totalPrice, customer, payment })
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil membuat data order!', data: r });
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null });
            })
    },
    getOrder: async (req, res) => {
        const { _id } = req.params;

        await Order.findById(_id)
            .populate({path: 'cart.product', select: '_id productId name price'})
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data order!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    getAllProduct: async (req, res) => {
        await Order.find()
            .populate({path: 'cart.product', select: '_id productId name price'})
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data order!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    updateOrder: async (req, res) => {
        const { _id } = req.params;
        const { status, cart, price, tax, totalPrice, customer, payment } = req.body;

        await Order.findByIdAndUpdate(_id, { status, cart, price, tax, totalPrice, customer, payment })
            .then(r => {
                if(r === null) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}) }
                return res.status(200).json({ error: false, message: 'Berhasil mengubah data order!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    deleteOrder: async (req, res) => {
        const { _id } = req.params;

        await Order.findByIdAndDelete(_id)
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil menghapus data order!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    }
}