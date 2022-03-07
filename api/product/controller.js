const Product = require('./model');

module.exports = {
    addProduct: async (req, res) => {
        const { productId, name, description, category, stock, status, price } = req.body;

        await Product.create({ productId, name, description, category, stock, status, price })
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil membuat data produk!', data: r });
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null });
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
      await Product.find()
          .populate('category')
          .then(r => {
              return res.status(200).json({ error: false, message:`Berhasil mendapatkan semua data produk!`, data: r })
          })
    },
    updateProduct: async (req, res) => {
        const { _id } = req.params;
        const { productId, name, description, category, stock, status, price } = req.body;

        await Product.findByIdAndUpdate(_id,{ productId, name, description, category, stock, status, price })
            .then(r => {
                if(r === null) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}) }
                return res.status(200).json({ error: false, message: 'Berhasil mengubah data produk!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    deleteProduct: async (req, res) => {
        const { _id } = req.params;

        await Product.findByIdAndDelete(_id)
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil menghapus data produk!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    }
}