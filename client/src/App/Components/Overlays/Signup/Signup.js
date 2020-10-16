import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { createRoute } from "../../../modules/helpers";
import { RemoveIcon } from "../../Icons/Icons";
import PropTypes from "prop-types";
import "./Signup.scss";

export default function Signup({
  setIsLoginOpen,
  setIsSignupOpen,
  setCurrentUser,
  setIsFirstTime,
}) {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errorMsgs, setErrorMsgs] = useState([]);

  return (
    <div className="login-overlay__container">
      <div
        className="login-overlay__exit-icon"
        onClick={() => {
          setIsSignupOpen(false);
        }}
      >
        <RemoveIcon variant="secondary" />
      </div>
      <div className="login-overlay__wrap">
        <Form className="login-overlay__form">
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              ref={firstName}
              type="text"
              placeholder="First name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control ref={lastName} type="text" placeholder="Last name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={emailAddress}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          {errorMsgs.length > 0 ? (
            <Form.Group>
              <Form.Text>
                {errorMsgs.map((value, index) => {
                  return (
                    <Alert variant="danger" key={index}>
                      {value}
                    </Alert>
                  );
                })}
              </Form.Text>
            </Form.Group>
          ) : null}
          <Button
            block
            size="md"
            variant="primary"
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              let newUser = await createRoute("users", {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                emailAddress: emailAddress.current.value,
                password: password.current.value,
                level: "free",
              });
              if (!newUser.errors) {
                setCurrentUser(newUser);
                setIsFirstTime(true);
                setIsSignupOpen(false);
              } else {
                setErrorMsgs(newUser.errors);
              }
            }}
          >
            Sign up
          </Button>
        </Form>
        <p className="has-account">
          Already have an account?
          <Button
            variant="link"
            onClick={() => {
              setIsSignupOpen(false);
              setIsLoginOpen(true);
            }}
          >
            Log in
          </Button>
        </p>
      </div>
      <div
        className="login-overlay__exit"
        onClick={() => {
          setIsSignupOpen(false);
        }}
      ></div>
    </div>
  );
}

Signup.propTypes = {
  errorMsgs: PropTypes.array,
};
