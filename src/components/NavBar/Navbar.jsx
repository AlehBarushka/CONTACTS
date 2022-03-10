import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobilePhone } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
	const isAuth = useSelector((state) => state.authData.isAuth);

	return (
		<>
			<nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
				<div className='container'>
					<div className='col'>
						<Link to={'/'} className='navbar-brand'>
							<FontAwesomeIcon
								className='text-warning me-1'
								icon={faMobilePhone}
							/>
							Contact <span className='text-warning'>Manager</span>
						</Link>
					</div>
					<div className='col d-flex justify-content-end'>
						{!isAuth ? (
							<>
								<Link
									to={'/login'}
									className='btn btn-sm btn-outline-light me-1'
								>
									Login
								</Link>
								<Link
									to={'/signup'}
									className='btn btn-sm btn-outline-light me-1'
								>
									SignUp
								</Link>
							</>
						) : (
							<button className='btn btn-sm btn-outline-light me-1'>
								Logout
							</button>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
