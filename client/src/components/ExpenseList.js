import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import { setExpenses } from '../actions/expenses';

class ExpenseList extends Component {
	componentDidMount() {
		this.props.setExpenses();
	}
	
	renderExpenseListItem() {
		if (this.props.expenses.length === 0) {
			return (
				<div className="list-item list-item--message">
					<span>No expenses</span>
				</div>
			);
		} else {
			return this.props.expenses.map(expense => {
				return <ExpenseListItem key={expense._id} {...expense} />
			});
		}
	}

	render() {
		return (
			<div className="content-container">
				<div className="list-header">
					<div className="show-for-mobile">Expenses</div>
					<div className="show-for-desktop">Expenses</div>
					<div className="show-for-desktop">Amount</div>
				</div>
				<div className="list-body">
					{this.renderExpenseListItem()}
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
		// expenses: state.expenses
	};
};

export default connect(mapStateToProps, { setExpenses })(ExpenseList);