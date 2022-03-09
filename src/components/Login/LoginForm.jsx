import React from 'react';
import { useFormik } from 'formik';

const LoginForm = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
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
			<button type='submit' className='btn btn-dark'>
				Login
			</button>
		</form>
	);
};

export default LoginForm;
