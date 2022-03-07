const express = require('express');
const router = express.Router();
const { addPromo, getPromo, getAllPromo, updatePromo, deletePromo } = require('./controller');

router.post('/add', addPromo);
router.get('/:_id', getPromo);
router.get('/', getAllPromo)
router.put('/:_id/update', updatePromo);
router.delete('/:_id', deletePromo);

module.exports = router;