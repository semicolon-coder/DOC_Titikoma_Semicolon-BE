const express = require('express');
const router = express.Router();
const { index } = require('./controller');
// Import middleware for require token to access this page
const { requireAuth } = require('../../middleware/authMiddleware');

router.get('/', requireAuth, index);

module.exports = router;