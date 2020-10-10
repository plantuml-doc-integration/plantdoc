import React from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/"  >
					<HomePage />
				</Route>
				<Route exact path="/test"  >
					<TestPage />
				</Route>
				<Route path="*">
					Not Found page working in progress
					</Route>

			</Switch>
		</div>
	);
}

export default App;
