import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, Form } from 'react-bootstrap';

const SignUpForm = ({ onSubmit, isLoading }) => {
  const signUpFormFormSchema = Yup.object().shape({
    userName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Password should be at least 6 characters')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
    },
    onSubmit: (userData) => {
      onSubmit(userData);
    },
    validationSchema: signUpFormFormSchema,
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className='mb-2'>
        <Form.Control
          name='userName'
          value={formik.values.userName}
          onChange={formik.handleChange}
          type='text'
          placeholder='Username'
          isInvalid={formik.errors?.userName && formik.touched?.userName}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.errors.userName}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Control
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          type='email'
          placeholder='Email'
          isInvalid={formik.errors?.email && formik.touched?.email}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Control
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          type='password'
          placeholder='Password'
          isInvalid={formik.errors?.password && formik.touched?.password}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        disabled={isLoading}
        variant='dark'
        type='submit'
        className='me-2'
      >
        SignUp
      </Button>
    </Form>
  );
};

export default SignUpForm;
