import React from 'react';
import './MainContent.scss';
import {
	Switch,
	Route,
	withRouter
} from "react-router-dom";
import Login from '../Login'
import Signup from '../Signup'
import MyIdeas from '../MyIdeas'
import authenticationService from "../_services/authentication.service"

class MainContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: authenticationService.isLoggedIn()
		}

		this.props.history.listen((location, action) => {
			this.setState({
				isLoggedIn: authenticationService.isLoggedIn()
			});
		});
	}

	render() {
		return (
			<div className="MainContent">
				<Switch>
					<Route exact path="/" component={this.state.isLoggedIn?MyIdeas:Login} />
					<Route path="/signup" component={Signup} />
				</Switch>
			</div>
		);
	}
}


export default withRouter(MainContent);
