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
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "./UserContext";
import { toast } from "react-toastify";
import "./login.css";

const Login = () => {
  const dispatch = useAuthDispatch();
  const { dispatch: userDispatch } = useUser();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
       if (isMounted && user) {
        dispatch({ type: "SET_USER", payload: user });
        navigate('/')
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [auth, dispatch, navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }

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

        const db = getFirestore();
        const userDocRef = doc(db, "users", userCredential.user.uid);
        const userDoc = await getDoc(userDocRef);

        const userRole = userDoc.data()?.role || "user";

        userDispatch({
          type: "SET_USER",
          payload: { ...userCredential.user, role: userRole },
        });

        localStorage.setItem("authToken", userCredential.user.accessToken);

        dispatch({ type: "SET_USER", payload: userCredential.user });

        toast.success("Login successfuly!");
        
      } catch (error) {
        toast.error("Invalid username or password!");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      localStorage.setItem("authToken", result.user.accessToken);

      dispatch({ type: "SET_USER", payload: result.user });

      toast.success("Login successfuly!");

    } catch (error) {
      toast.error("Error logging in with Google:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      localStorage.setItem("authToken", result.user.accessToken);

      dispatch({ type: "SET_USER", payload: result.user });

      toast.success("Login successfuly!");
    } catch (error) {
      toast.error("Error logging in with Facebook:", error);
    }
  };

  return (
    <div>
      <Form className="form-container" onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter Email Here"
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
            placeholder="Enter Password Here"
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
        <div className="or">OR</div>
        <div className="btn-container-social">
          <Button
            className="google-btn"
            variant="outline-danger"
            onClick={handleGoogleLogin}
          >
            Continue with 𝔾oogle
          </Button>
          <Button
            className="facebook-btn"
            variant="outline-primary"
            onClick={handleFacebookLogin}
          >
            Continue with 𝔽acebook
          </Button>
        </div>
        <div className="register-text">
          Don't have an account yet?
          <p>
            <Link to="/register">Register here!</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
