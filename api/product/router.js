const express = require('express');
const router = express.Router();
const { addProduct, getProductById, getProductByProductId, updateProduct, deleteProduct, getAllProduct } = require('./controller');

router.post('/add', addProduct);
router.get('/:_id', getProductById);
router.get('/product-id/:productId', getProductByProductId);
router.get('/', getAllProduct);
router.put('/:_id/update', updateProduct);
router.delete('/:_id', deleteProduct);

module.exports = router;