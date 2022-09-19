import { Navigate } from 'react-router-dom';

import { Col, Container, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/slices/authSlice';

import LoginForm from '../components/LoginForm';
import Title from '../components/Title';

const LoginPage = () => {
  const dispatch = useDispatch();
  const authData = useSelector(state => state.authData);

  const logInUser = userData => {
    dispatch(logIn(userData));
  };

  const { isAuth, isLoading } = authData;
  return isAuth ? (
    <Navigate to='/' />
  ) : (
    <>
      <Title textColor='text-dark' position='justify-content-center'>
        Login
      </Title>
      <Container className='mt-3'>
        <Row className='justify-content-center'>
          <Col md={6} lg={4}>
            <LoginForm logInUser={logInUser} isLoading={isLoading} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
