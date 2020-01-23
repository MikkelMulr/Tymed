import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Timer from '../../components/timer/Timer.component';
import './Home.styles.scss';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			timer: { h: null, m: null, ampm: null }
		};
	}

	componentDidMount() {
		if (this.props.userData.timers) {
			this.setState({ timer: { h: this.props.userData.timers[0].setFor[0], m: this.props.userData.timers[0].setFor[1], ampm: this.props.userData.timers[0].setFor[2] } });
		}
	}

	render() {
		console.log(this.state.timer);
		return (
			<div className='Home'>
				<h2>Home</h2>
				{this.props.loggedInStatus === 'NOT_LOGGED_IN' ? <Link to='/login'>Log in</Link> : null}
				{/* <Link to='/login'>Log in</Link> */}
				<Link to='/dashboard'>Dashboard</Link>
				<h2>{this.props.loggedInStatus === 'LOGGED_IN' ? `Welcome back ${this.props.userData.first_name}` : ''}</h2>
				<p>{this.state.timer.h ? `Next Timer: ${this.state.timer.h}:${this.state.timer.m}${this.state.timer.ampm === 0 ? 'AM' : 'PM'}` : ''}</p>

				<header className='Home--head'>
					{/* <h2 /> */}
				</header>
			</div>
		);
	}
}

export default Home;
