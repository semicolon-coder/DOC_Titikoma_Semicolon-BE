const express = require('express');
const router = express.Router();
const { index } = require('./controller');
const { requireAuth } = require('../../middleware/authMiddleware');

router.get('/', requireAuth, index);

module.exports = router;