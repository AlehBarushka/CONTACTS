import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signUp } from '../../slices/authSlice';

import Title from '../Contacts/Title';
import SignUpForm from './SignUpForm';

const SignUp = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authData.isAuth);

	const registerNewUser = (userData) => {
		dispatch(signUp(userData));
	};

	return isAuth ? (
		<Navigate to='/' />
	) : (
		<>
			<Title textColor='text-dark'>SignUp</Title>
			<div className='container mt-3'>
				<div className='col-lg-4 col-md-6'>
					<SignUpForm registerNewUser={registerNewUser} />
				</div>
			</div>
		</>
	);
};

export default SignUp;
