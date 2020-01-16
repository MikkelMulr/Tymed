import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.styles.scss';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		};
	}

	render() {
		return (
			<div className='Home'>
				<h2>Home</h2>
				{this.props.loggedInStatus === 'NOT_LOGGED_IN' ? <Link to='/login'>Log in</Link> : null}
				{/* <Link to='/login'>Log in</Link> */}
				<Link to='/dashboard'>Dashboard</Link>
				<h2>{this.props.loggedInStatus === 'LOGGED_IN' ? `Welcome back ${this.props.userData.first_name}` : ''}</h2>

				<header className='Home--head'>
					{/* <h2 /> */}
				</header>
			</div>
		);
	}
}

export default Home;
