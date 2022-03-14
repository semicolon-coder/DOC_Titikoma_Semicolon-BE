const User = require('./model');
const jwt = require('jsonwebtoken');

module.exports = {
    index: async (req, res) => {
        res.render('auth/index.ejs');
    },
    actionSignin: async (req, res) => {
        const { email, password } = req.body;
        const tokenExpires = 3 * 24 * 60 * 60;

        await User.login(email, password)
            .then(r => {
                const token = jwt.sign({
                    player: {
                        id: r._id,
                        name: r.name,
                        email: r.email,
                        role: r.role
                    }
                }, process.env.JWT_KEY, { expiresIn: tokenExpires })

                res.cookie('session', token, { httpOnly: true, maxAge: tokenExpires * 1000 });
                res.redirect('/');
            })
            .catch(e => {
                res.redirect('/auth');
                console.log(e.message);
            })
    },
    actionSignout: async (req, res) => {
        res.cookie('session', '', { maxAge: 1 });
        res.redirect('/auth');
    }
}