const express = require('express');
const router = express.Router();
const { addTestimonial, getTestimonial, getAllTestimonial, updateTestimonial, deleteTestimonial } = require('./controller');

router.post('/add', addTestimonial);
router.get('/:_id', getTestimonial);
router.get('/', getAllTestimonial);
router.put('/:_id/update', updateTestimonial);
router.delete('/:_id', deleteTestimonial)

module.exports = router;