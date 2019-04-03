import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Footer from '../components/Footer';
import ExpenseDashboardPage from '../components/pages/ExpenseDashboardPage';
import AddExpensePage from '../components/pages/AddExpensePage';
import EditExpensePage from '../components/pages/EditExpensePage';
import NotFoundPage from '../components/pages/NotFoundPage';
import LoginPage from '../components/pages/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// TO DO: 

export const history = createBrowserHistory();

const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<PublicRoute exact path="/" component={LoginPage} />
				<PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
				<PrivateRoute path="/expense/add" component={AddExpensePage} />
				<PrivateRoute path="/expense/edit/:id" component={EditExpensePage} />
				<PublicRoute path="/register" component={RegisterPage} />
				<Route component={NotFoundPage} />
			</Switch>
			<Footer className="footer" />
		</div>
	</Router>
);

export default AppRouter;