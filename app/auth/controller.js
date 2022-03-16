// Import User schema
const User = require('./model');
// Import jwt for session token
const jwt = require('jsonwebtoken');

module.exports = {
    index: async (req, res) => {
        // Initialize alert
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert = { status: `${alertStatus}`, message: `${alertMessage}` }

        res.render('auth/index.ejs', { alert });
    },
    actionSignin: async (req, res) => {
        const { email, password } = req.body;
        const tokenExpires = 3 * 24 * 60 * 60;

        // Logging in user using custom login function in mongoose
        await User.login(email, password)
            .then(r => {
                // Get token from jwt
                const token = jwt.sign({
                    player: {
                        id: r._id,
                        name: r.name,
                        email: r.email,
                        role: r.role
                    }
                }, process.env.JWT_KEY, { expiresIn: tokenExpires })

                // Send token to user
                res.cookie('session', token, { httpOnly: true, maxAge: tokenExpires * 1000 });
                res.redirect('/');
            })
            .catch(e => {
                // Send alert
                req.flash('alertStatus', 'failed');
                req.flash('alertMessage', e.message);

                res.redirect('/auth');
            })
    },
    actionSignout: async (req, res) => {
        // Send alert
        req.flash('alertStatus', 'success');
        req.flash('alertMessage', 'Berhasil logout!');

        res.cookie('session', '', { maxAge: 1 });
        res.redirect('/auth');
    }
}