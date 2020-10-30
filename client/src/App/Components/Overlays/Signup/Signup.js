import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { ExitButton, ExitArea, SignupFormButton } from "../../Buttons/Index";
import PropTypes from "prop-types";
import "./Signup.scss";

export default function SignupOverlay({ setCurrentUser, setIsFirstTime }) {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errorMsgs, setErrorMsgs] = useState([]);

  return (
    <div className="overlay__container signup">
      <ExitButton />
      <div className="overlay__wrap">
        <Form className="overlay__form">
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
          <SignupFormButton
            firstName={firstName}
            lastName={lastName}
            emailAddress={emailAddress}
            password={password}
            setCurrentUser={setCurrentUser}
            setIsFirstTime={setIsFirstTime}
            setErrorMsgs={(delta) => {
              setErrorMsgs(delta);
            }}
          />
        </Form>
        <p className="has-account">
          Already have an account?
          <Link to="/login">
            <Button variant="link">Log in</Button>
          </Link>
        </p>
      </div>
      <ExitArea />
    </div>
  );
}

SignupOverlay.propTypes = {
  errorMsgs: PropTypes.array,
};
