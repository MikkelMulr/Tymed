import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timer from '../../components/timer/Timer.component';
import './Home.styles.scss';
import '../dashboard/Dashboard.styles.scss';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			timer: { h: null, m: null, ampm: null },
			userTimers: []
		};
	}

	handleUserSuccessfulLogIn() {
		this.setState({ loggedIn: this.props.loggedInStatus });
	}

	// Extend through sort to newest
	componentDidMount() {
		try {

			if (this.props.userData.timers) {
				this.setState({ timer: { h: this.props.userData.timers[0].setFor[0], m: this.props.userData.timers[0].setFor[1], ampm: this.props.userData.timers[0].setFor[2] } });
			}

			if (this.props.userData) {
				this.createUserTimers();
			} else {
				setTimeout(() => {
					this.createUserTimers();
				}, 2000);
			}

			this.handleUserSuccessfulLogIn();
		} catch (err) {
			console.log(err);
		}
	}

	createUserTimers = () => {
		if (this.props.userData.timers) {
			let timers = this.props.userData.timers.map((med, index) => {
				return (
					<Timer
						medName={med.medication}
						alarmOn={true}
						hour={med.setFor[0]}
						min={med.setFor[1]}
						ampm={med.setFor[2] === 0 ? 'am' : 'pm'}
						repeat={med.repeat}
						key={index}
					/>
				);
			});
			this.setState({ userTimers: timers });
		} else {
			this.setState({ userTimers: <h3>No timers exist yet</h3> });
		}
	};

	makeNewTimer = (name, hour, min, ampm) => {
		let newTimer = {
			medName: name,
			hour: hour,
			min: min,
			ampm: ampm
		};

		return newTimer;
	}

	render() {

		console.log(this.state.timer);
		return (
			<div className='Home'>
				{this.state.loggedIn ? null : <h2 className="Home--header">TY<span>MED</span></h2>}
				<div className="Home--linkcontainer">
					{this.props.loggedInStatus === 'NOT_LOGGED_IN' ? <Link to='/login'>GET <span>STARTED</span></Link> : null}
					{/* Tighten up */}
					{this.props.loggedInStatus === 'LOGGED_IN' ? <h2>{`Welcome back ${this.props.userData.first_name}`}</h2> : ''}
					{this.props.loggedInStatus === 'LOGGED_IN' ? <p>{this.state.timer.h ? `Next Timer: ${this.state.timer.h}:${this.state.timer.m}${this.state.timer.ampm === 0 ? 'AM' : 'PM'}` : ''}</p> : null}
					{this.props.loggedInStatus === 'LOGGED_IN' ? <h4 onClick={this.props.logout}>LOG OUT</h4> : null}
				</div>

				{this.props.loggedInStatus === 'LOGGED_IN' ? <div className="Home--timers">
					<div className='Home--Dashboard'>
						<div className='Dashboard--timers'>
							<h2>MY TIMERS</h2>
							{this.state.userTimers}</div>
					</div>
				</div> : null}
			</div>
		);

	}
}

export default Home;
