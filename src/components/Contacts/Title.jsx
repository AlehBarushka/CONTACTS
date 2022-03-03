import React from 'react';

const Title = (props) => {
	const { textColor } = props;
	return (
		<div className='container mt-3'>
			<p className={`h3 ${textColor} fw-bold`}>{props.children}</p>
		</div>
	);
};

export default Title;
