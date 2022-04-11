const express = require('express');
const router = express.Router();
const {
    getCategory,
    getAllCategory,
    addOrder,
    getOrderById,
    getAllProduct,
    getProductById,
    getProductByProductId,
    getPromoByCode,
    getPromoById,
    getAllPromo,
    addTestimonial,
    getAllTestimonial
} = require('./controller');

router.get('/category/:_id', getCategory);
router.get('/category', getAllCategory);
router.post('/order/add', addOrder);
router.get('/order/:_id', getOrderById);
router.get('/product', getAllProduct);
router.get('/product/:_id', getProductById);
router.get('/product/product-id/:productId', getProductByProductId);
router.get('/promo/code/:code', getPromoByCode)
router.get('/promo/:_id', getPromoById);
router.get('/promo', getAllPromo);
router.post('/testimonial/add', addTestimonial);
router.get('/testimonial', getAllTestimonial);

module.exports = router;
