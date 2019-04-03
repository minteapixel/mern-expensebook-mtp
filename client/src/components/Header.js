import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth.js';

class Header extends Component {
  logoutUser = () => {
    this.props.logoutUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth !== prevProps.auth && this.props.auth === '') {
      console.log('header component updated!');
      this.props.history.push('/');
    }
  };

  render() {
    return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to={this.props.auth ? '/dashboard' : '/'}>
            <h2>ExpenseBook</h2>
          </Link>
          <button className="button button--link" onClick={this.props.logoutUser}>Logout</button>
        </div>
      </div>
    </header>
    );
  };
}

const mapStateToProps = (state) => {
  return { auth: state.auth.user ? state.auth.user : '' };
};

const mapDispatchToProps = (dispatch) => ({
	logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);