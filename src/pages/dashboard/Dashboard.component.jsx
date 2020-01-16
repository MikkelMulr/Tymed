import React, { Component } from 'react';
import './Dashboard.styles.scss';
import Timer from '../../components/timer/Timer.component';
import NewTimer from '../../components/timer/new/NewTimer.components';
// import firebase from './firebase/firebase.utils';

export class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userTimers: []
		};
	}

	componentDidMount() {
		console.log(this.props);
		if (this.props.userData) {
			this.createUserTimers();
		} else {
			setTimeout(() => {
				this.createUserTimers();
			}, 2000);
		}
	}

	// maybe Store timers in local storage and pull in according to user auth

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

	makeNewTimer = () => { };

	render() {
		return (
			<div className='Dashboard'>

				{/* Current Timer */}

				{/* List of upcoming Timers */}

				<div className='Dashboard--timers'>
					<h2>MY DASHBOARD</h2>
					{this.state.userTimers}</div>
				<div className='Dashboard--addNew' >
					<NewTimer />
				</div>
			</div>
		);
	}
}

export default Dashboard;
