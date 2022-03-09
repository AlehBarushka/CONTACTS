import React from 'react';

const LoginForm = () => {
	return (
		<form>
			<div className='mb-2'>
				<input
					name='email'
					type='email'
					className='form-control'
					placeholder='Email'
				/>
			</div>
			<div className='mb-2'>
				<input
					name='password'
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
