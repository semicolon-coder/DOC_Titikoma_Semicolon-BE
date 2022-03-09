const express = require('express');
const router = express.Router();
const { getCategory, addOrder, getOrderById, getOrderByOrderId, getProductById, getProductByProductId, getPromo, getTestimonial, getAllTestimonial } = require('./controller');

router.get('/category/:_id', getCategory);
router.post('/order/add', addOrder);
router.get('/order/:_id', getOrderById);
router.get('/order/order-id/:orderId', getOrderByOrderId);
router.get('/product/:_id', getProductById);
router.get('/product/product-id/:productId', getProductByProductId);
router.get('/promo/:_id', getPromo);
router.get('/testimonial/:_id', getTestimonial);
router.get('/testimonial', getAllTestimonial);

module.exports = router;