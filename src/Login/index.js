import React from 'react';
import { Link } from "react-router-dom"
import authenticationService from "../_services/authentication.service"
import './Login.scss';

class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		authenticationService.login(this.state).then(() => {
			window.location.reload();
		});
	}

	updateField(field, value) {
		this.setState({
			[field]: value
		});
	}

	render() {
		return (
			<div className="accountComponent">
				<h1>Log In</h1>
				<input id="email" type="text" onChange={(event) => this.updateField( "email", event.target.value )} placeholder="Email"/>
				<input id="password" type="password" onChange={(event) => this.updateField( "password", event.target.value )} placeholder="Password"/>
				<div className="formBottom">
					<button onClick={this.handleSubmit}>LOG IN</button>
					<span>Don't have an account? <Link to="/signup">Create an account</Link></span>
				</div>
			</div>
		);
	}
}

export default Login;
