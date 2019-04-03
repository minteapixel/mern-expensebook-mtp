import React, { Component } from 'react';

export default class UserForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: '',
			buttonText: props.pageTitle === 'register' ? 'Sign me up!' : 'Login'
		};
	}

	onEmailChange = (e) => {
		const email = e.target.value;
		this.setState(() => ({ email }));
  };

	onPasswordChange = (e) => {
		const password = e.target.value;
		this.setState(() => ({ password }));
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (!this.state.email || !this.state.password) {
			this.setState(() => ({ error: 'Please enter your email address and password.' }));
		} else {
			this.setState(() => ({ error: '' }));
			this.props.onSubmit({
				email: this.state.email,
				password: this.state.password,
			});
		}
	};
	render() {
		return (
			<form className="form" onSubmit={this.onSubmit}>
				{this.state.error && <p className="form__error">{this.state.error}</p>}
				<div>
					<label className="form__label--title">Email</label>
						<div>
							<input
								className="text-input"
								type="text"
								placeholder="hello@example.com"
								value={this.state.email} 
								onChange={this.onEmailChange}
								autoComplete="none"
							/>
						</div>
				</div>

				<div>
					<label className="form__label--title">Password</label>
					<div>
						<input
							className="text-input"
							type="password"
							placeholder="password"
							value={this.state.password}
							onChange={this.onPasswordChange}
							autoComplete="none"
						/>
					</div>
				</div>

				<div>
					<button className='button'>{this.state.buttonText}</button>
				</div>
			</form>
		)
	}
}