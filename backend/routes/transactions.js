const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, getSummary } = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getTransactions);
router.post('/', protect, addTransaction);
router.get('/summary', protect, getSummary);

module.exports = router;
