import { Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../redux/actions/auth';

import { Col, Container, Row } from 'react-bootstrap';

import Title from '../components/Title';
import SignUpForm from '../components/SignUpForm';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authData);

  const handleSingUp = (userData) => {
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
            <SignUpForm onSubmit={handleSingUp} isLoading={isLoading} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUpPage;
