// https://www.reddit.com/r/learnjavascript/comments/iei80j/why_a_function_still_returns_me_promise_pending/#t1_g2gp49m

import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { LoginFormButton, ExitButton, ExitArea } from "../../Buttons";
import "./Login.scss";

function LoginOverlay({ doSearch }) {
  const [userDenied, setUserDenied] = useState(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  return (
    <div className="overlay__container form">
      <ExitButton />
      <div className="overlay__wrap">
        <Form className="overlay__form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={emailAddress}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          {userDenied ? (
            <Alert variant="danger" className="user-denied">
              {userDenied}
            </Alert>
          ) : null}

          <LoginFormButton
            emailAddress={emailAddress}
            password={password}
            doSearch={doSearch}
            setUserDenied={(delta) => {
              setUserDenied(delta);
            }}
          />
        </Form>
        <p className="has-account">
          Don't have an account?
          <Link to="/signup">
            <Button variant="link">Sign up</Button>
          </Link>
        </p>
      </div>
      <ExitArea />
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LoginOverlay);
