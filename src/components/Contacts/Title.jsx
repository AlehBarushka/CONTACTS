import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Title = ({ textColor, position, children }) => {
	return (
		<Container className='mt-3'>
			<Row className={position}>
				<Col md={6} lg={4}>
					<p className={`h3 ${textColor} fw-bold`}>{children}</p>
				</Col>
			</Row>
		</Container>
	);
};

export default Title;
