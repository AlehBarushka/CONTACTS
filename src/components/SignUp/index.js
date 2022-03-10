import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../slices/authSlice';

import Title from '../Contacts/Title';
import SignUpForm from './SignUpForm';

const SignUp = () => {
	const dispatch = useDispatch();

	const registerNewUser = (userData) => {
		dispatch(signUp(userData));
	};

	return (
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
