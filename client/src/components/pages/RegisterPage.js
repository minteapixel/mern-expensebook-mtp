import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signup } from '../../actions/auth';
import UserForm from '../UserForm';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleRedirect = () => {
    this.props.history.push('/dashboard')
  };

  onSubmit = (props) => {
    this.props.signup(props);
  };

  componentDidUpdate(prevProps) {
    if (this.props.auth !== prevProps.auth && this.props.auth) {
      this.handleRedirect();
    }
  };

  render() {
    return (
      <div className="box-layout__box">
        <div className="content-container">
          <h2>Register for a new account on ExpenseBook!</h2>
          <div>
            {this.props.error && <p className="form__error">{this.props.error}</p>}
          </div>
          <UserForm
            onSubmit={this.onSubmit}
            pageTitle='register'
          />
          <Link to='/'>Returning user? Login here!</Link>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return { error: state.auth.error,
  auth: state.auth.authenticated ? true : false };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: ({ email, password }) => dispatch(signup({ email, password }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterPage));