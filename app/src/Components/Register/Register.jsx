import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useUser } from "../Login/UserContext";
import './register.css';

const Register = () => {
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();
  const { dispatch: userDispatch } = useUser();


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await createUserWithEmailAndPassword(auth, values.email, values.password);

        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);

         const db = getFirestore();
         const userDocRef = doc(db, "users", userCredential.user.uid);
         const userDoc = await getDoc(userDocRef);
 
         const userRole = userDoc.data()?.role || "user";
 
         userDispatch({
           type: "SET_USER",
           payload: { ...userCredential.user, role: userRole },
         });
 
         localStorage.setItem("authToken", userCredential.user.accessToken);
 

        toast.success('User created and logged in successfully!');

        navigate('/');
      } catch (error) {
        console.log(error);
        toast.error('Error creating user:', error);
      }
    }
  };

  return (
    <Form className="reg-form-container" onSubmit={handleRegister}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" value={values.email} onChange={handleChange} placeholder="Enter Email Here" isInvalid={errors.email} />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={values.password} onChange={handleChange} placeholder="Enter Password Here" isInvalid={errors.password} />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicPasswordConfirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} placeholder="Confirm Password Here" isInvalid={errors.confirmPassword} />
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
