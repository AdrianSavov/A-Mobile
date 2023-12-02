import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthDispatch } from '../../authProvider/Auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';  // Import getAuth
import "./register.css";

const Register = () => {
  const dispatch = useAuthDispatch();
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  
  // Create the auth object
  const auth = getAuth();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleRegister = async (event) => {
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

    if (Object.keys(newErrors).length === 0) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        dispatch({ type: 'SET_USER', payload: userCredential.user });
        // You can redirect the user to another page after successful registration
      } catch (error) {
        console.error('Error creating user:', error);
        // Handle registration error
      }
    }
  };

  return (
    <Form className="reg-form-container" onSubmit={handleRegister}>
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
