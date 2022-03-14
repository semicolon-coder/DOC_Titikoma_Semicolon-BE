const express = require('express');
const router = express.Router();
const { index, actionSignin, actionSignout } = require('./controller');

router.get('/', index);
router.post('/signin', actionSignin);
router.get('/signout', actionSignout);

module.exports = router;