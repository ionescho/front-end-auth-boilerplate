import React from 'react';
import { Link, useHistory } from "react-router-dom"
import authenticationService from "../_services/authentication.service"

class Signup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			password: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		let history = useHistory();
		authenticationService.signup(this.state).then(() => {
			history.push("/");
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
				<h1>Sign Up</h1>
				<input id="name" name="name" type="text" onChange={(event) => this.updateField( "name", event.target.value )} placeholder="Name"/>
				<input id="email" name="email" type="text" onChange={(event) => this.updateField( "email", event.target.value )} placeholder="Email"/>
				<input id="password" name="password" type="password" onChange={(event) => this.updateField( "password", event.target.value )} placeholder="Password"/>
				<div className="formBottom">
					<button onClick={this.handleSubmit}>SIGN UP</button>
					<span>Already have an account? <Link to="/">Log in</Link></span>
				</div>
			</div>
		);
	}
}

export default Signup;
