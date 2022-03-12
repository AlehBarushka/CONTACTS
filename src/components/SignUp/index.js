import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signUp } from '../../slices/authSlice';

import Title from '../Contacts/Title';
import SignUpForm from './SignUpForm';
import { Col, Container, Row } from 'react-bootstrap';

const SignUp = () => {
	const dispatch = useDispatch();
	const authData = useSelector((state) => state.authData);

	const registerNewUser = (userData) => {
		dispatch(signUp(userData));
	};

	const { isAuth, isLoading } = authData;
	return isAuth ? (
		<Navigate to='/' />
	) : (
		<>
			<Title textColor='text-dark' position='justify-content-center'>
				SignUp
			</Title>
			<Container className='mt-3'>
				<Row className='justify-content-center'>
					<Col md={6} lg={4}>
						<SignUpForm
							registerNewUser={registerNewUser}
							isLoading={isLoading}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default SignUp;
