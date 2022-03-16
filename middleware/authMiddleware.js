// Import jwt for session token
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.session;

    // If token found will be proceed to verify the token
    if(token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if(err) {
                res.redirect('/auth');
            } else {
                next();
            }
        })
    //    if token not found, redirect to auth page
    } else {
        res.redirect('/auth');
    }
}

module.exports = { requireAuth };