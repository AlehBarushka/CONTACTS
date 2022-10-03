import { Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/auth';

import { Col, Container, Row } from 'react-bootstrap';

import LoginForm from '../components/LoginForm';
import Title from '../components/Title';

const LoginPage = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authData);

  const handleLogin = (userData) => {
    dispatch(login(userData));
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
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
