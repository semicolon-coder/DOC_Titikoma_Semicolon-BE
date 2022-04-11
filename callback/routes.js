const express = require('express');
const { invoices } = require("./controller");
const router = express.Router();

router.post('/invoices', invoices);

module.exports = router;
