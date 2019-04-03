import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ _id, name, amount, date }) => (
	<Link className="list-item" to={`expense/edit/${_id}`}>
		<div key={_id}>
			<h3 className="list-item__title">{name}</h3>
			<span className="list-item__sub-title">{moment(date).format('MMMM Do, YYYY')}</span>
		</div>
		<h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
	</Link>
);

export default ExpenseListItem;