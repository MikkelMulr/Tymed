import React, { Component } from 'react';
import './App.styles.scss';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home.component';
import Login from './pages/login/Login.component';
import Dashboard from './pages/dashboard/Dashboard.component';
import Header from './components/header/header.component';

class App extends Component {
	state = {
		loggedInStatus: 'NOT_LOGGED_IN',
		currentUserData: {},
		userData: null
	};

	getCurrentUserData = (user) => {
		this.setState({ currentUserData: user });
	};

	handleLoginStatus = () => {
		this.setState({ loggedInStatus: 'LOGGED_IN' });
	};

	render() {
		return (
			<div className='App'>
				<Header user={this.state.currentUserData} />
				<Switch>
					<Route
						exact
						path='/'
						render={(props) => (
							<Home {...props} loggedInStatus={this.state.loggedInStatus} userData={this.state.currentUserData} />
						)}
						validity={this.state.foundUser}
					/>
					<Route
						exact
						path='/login'
						render={(props) => (
							<Login {...props} getUser={this.getCurrentUserData} setLoginStatus={this.handleLoginStatus} />
						)}
					/>
					<Route
						exact
						path='/dashboard'
						render={(props) =>
							this.state.loggedInStatus === 'LOGGED_IN' ? (
								<Dashboard {...props} userData={this.state.currentUserData} />
							) : (
								<Login {...props} getUser={this.getCurrentUserData} setLoginStatus={this.handleLoginStatus} />
							)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
