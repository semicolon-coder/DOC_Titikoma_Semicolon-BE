const express = require('express');
const router = express.Router();
const {
    getCategory,
    getAllCategory,
    addOrder,
    getOrderById,
    getOrderByOrderId,
    getAllProduct,
    getProductById,
    getProductByProductId,
    getPromo,
    getAllPromo,
    addTestimonial,
    getAllTestimonial
} = require('./controller');

router.get('/category/:_id', getCategory);
router.get('/category', getAllCategory);
router.post('/order/add', addOrder);
router.get('/order/:_id', getOrderById);
router.get('/order/order-id/:orderId', getOrderByOrderId);
router.get('/product', getAllProduct)
router.get('/product/:_id', getProductById);
router.get('/product/product-id/:productId', getProductByProductId);
router.get('/promo/:_id', getPromo);
router.get('/promo', getAllPromo);
router.post('/testimonial/add', addTestimonial);
router.get('/testimonial', getAllTestimonial);

module.exports = router;