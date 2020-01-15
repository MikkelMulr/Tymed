import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header = ({ user }) => {
	return (
		<div className='Header'>
			<h2>
				<Link to='/'>
					TY<span>MED</span>
				</Link>
			</h2>
			{user.name ? <Link to='/dashboard'>Timers</Link> : <Link to='/login'>Log in</Link>}
		</div>
	);
};

export default Header;
