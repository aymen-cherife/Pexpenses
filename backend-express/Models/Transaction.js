// Import the necessary library
const mongoose = require('mongoose');

// Create a schema for the Transaction
const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    description: String,
    tags: [String], // Array of strings for tags
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Create the model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export the model
module.exports = Transaction;

