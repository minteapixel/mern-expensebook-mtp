const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const isLoggedIn = require('../middleware/requireLogin');

// NOTE: all coming from "/api/expenses"

const errMsg = { error: 'Oops, something went wrong. Please try again.' };
const notOwnerErrMsg = { error: 'Cannot access expense.' };

// INDEX - show ALL expenses
router.get("/", isLoggedIn, (req, res) => {
  Expense.find().where('author.id').equals(req.user._id).exec((err, expenses) => {
    if (err) {
      return res.status(422).send(errMsg);
    }
    return res.json(expenses);
  });
});

// CREATE - add new expense
router.post("/add", isLoggedIn, (req, res, next) => {
  const { name, date, amount, note } = req.body;
  const newExpense = { 
    name,
    date,
    amount,
    note,
    author: {
      id: req.user._id,
      user: req.user.email
    } 
  };
  Expense.create(newExpense).then((newExpense) => {
    res.json({ expense: newExpense });
  }).catch(next);
});

// READ - show info about ONE specific expense
router.get("/:id", isLoggedIn, (req, res) => {
  Expense.findById(req.params.id).exec((err, foundExpense) => {
    if(err) {
      return res.status(422).send(notOwnerErrMsg);
    } else {
      if (foundExpense.author.id.equals(req.user.id)) {
        return res.json(foundExpense);
      } else {
        return res.status(422).send(notOwnerErrMsg);
      }
    };
  });
});

// UPDATE - edit expense
router.put("/:id", isLoggedIn, (req, res) => {
  Expense.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, updatedExpense) => {
    if(err) {
      return res.status(422).send(errMsg);
    } else {
      return res.json(updatedExpense);
    }
  });
});

// DELETE - destroy expense from database
router.delete("/:id", isLoggedIn, (req, res, next) => {
  Expense.findByIdAndRemove(req.params.id).then(() => {
    res.json({ success: true, message: "expense removed" });
  }).catch(next);
});

module.exports = router;