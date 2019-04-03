import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal, allExpenses }) => {
	const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
	const expensePlural = allExpenses === 1 ? 'expense' : 'expenses';

	return (
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title">Dashboard</h1>
				<h3 className="page-header__title">
					Viewing <span>{ expenseCount }</span> out of { allExpenses } { expensePlural } totalling <span>{ formattedExpensesTotal }</span>
				</h3>
				<div className="page-header__actions">
      		<Link className="button" to="expense/add">Add new expense</Link>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters);

	return {
		expenseCount: visibleExpenses.length,
		expensesTotal: selectExpensesTotal(visibleExpenses),
		allExpenses: state.expenses.length
	};
};

export default connect(mapStateToProps)(ExpensesSummary);