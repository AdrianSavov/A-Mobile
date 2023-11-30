
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './login.css';

export default function Login () {
  return (
    <Form className='form-container'>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
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
