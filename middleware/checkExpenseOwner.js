const User = require("../models/User");
const Expense = require("../models/Expense");

const errorMsg = { error: "Cannot confirm ownership of expense." };

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(422).send({ error: 'Please login first.' });
  } else {
    Expense.findById(req.params.id, 
    (err, foundExpense) => {
      if(err) {
        return errorMsg;
      } else {
        (foundExpense.author.id.equals(req.user.id)) ? foundExpense : errorMsg;
      }
    });
  }
};