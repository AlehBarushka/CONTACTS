import React from 'react';
import Title from '../Contacts/Title';
import SignUpForm from './SignUpForm';

const SignUp = () => {
	return (
		<>
			<Title textColor='text-dark'>SignUp</Title>
			<div className='container mt-3'>
				<div className='col-lg-4 col-md-6'>
					<SignUpForm />
				</div>
			</div>
		</>
	);
};

export default SignUp;
