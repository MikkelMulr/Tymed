import React, { Component } from 'react';
import './Dashboard.styles.scss';
import Timer from '../../components/timer/Timer.component';
import NewTimer from '../../components/timer/new/NewTimer.components';
import { updateUserTimer } from '../../firebase/firebase.utils';


export class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userTimers: [],
			addNew: false,

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


	createUserTimers = () => {
		try {
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
		} catch (err) {
			console.log(err);
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

	handleShowNewTimer = (name, hour, min, ampm) => {
		this.setState({ addNew: false });
		console.log('added new timer');
		console.log(this.props.userData);
		updateUserTimer(this.props.userID, name, hour, min, ampm);
		// where user is userdata.id
	}


	render() {
		return (
			<div className='Dashboard'>
				<div className='Dashboard--timers'>
					<h2>MY TIMERS</h2>
					{this.state.userTimers}</div>
				<div className='Dashboard--addNew' >
					{!this.state.addNew ? <i className="fas fa-plus-circle Dashboard--addNew-btn" onClick={() => this.setState({ addNew: true })}></i> : null}
					{this.state.addNew ? <NewTimer added={this.handleShowNewTimer} /> : null}
				</div>
			</div>
		);
	}
}

export default Dashboard;
