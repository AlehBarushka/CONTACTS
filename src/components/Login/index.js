import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../slices/authSlice';

import LoginForm from './LoginForm';
import Title from '../Contacts/Title';

const Login = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authData.isAuth);

	const logInUser = (userData) => {
		dispatch(logIn(userData));
	};
	return isAuth ? (
		<Navigate to='/' />
	) : (
		<>
			<Title textColor='text-dark'>Login</Title>
			<div className='container mt-3'>
				<div className='col-lg-4 col-md-6'>
					<LoginForm logInUser={logInUser} />
				</div>
			</div>
		</>
	);
};

export default Login;
