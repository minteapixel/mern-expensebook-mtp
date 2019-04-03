const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  name: String,
  date: Number,
  amount: Number,
  note: String,
  author: { 
    id: {
      type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    user: String
   }
});

module.exports = mongoose.model('Expense', expenseSchema);