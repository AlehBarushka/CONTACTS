import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobilePhone } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
	return (
		<>
			<nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
				<div className='container'>
					<Link to={'/'} className='navbar-brand'>
						<FontAwesomeIcon
							className='text-warning me-1'
							icon={faMobilePhone}
						/>
						Contact <span className='text-warning'>Manager</span>
					</Link>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
