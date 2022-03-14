const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.session;

    if(token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if(err) {
                res.redirect('/auth');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/auth');
    }
}

module.exports = { requireAuth };