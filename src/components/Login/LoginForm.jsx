import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, Form } from 'react-bootstrap';

const logInFormSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(6, 'Password should be at least 6 characters')
		.required('Required'),
});

const LoginForm = ({ logInUser, isLoading }) => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (userData) => {
			logInUser(userData);
		},
		validationSchema: logInFormSchema,
	});

	return (
		<Form noValidate onSubmit={formik.handleSubmit}>
			<Form.Group className='mb-2'>
				<Form.Control
					name='email'
					type='email'
					placeholder='Email'
					value={formik.values.email}
					onChange={formik.handleChange}
					isInvalid={formik.errors?.email && formik.touched?.email}
				/>
				<Form.Control.Feedback type='invalid'>
					{formik.errors.email}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className='mb-2'>
				<Form.Control
					name='password'
					value={formik.values.password}
					onChange={formik.handleChange}
					type='password'
					placeholder='Password'
					isInvalid={formik.errors?.password && formik.touched?.password}
				/>
				<Form.Control.Feedback type='invalid'>
					{formik.errors.password}
				</Form.Control.Feedback>
			</Form.Group>
			<Button
				disabled={isLoading}
				variant='dark'
				type='submit'
				className='me-2'
			>
				Login
			</Button>
		</Form>
	);
};

export default LoginForm;
