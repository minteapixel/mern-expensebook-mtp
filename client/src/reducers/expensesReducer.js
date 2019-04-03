// expenses reducer

// import { SET_EXPENSES, ADD_EXPENSE, EDIT_EXPENSE } from '../actions/expenses';

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [
			...state,
			action.expense
			];
		case 'REMOVE_EXPENSE':
			return state.filter(({ id }) => id !== action.id);
		case 'EDIT_EXPENSE':
			return state.map((expense) => expense.id === action.id ? { ...expense, ...action.expense } : expense);
		case 'SET_EXPENSES':
			return action.payload;
		case 'FETCH_EXPENSE':
			return [action.payload];
		default:
			return state;
	}
};

export default expensesReducer;