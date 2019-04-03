import { combineReducers } from 'redux';
import authReducer from './authReducer';
import expensesReducer from './expensesReducer';
import filtersReducer from './filtersReducer';

export default combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  filters: filtersReducer
});
