const express = require('express');
const router = express.Router();
const { index, viewAdd, actionCreate, viewDetail, actionUpdate, actionDelete } = require('./controller');

router.get('/', index);
router.get('/add', viewAdd);
router.post('/add', actionCreate);
router.get('/:_id', viewDetail);
router.put('/:_id/update', actionUpdate);
router.delete('/:_id', actionDelete);

module.exports = router;