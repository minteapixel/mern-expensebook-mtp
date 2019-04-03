import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
	<div className="box-layout">
		<div className="content-container">
			<h1 className="page-header__title">404 - Oops! Page not found</h1>
			<p>Return to the homepage <Link to="/">here</Link>.</p>
		</div>
	</div>
);

export default NotFoundPage;