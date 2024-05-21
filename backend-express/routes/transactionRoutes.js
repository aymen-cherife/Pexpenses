const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const transactionController = require('../Controllers/transactionController');

router.post('/transaction', verifyToken, transactionController.createTransaction);
router.get('/transactions', verifyToken,transactionController.getAllTransactions);
router.put('/transaction/:id', verifyToken,transactionController.updateTransaction);
router.delete('/transaction/:id', verifyToken,transactionController.deleteTransaction);


module.exports = router;