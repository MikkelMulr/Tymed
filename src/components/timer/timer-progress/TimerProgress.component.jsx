import React, { useEffect } from 'react';
import './TimerProgress.styles.scss';

const TimerProgress = ({ repeat, hour, min, ampm, isPrimary }) => {
	return (
		<div className='TimerProgress'>
			<h3>
				Set for:{' '}
				<span>
					{hour}:{min} {ampm}
				</span>
			</h3>
			<h4>Repeat: {repeat}</h4>
		</div>
	);
};

export default TimerProgress;
