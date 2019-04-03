import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../ExpenseForm';
import { addExpense } from '../../actions/expenses';


class AddExpensePage extends Component {
  onSubmit = (expense) => {
    console.log('Submit form has been clicked!', expense);
    this.props.dispatch(addExpense(expense));
    this.props.history.push('/');
  };

  render() {
    return (
      <section>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add new expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addExpense: (expense) => dispatch(addExpense(expense))
  }
}

export default connect(mapDispatchToProps)(AddExpensePage);

// export default AddExpensePage;