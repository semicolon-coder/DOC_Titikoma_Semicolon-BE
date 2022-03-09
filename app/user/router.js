const express = require('express');
const router = express.Router();
const { addUser, getUser, updateUser, deleteUser } = require('./controller');

router.post('/add', addUser);
router.get('/:_id', getUser);
router.put('/:_id/update', updateUser);
router.delete('/:_id', deleteUser);

module.exports = router;