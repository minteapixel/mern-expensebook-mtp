import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import UserForm from '../UserForm';

class LoginPage extends Component {
  handleRedirect = () => {
    this.props.history.push('/dashboard');
  };

  onSubmit = (props) => {
    this.props.loginUser(props);
  };

  componentDidUpdate(prevProps) {
    if (this.props.auth !== prevProps.auth && this.props.auth) {
      console.log('hello the component updated!');
      this.handleRedirect();
    }
  };

  render(){
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h2 className="box-layout__title">Welcome to ExpenseBook!</h2>
          <p>Easily manage your expenses for a peace of mind.</p>
          <div>
            { this.props.error && <p className="form__error">{this.props.error}</p> }
          </div>
          <UserForm 
            onSubmit={this.onSubmit}
            pageTitle='homepage'
          />
          <p>
            <Link to='/register'>New user? Register here!</Link>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { error: state.auth.error,
  auth: state.auth.user ? true : false };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: ({ email, password }) => dispatch(loginUser({ email, password }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));