const Promo = require('./model');

module.exports = {
    addPromo: async (req, res) => {
        const { name, discountValue, status, startDate, expiryDate } = req.body;

        await Promo.create({ name, discountValue, status, startDate, expiryDate })
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil membuat data promo!', data: r });
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null });
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
    getAllPromo: async (req, res) => {
        await Promo.find({})
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan semua kategori!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    updatePromo: async (req, res) => {
        const { _id } = req.params;
        const { name, discountValue, status, startDate, expiryDate } = req.body

        await Promo.findByIdAndUpdate(_id, { name, discountValue, status, startDate, expiryDate })
            .then(r => {
                if(r === null) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}) }
                return res.status(200).json({ error: false, message: 'Berhasil mengubah data promo!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    deletePromo: async (req, res) => {
        const { _id } = req.params;

        await Promo.findByIdAndDelete(_id)
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil menghapus data promo!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    }
}