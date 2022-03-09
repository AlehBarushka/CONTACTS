import React from 'react';

const SearchInput = () => {
	return (
		<div className='container mt-3'>
			<div className='col-lg-6'>
				<form className='row'>
					<div className='col'>
						<div className='mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Search names...'
							/>
						</div>
					</div>
					<div className='col'>
						<div className='mb-2'>
							<button className='btn btn-outline-dark'>Seacrh</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SearchInput;
