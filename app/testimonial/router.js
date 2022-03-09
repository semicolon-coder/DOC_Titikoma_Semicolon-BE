const express = require('express');
const router = express.Router();
const { index } = require('./controller');

router.get('/', index);

module.exports = router;