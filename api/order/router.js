const express = require('express');
const router = express.Router();
const { addOrder, getOrder, getAllProduct, updateOrder, deleteOrder } = require('./controller');

router.post('/add', addOrder);
router.get('/:_id', getOrder);
router.get('/', getAllProduct);
router.put('/:_id/update', updateOrder);
router.delete('/:_id', deleteOrder);

module.exports = router;