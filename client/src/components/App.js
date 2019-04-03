import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter from '../router/AppRouter';
import getVisibleExpenses from '../selectors/expenses';
import { fetchUser } from '../actions/auth.js';
import '../styles/index.scss';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <AppRouter />
      </div>
    );
  }
};

export default connect(null, { fetchUser })(App);