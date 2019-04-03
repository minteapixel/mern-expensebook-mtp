import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../ExpenseForm';
import ConfirmRemoveModal from '../ConfirmRemoveModal';
import { fetchExpense, editExpense, removeExpense } from '../../actions/expenses';

class EditExpensePage extends Component {
  constructor(props) {
		super(props);
		this.state = {
      showModal: false,
      error: ''
		};
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    if (this.props.match.params.id) {
      this.props.fetchExpense(this.props.match.params.id);
    }
	}
	
	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	onRemove = () => {
    this.props.removeExpense(this.props.expense._id);
		this.props.history.push('/dashboard');
	};

  onSubmit = (expense) => {
    console.log('updated expense submitted: ', expense);
    this.props.editExpense(expense);
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <section>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <div>{ this.state.error && <p className="form__error">{this.state.error}</p> }</div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button className="button button--warning" onClick={this.handleOpenModal}>Delete expense</button>
      </div>
      <ConfirmRemoveModal 
        showModal = {this.state.showModal}
        name = {this.props.expense.name}
        handleCloseModal = {this.handleCloseModal}
        onRemove = {this.onRemove}
      />
      </section>
    )
  }
}

const mapStateToProps = (state, props) => {
  if (props.match.params.id) {
    console.log('state: ', state);
    return {
      expense: state.expenses.find(item => item._id === props.match.params.id)
    }
  }
  return { expense: undefined };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExpense: (id) => dispatch(fetchExpense(id)),
    editExpense: (expense) => dispatch(editExpense(expense)),
    removeExpense: (id) => dispatch(removeExpense(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);