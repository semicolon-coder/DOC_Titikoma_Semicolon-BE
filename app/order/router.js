const express = require('express');
const router = express.Router();
const { index, viewDetail } = require('./controller');

router.get('/', index);
router.get('/:_id', viewDetail)

module.exports = router;