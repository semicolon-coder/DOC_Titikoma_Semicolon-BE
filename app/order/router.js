const express = require('express');
const router = express.Router();
const { index, viewDetail, updateOrder} = require('./controller');
const { requireAuth } = require('../../middleware/authMiddleware');

router.get('/', requireAuth, index);
router.get('/:_id', requireAuth, viewDetail);
router.put('/:_id/update', requireAuth, updateOrder);

module.exports = router;