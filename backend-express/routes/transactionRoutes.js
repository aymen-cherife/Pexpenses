const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const transactionController = require('../Controllers/transactionController');

router.get('/transactions', verifyToken,transactionController.getAllTransactions);
router.post('/transaction', verifyToken, transactionController.createTransaction);
router.put('/transaction/:id', verifyToken,transactionController.updateTransaction);
router.delete('/transaction/:id', verifyToken,transactionController.deleteTransaction);


module.exports = router;