import React from 'react';
import LoginForm from './LoginForm';
import Title from '../Contacts/Title';

const Login = () => {
	return (
		<>
			<Title textColor='text-dark'>Login</Title>
			<div className='container mt-3'>
				<div className='col-lg-4 col-md-6'>
					<LoginForm />
				</div>
			</div>
		</>
	);
};

export default Login;
