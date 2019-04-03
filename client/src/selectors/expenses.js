import moment from 'moment';

// get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses.filter((expense) => {
		const createdAtMoment = moment(expense.date);
		const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true ;
		const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
		const textMatch = expense.name.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;
	}).sort((a, b) => {
		if (sortBy === 'date') { // sorted by most recent to least recent
			return a.date < b.date ? 1 : -1;
		} else if (sortBy === 'amount') { // sorted by most expensive to least expensive
			return a.amount < b.amount ? 1 : -1;
		}
	});
};

export default getVisibleExpenses;