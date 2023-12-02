import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthDispatch } from "../../authProvider/Auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const dispatch = useAuthDispatch();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Create the auth object
  const auth = getAuth();

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
        dispatch({ type: "SET_USER", payload: userCredential.user });
        alert("Login Successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Wrong email adress or password. Try again.");
      }
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
    </Form>
  );
};

export default Login;
