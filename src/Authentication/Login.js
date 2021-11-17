import React, { useRef, useState } from "react";
import { useAuth } from "../context/Auth";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import FailLoginModal from "../components/modal/FailLoginModal";
import Backdrop from '../components/Backdrop'
export default function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      login(emailRef.current.value, passwordRef.current.value).then((res) => {
        if(! res.user.emailVerified)
      {
        setIsVerified(false)
        setModalShow(true)
      }
      });
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }
  return (
    <div className={classes.responsive}>
     <div  className={classes.myModal}>
      <Card>
      {isVerified===false && <><FailLoginModal show={modalShow} onHide={() => setModalShow(false)}/></>}
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <br />
            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              variant="info"
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link style={{ color: "#138496" }} to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <div className="C text-center mt-2">
        Need an account?{" "}
        <Link to="/register" style={{ color: "#138496" }}>
          Sign Up
        </Link>
        </div>
        </Card.Body>
       
      </Card>
      
      </div>
    </div>
    
  );
}
