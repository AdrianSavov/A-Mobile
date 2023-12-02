
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthDispatch } from '../../authProvider/Auth';
import { useState } from 'react';
import './login.css';

const Login = () => {
  const dispatch = useAuthDispatch();
  const [values, setValues] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch({ type: 'LOGIN', payload: { email: values.email } });
  };
    
    return (
      <Form className='form-container'>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <div className='btn-container'>
      <Button  variant="primary" type="submit">
        Login
      </Button>
      </div>
    </Form>
  );
};
export default Login;
