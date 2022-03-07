const Testimonial = require('./model');

module.exports = {
    addTestimonial: async (req, res) => {
        const { name, description } = req.body;

        await Testimonial.create({ name, description })
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil membuat data testimonial!', data: r });
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null });
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
    },
    updateTestimonial: async (req, res) => {
        const { _id } = req.params;
        const { name, description } = req.body;

        await Testimonial.findByIdAndUpdate(_id, { name, description })
            .then(r => {
                if(r === null) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}) }
                return res.status(200).json({ error: false, message: 'Berhasil mengubah data testimonial!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    deleteTestimonial: async (req, res) => {
        const { _id } = req.params;

        await Testimonial.findByIdAndDelete(_id)
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil menghapus data testimonial!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    }
}