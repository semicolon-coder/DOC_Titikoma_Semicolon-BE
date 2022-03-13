const express = require('express');
const router = express.Router();
const { index, viewDetail, updateOrder} = require('./controller');

router.get('/', index);
router.get('/:_id', viewDetail);
router.put('/:_id/update', updateOrder);

module.exports = router;