module.exports = {
    index: async (req, res) => {
        res.render('dashboard/index', {position: 'dashboard', title: "Dashboard - TITIKOMA"});
    }
}