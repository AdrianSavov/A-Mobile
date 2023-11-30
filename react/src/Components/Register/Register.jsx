import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import "./register.css";

const Register = () => {
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    // Check for email errors
    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Check for password errors
    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Check for confirm password errors
    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
  };

  return (
    <Form className="reg-form-container" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" value={values.email} onChange={handleChange} placeholder="Enter email" isInvalid={errors.email} />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={values.password} onChange={handleChange} placeholder="Password" isInvalid={errors.password} />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPasswordConfirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} placeholder="Confirm Password" isInvalid={errors.confirmPassword} />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
      </Form.Group>
        <div className='reg-btn-container'>
      <Button variant="primary" type="submit">
        Register
      </Button>
        </div>
    </Form>
  );
};

export default Register;