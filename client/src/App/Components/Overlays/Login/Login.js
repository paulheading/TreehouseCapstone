import React, { useState, useRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { LoginFormButton } from "../../Buttons/Buttons";
import { RemoveIcon } from "../../Icons/Icons";
import "./Login.scss";

// https://www.reddit.com/r/learnjavascript/comments/iei80j/why_a_function_still_returns_me_promise_pending/#t1_g2gp49m

export default function Login({
  searchTerm,
  doSearch,
  setResultSaved,
  setIsLoginOpen,
  setCurrentUser,
  setBlackLists,
  setSavedFilms,
  setIsSignupOpen,
  setUpdateSearch,
}) {
  const [userDenied, setUserDenied] = useState(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  return (
    <div className="login-overlay__container">
      <div
        className="login-overlay__exit-icon"
        onClick={() => {
          setIsLoginOpen(false);
        }}
      >
        <RemoveIcon variant="secondary" />
      </div>
      <div className="login-overlay__wrap">
        <Form className="login-overlay__form">
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
            searchTerm={searchTerm}
            doSearch={doSearch}
            setCurrentUser={setCurrentUser}
            setSavedFilms={setSavedFilms}
            setBlackLists={setBlackLists}
            setIsLoginOpen={setIsLoginOpen}
            setResultSaved={setResultSaved}
            setUpdateSearch={setUpdateSearch}
            setUserDenied={(delta) => {
              setUserDenied(delta);
            }}
          />
        </Form>
        <p className="has-account">
          Don't have an account?
          <Button
            variant="link"
            onClick={() => {
              setIsLoginOpen(false);
              setIsSignupOpen(true);
            }}
          >
            Sign up
          </Button>
        </p>
      </div>
      <div
        className="login-overlay__exit"
        onClick={() => {
          setIsLoginOpen(false);
        }}
      ></div>
    </div>
  );
}
