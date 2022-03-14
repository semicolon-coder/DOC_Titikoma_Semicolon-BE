const express = require('express');
const router = express.Router();
const { index, viewAdd, actionCreate, viewDetail, actionUpdate, actionDelete } = require('./controller');
const { requireAuth } = require('../../middleware/authMiddleware');

router.get('/', requireAuth, index);
router.get('/add', requireAuth, viewAdd);
router.post('/add', requireAuth, actionCreate);
router.get('/:_id', requireAuth, viewDetail);
router.put('/:_id/update', requireAuth, actionUpdate);
router.delete('/:_id', requireAuth, actionDelete);

module.exports = router;