const express = require('express');
const { User, Expense } = require('./models');



const router = express.Router();


// User routes
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});


router.post('/users', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
});


router.put('/users/:id', async (req, res) => {
  try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user', error });
  }
});

router.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
});


// Expense routes
// Expense routes
router.get('/expenses', async (req, res) => {
    const expenses = await Expense.find();
    // Explicitly populate only the 'userId' without the full user document
    const expensesWithUserId = expenses.map(expense => {
      return {
        ...expense.toObject(),
        userId: expense.userId.toString()  // Ensure the userId is returned as a string
      };
    });
    res.json(expensesWithUserId);
  });
  

router.post('/expenses', async (req, res) => {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
});


router.put('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expense);
});

router.delete('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;