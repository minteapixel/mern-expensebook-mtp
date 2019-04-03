import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_id: props.expense ? props.expense._id : '',
			name: props.expense ? props.expense.name : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			date: props.expense ? moment(props.expense.date) : moment(),
			calendarFocused: false,
			error: '',
			buttonText: props.expense ? 'Update expense' : 'Add expense'
		};
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.expense !== prevProps.expense) {
			this.setState({
				_id: this.props.expense._id,
				name: this.props.expense.name,
				note: this.props.expense.note,
				amount: (this.props.expense.amount / 100).toString(),
				date: moment(this.props.expense.date),
				buttonText: 'Update expense'
			});
		}
		return null;
	}

	onnameChange = (e) => {
		const name = e.target.value;
		this.setState(() => ({ name }));
	};
	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => ({ note }));
	};
	onAmountChange = (e) => {
		const amount = e.target.value;
		if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
			this.setState(() => ({ amount }));
		}
	};
	onDateChange = (date) => {
		if (date) {
			this.setState(() => ({ date }));
		}
	};
	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }));
	};
	onSubmit = (e) => {
		e.preventDefault();
		if (!this.state.name || !this.state.amount) {
			this.setState(() => ({ error: 'Please provide name and amount.' }));
		} else {
			this.setState(() => ({ error: '' }));
			this.props.onSubmit({
				_id: this.state._id,
				name: this.state.name,
				amount: parseFloat(this.state.amount, 10) * 100,
				date: this.state.date.valueOf(), //javascript uses milliseconds
				note: this.state.note
			});
		}
	};
	render() {
		return (
			<form className="form" onSubmit={this.onSubmit}>
				{this.state.error && <p className="form__error">{this.state.error}</p>}
				<label className="form__label--title">Expense Name</label>
				<input 
					className="text-input"
					type="text"
					placeholder="Expense name"
					autoFocus 
					value={this.state.name} 
					onChange={this.onnameChange}
				/>
				<label className="form__label--title">Amount</label>
				<input
					className="text-input"
					type="text"
					placeholder="Amount (USD $)"
					value={this.state.amount}
					onChange={this.onAmountChange}
				/>
				<label className="form__label--title">Date</label>
				<SingleDatePicker 
					date={this.state.date}
					onDateChange={this.onDateChange}
					focused={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					numberOfMonths={1}
					isOutsideRange={() => false}
				/>
				<label className="form__label--title">Note</label>
				<textarea
					className="textarea"
					placeholder="Add a note (optional)"
					value={this.state.note} 
					onChange={this.onNoteChange}
				>
				</textarea>
				<div>
					<button className="button">{this.state.buttonText}</button>
				</div>
			</form>
		)
	}
}