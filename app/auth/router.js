const express = require('express');
const router = express.Router();
const { index, actionSignin, actionSignout } = require('./controller');

// GET request
router.get('/', index);
// POST request
router.post('/signin', actionSignin);
// GET request
router.get('/signout', actionSignout);

module.exports = router;