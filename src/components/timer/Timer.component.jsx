import React from 'react';
import './Timer.styles.scss';
import TimerProgress from './timer-progress/TimerProgress.component';

const Timer = ({ alarmOn, medName, hour, min, ampm, repeat, isPrimary }) => {
	if (isPrimary) {
		return (
			<div className='Timer-primary'>
				<div className='Timer-primary--title'>
					<h3>{medName}</h3>
					<p>Alarm: {alarmOn ? 'ON' : 'OFF'}</p>
				</div>
				<div className='Time-primary--progress'>
					<TimerProgress type='daily' />
				</div>
			</div>
		);
	} else {
		return (
			<div className='Timer'>
				<div className='Timer--title'>
					<h3>{medName}</h3>
					<p className='Timer--onoff'>
						Alarm: {' '}
						{alarmOn ? <span className='Timer--onoff-on'>ON</span> : <span className='Timer--onoff-off'>OFF</span>}
					</p>
				</div>
				<div className='Timer--progress'>
					<TimerProgress hour={hour} min={min === 0 ? '00' : min} ampm={ampm} repeat={repeat} />
				</div>
				<i className='fas fa-cog' />
			</div>
		);
	}
};

export default Timer;
