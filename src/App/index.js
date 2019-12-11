import React from 'react';
import {
	BrowserRouter as Router
} from "react-router-dom";
import './App.scss';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent'

function App() {
	return (
	<div className="App">
		<Router>
			<Sidebar />
			<MainContent />
		</Router>
	</div>
	);
}

export default App;
