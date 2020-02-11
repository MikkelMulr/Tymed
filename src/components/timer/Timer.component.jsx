import React, { Component } from 'react';
import './Timer.styles.scss';
import TimerProgress from './timer-progress/TimerProgress.component';
import EditTimer from '../edit/EditTimer.component';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTime: '',
			timeIntervals: [],
			frequency: '',
			isActive: true,
			edit: false
		}
	}

	componentDidMount() {
		let currentTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
		this.setState({ currentTime: currentTime });

		if (this.state.isActive) {
			this.timerInt = setInterval(() => {
				this.compareCurrentTimer(this.props.hour, this.props.min, this.props.ampm);
			}, 10000);
		}
	}

	compareCurrentTimer(endHour, endMin, ampm) {
		let currentTime_hour = new Date().getHours();
		let currentTime_min = new Date().getMinutes();
		console.log(`${ampm === 0 ? endHour : parseInt(endHour) + 12}: ${endMin}: ${ampm}`);
		console.log(`${currentTime_hour}: ${currentTime_min}`);
		if (currentTime_hour < (ampm === 0 ? parseInt(endHour) : parseInt(endHour) + 12)) {
			if (currentTime_min < parseInt(endMin)) {
				if (this.state.isActive) {
					console.log(this.props.medName);
					clearInterval(this.timerInt);
					// return true;
					this.setState({ isActive: false });
				}
			}
		} else {
			return false;
		}
	};


	render() {

		return (
			<div className='Timer'>
				<div className='Timer--title'>
					<h3>{this.props.medName}</h3>
					<p className='Timer--onoff'>
						Alarm: {' '}
						{this.props.alarmOn ? <span className='Timer--onoff-on'>ON</span> : <span className='Timer--onoff-off'>OFF</span>}
					</p>
				</div>
				<div className='Timer--progress'>
					{this.state.edit ? <EditTimer /> : <TimerProgress hour={this.props.hour} min={this.props.min === 0 ? '00' : this.props.min} ampm={this.props.ampm} repeat={this.props.repeat} />}
				</div>
				<i className='fas fa-cog' style={this.state.edit ? { color: '#11aa99' } : { color: '#fff' }} onClick={() => { this.setState({ edit: !this.state.edit }) }} />
			</div>
		);
	}

}


export default Timer;
