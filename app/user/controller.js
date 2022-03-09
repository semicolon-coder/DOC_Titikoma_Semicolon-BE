const User = require('./model');

module.exports = {
    addUser: async (req, res) => {
        const { name, email, phoneNumber, password, role } = req.body;

        await User.create({ name, email, phoneNumber, password, role })
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil membuat data user!', data: r });
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null });
            })
    },
    getUser: async (req, res) => {
        const { _id } = req.params;

        await User.findById(_id)
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil mendapatkan data user!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    updateUser: async (req, res) => {
        const { _id } = req.params;
        const { name, email, phoneNumber, password, role } = req.body

        await User.findByIdAndUpdate(_id, { name, email, phoneNumber, password, role })
            .then(r => {
                if(r === null) { return res.status(500).json({ error: true, message: `Error, ID tidak ditemukan!`, data: null}) }
                return res.status(200).json({ error: false, message: 'Berhasil mengubah data user!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    },
    deleteUser: async (req, res) => {
        const { _id } = req.params;

        await User.findByIdAndDelete(_id)
            .then(r => {
                return res.status(200).json({ error: false, message: 'Berhasil menghapus data user!', data: r});
            })
            .catch(e => {
                return res.status(500).json({ error: true, message: `Error: ${e.message}`, data: null});
            })
    }
}