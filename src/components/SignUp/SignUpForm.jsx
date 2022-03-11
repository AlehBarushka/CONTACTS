import React from 'react';
import { useFormik } from 'formik';

const SignUpForm = ({ registerNewUser, isLoading }) => {
	const formik = useFormik({
		initialValues: {
			userName: '',
			email: '',
			password: '',
		},
		onSubmit: (userData) => {
			registerNewUser(userData);
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className='mb-2'>
				<input
					name='userName'
					value={formik.values.userName}
					onChange={formik.handleChange}
					type='text'
					className='form-control'
					placeholder='Username'
				/>
			</div>
			<div className='mb-2'>
				<input
					name='email'
					value={formik.values.email}
					onChange={formik.handleChange}
					type='email'
					className='form-control'
					placeholder='Email'
				/>
			</div>
			<div className='mb-2'>
				<input
					name='password'
					value={formik.values.password}
					onChange={formik.handleChange}
					type='password'
					className='form-control'
					placeholder='Password'
				/>
			</div>
			<button disabled={isLoading} type='submit' className='btn btn-dark'>
				SignUp
			</button>
		</form>
	);
};

export default SignUpForm;
