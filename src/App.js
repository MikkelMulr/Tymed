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
		userData: null,
		currentUserID: ''
	};

	getCurrentUserID = (id) => {
		this.setState({ currentUserID: id });
	}

	getCurrentUserData = (user, id) => {
		this.setState({ currentUserData: user });
		this.setState({ currentUserID: id });

	};

	handleLoginStatus = () => {
		this.setState({ loggedInStatus: 'LOGGED_IN' });
	};

	handleLogOut = () => {
		this.setState({ loggedInStatus: 'NOT_LOGGED_IN' });
	}

	render() {
		return (
			<div className='App'>
				<Header user={this.state.currentUserData} logStatus={this.state.loggedInStatus} />
				<Switch>
					<Route
						exact
						path='/'
						render={(props) => (
							<Home {...props} loggedInStatus={this.state.loggedInStatus} userData={this.state.currentUserData} logout={this.handleLogOut} />
						)}
						validity={this.state.foundUser}
					/>
					<Route
						exact
						path='/login'
						render={(props) => (
							<Login {...props} getUser={this.getCurrentUserData} setLoginStatus={this.handleLoginStatus} getID={this.getCurrentUserID} />
						)}
					/>
					<Route
						exact
						path='/dashboard'
						render={(props) =>
							this.state.loggedInStatus === 'LOGGED_IN' ? (
								<Dashboard {...props} userData={this.state.currentUserData} userID={this.state.currentUserID} />
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
