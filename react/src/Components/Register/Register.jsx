import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthDispatch } from '../../authProvider/Auth';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, getFirestore, getDoc } from 'firebase/firestore';
import './register.css';

const Register = () => {
  const dispatch = useAuthDispatch();
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

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

        // Set custom claim for the user's role
        const role = await setFirstUserAsAdmin(userCredential.user.uid);

        // Set user profile information
        await updateProfile(userCredential.user, { displayName: role });

        dispatch({ type: 'SET_USER', payload: userCredential.user });
        alert('User created successfully!');
        navigate('/login');
      } catch (error) {
        console.error('Error creating user:', error);
        // Handle registration error
      }
    }
  };

  // Function to set custom claim for the first user as admin
  const setFirstUserAsAdmin = async (uid) => {
    const currentAdminCount = await getAdminCount();

    // Check if this is the first registered user
    const role = currentAdminCount === 0 ? 'admin' : 'user';

    // Set custom claim for the user's role
    await setAdminClaim(uid, role);

    // Increment the admin count in Firestore
    await incrementAdminCount();

    return role;
  };

  // Function to set custom claim
  const setAdminClaim = async (uid, role) => {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, { role }, { merge: true });
  };

  // Function to get the current count of admin users
  const getAdminCount = async () => {
    // Get the current admin count from Firestore
    const adminCountRef = doc(db, 'adminCount', 'count');
    const snapshot = await getDoc(adminCountRef);
    return snapshot.data()?.count || 0;
  };

  // Function to increment the admin count in Firestore
  const incrementAdminCount = async () => {
    const adminCountRef = doc(db, 'adminCount', 'count');
    const currentAdminCount = await getAdminCount();
    await setDoc(adminCountRef, { count: currentAdminCount + 1 });
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
      <div className="login-link">
        Already have an account? <Link to="/login">Login here!</Link>
      </div>
    </Form>
  );
};

export default Register;
