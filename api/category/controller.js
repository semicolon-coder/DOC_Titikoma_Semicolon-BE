const Category = require('./model');

module.exports = {
    addCategory: async (req, res) => {
        const { name } = req.body;

        await Category.create({ name })
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil membuat kategori!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
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
    getAlCategory: async (req, res) => {
      await Category.find({})
          .then(r => {
              return res.status(200).json({ error: false, message: 'Berhasil mendapatkan semua kategori!', data: r});
          })
          .catch(e => {
              return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
          })
    },
    updateCategory: async (req, res) => {
        const { _id } = req.params;
        const { name } = req.body;

        await Category.findByIdAndUpdate(_id, { name })
            .then(r => {
                if(r === null) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}) }
                return res.status(200).json({ error: false, message: 'Berhasil mengupdate kategori!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    deleteCategory: async (req, res) => {
        const { _id } = req.params;

        await Category.findByIdAndDelete(_id)
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil menghapus kategori!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })

    }
}