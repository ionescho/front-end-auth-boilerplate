import React from 'react';
import './MainContent.scss';
import { 
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Login from '../Login'
import Signup from '../Signup'
import authenticationService from "../_services/authentication.service"

function App() {
	let isLogged = authenticationService.isLoggedIn();
	return (
		<Router>
		  	<div className="MainContent">
		  		{
		  			isLogged ?
			  		(<Switch>
			  			<Route exact path="/">
			  				Tralalalala
			  			</Route>
			  		</Switch>)
			  		:
				  	(<Switch>
				  		<Route exact path="/">
				      		<Login />
						</Route>
				  		<Route path="/signup">
				  			<Signup />
				  		</Route>
				  	</Switch>)
				}
		    </div>
		</Router>
	);
}

export default App;
