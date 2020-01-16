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
			isActive: false,
			edit: false
		}
	}

	componentDidMount() {
		let currentTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
		this.setState({ currentTime: currentTime });
	}

	render() {
		console.log(this.state.currentTime);
		if (this.props.isPrimary) {
			return (
				<div className='Timer-primary'>
					<div className='Timer-primary--title'>
						<h3>{this.props.medName}</h3>
						<p>Alarm: {this.props.alarmOn ? 'ON' : 'OFF'}</p>
					</div>
					<div className='Time-primary--progress'>
						{this.state.edit ? <EditTimer /> : <TimerProgress type='daily' />}
					</div>
				</div>
			);
		} else {
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
}


export default Timer;
