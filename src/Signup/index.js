import React from 'react';
import { Link, withRouter } from "react-router-dom"
import authenticationService from "../_services/authentication.service"

class Signup extends React.Component {

	constructor(props, context) {
		super(props, context);

		if(authenticationService.isLoggedIn()) {
			this.props.history.push("/");			
		}

		this.state = {
			name: "",
			email: "",
			password: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		authenticationService.signup(this.state).then(() => {
			this.props.history.push("/");
		}, (error) => {
			alert(error.response.data.reason);
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

const SignupWithRouter = withRouter(Signup)

export default SignupWithRouter;
