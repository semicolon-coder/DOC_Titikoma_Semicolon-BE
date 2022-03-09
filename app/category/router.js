const express = require('express');
const router = express.Router();
const { index, viewAdd, viewDetail } = require('./controller');

router.get('/', index);
router.get('/add', viewAdd);
router.get('/:_id', viewDetail);

module.exports = router;