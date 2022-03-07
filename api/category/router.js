const express = require('express');
const router = express.Router();
const { addCategory, getCategory, getAlCategory, updateCategory, deleteCategory } = require('./controller');

router.post('/add', addCategory);
router.get('/:_id', getCategory);
router.get('/', getAlCategory);
router.put('/:_id/update', updateCategory);
router.delete('/:_id', deleteCategory);

module.exports = router;