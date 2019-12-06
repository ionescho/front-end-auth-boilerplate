import React from 'react';
import './MainContent.scss';
import { 
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Login from '../Login'
import Signup from '../Signup'

function App() {
  return (
  	<Router>
	  	<div className="MainContent">
	  	<Switch>
	  		<Route exact path="/">
	      		<Login />
			</Route>
	  		<Route path="/signup">
	  			<Signup />
	  		</Route>
	  	</Switch>
	    </div>
	</Router>
	);
}

export default App;
