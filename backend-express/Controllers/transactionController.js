const Transaction = require('../Models/Transaction');

//============================CREATE===================================================
exports.createTransaction = async (req, res) => {
    const { amount, date, category, description, tags, user } = req.body;
    try {
        const newTransaction = new Transaction({
            amount, 
            date, 
            category, 
            description, 
            tags, 
            user
        });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//===============================================================================
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//=============================UPDATE==================================================
exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//=============================DELETE==================================================
exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Transaction.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//===========================SORT_SEARCH====================================================
//=============================================