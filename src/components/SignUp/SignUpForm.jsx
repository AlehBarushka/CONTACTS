import React from 'react';

const SignUpForm = () => {
	return (
		<form>
			<div className='mb-2'>
				<input
					name='username'
					type='text'
					className='form-control'
					placeholder='Username'
				/>
			</div>
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
				SignUp
			</button>
		</form>
	);
};

export default SignUpForm;
