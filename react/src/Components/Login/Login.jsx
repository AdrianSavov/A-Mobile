import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthDispatch } from "../../authProvider/Auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const dispatch = useAuthDispatch();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Check for authentication state on page load
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "SET_USER", payload: user });
        navigate("/");
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [auth, dispatch, navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const newErrors = {};

    // Check for email errors
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }

    // Check for password errors
    if (!values.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        // Store authentication token in localStorage
        localStorage.setItem("authToken", userCredential.user.accessToken);

        dispatch({ type: "SET_USER", payload: userCredential.user });

        navigate("/");
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Store authentication token in localStorage
      localStorage.setItem("authToken", userCredential.user.accessToken);

      dispatch({ type: "SET_USER", payload: result.user });

      navigate("/");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Store authentication token in localStorage
      localStorage.setItem("authToken", userCredential.user.accessToken);

      dispatch({ type: "SET_USER", payload: result.user });
      navigate("/");
    } catch (error) {
      console.error("Error logging in with Facebook:", error);
    }
  };

  return (
    <Form className="form-container" onSubmit={handleLogin}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter email"
          isInvalid={errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          isInvalid={errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="btn-container">
        <Button variant="primary" type="submit">
          Login
        </Button>
      </div>
      <div className="or">
        OR
      </div>
      <div className="btn-container-social">
        <Button className='social-btn-g' variant="outline-danger" onClick={handleGoogleLogin}>
          Continue with 𝔾oogle
        </Button>
        <Button className='social-btn-f' variant="outline-primary" onClick={handleFacebookLogin}>
          Continue with 𝔽acebook
        </Button>
      </div>
    </Form>
  );
};

export default Login;
