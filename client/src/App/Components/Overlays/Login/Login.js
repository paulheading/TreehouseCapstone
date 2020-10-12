import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { getAuthRoute, getRoute } from "../../../modules/helpers";
import { RemoveIcon } from "../../SvgIcon/SvgIcon";
import "./Login.scss";

// https://www.reddit.com/r/learnjavascript/comments/iei80j/why_a_function_still_returns_me_promise_pending/#t1_g2gp49m

export default function Login({
  setIsLoginOpen,
  setCurrentUser,
  setBlackLists,
  setSavedFilms,
  setIsSignupOpen,
}) {
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
          <Button
            block
            size="md"
            variant="primary"
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              let getUser = await getAuthRoute(
                "users",
                emailAddress.current.value,
                password.current.value
              );
              if (getUser.message) {
                console.log(getUser.message);
              } else {
                setCurrentUser(getUser);
                setSavedFilms(await getRoute("saved", getUser.id));
                setBlackLists(await getRoute("blacklist", getUser.id));
                setIsLoginOpen(false);
              }
            }}
          >
            Log in
          </Button>
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
