// models.js
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Expense Schema
const expenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    payment: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Required userId
});

// Models
const User = mongoose.model('User', userSchema);
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = { User, Expense };
