import axios from 'axios';
import { SET_EXPENSES, EDIT_EXPENSE, FETCH_EXPENSE, ADD_EXPENSE, REMOVE_EXPENSE } from './types';

// REQUEST for expenses all expenses
export const setExpenses = () => async dispatch => {
  const res = await axios.get('/api/expenses')

  dispatch({ type: SET_EXPENSES, payload: res.data });
};

// REQUEST for ONE expense
export const fetchExpense = (id) => async dispatch => {
  const res = await axios.get("/api/expenses/" + id);

  dispatch({ type: FETCH_EXPENSE, payload: res.data });
};

// ADD EXPENSE
export const addExpense = (expense) => async dispatch => {
  return axios
    .post('/api/expenses/add', expense)
    .then(console.log(expense))
    .then(() => {
      dispatch({
        type: ADD_EXPENSE,
        expense
      });
    })
    .catch(error => { console.log(error) });
};

export const editExpense = (expense) => dispatch => {
  return axios
    .put(`/api/expenses/${expense._id}`, expense)
    .then(() => {
      dispatch({
        type: EDIT_EXPENSE,
        expense
      });
    })
    .catch(error => { throw(error); });
};

// DELETE - REMOVE EXPENSE
export const removeExpense = (id) => dispatch => {
  return axios
    .delete(`/api/expenses/${id}`)
    .then(() => {
      dispatch({
        type: REMOVE_EXPENSE,
        id
      })
    });
}


// ====================
// export const setExpenses = () => dispatch => {
//   return axios
//   .get('/api/expenses')
//   .then(({ data }) => {
//     dispatch({ 
//       type: SET_EXPENSES,
//       payload: { data }
//     });
//   });
// };