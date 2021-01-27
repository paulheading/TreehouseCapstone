// https://www.reddit.com/r/learnjavascript/comments/iei80j/why_a_function_still_returns_me_promise_pending/#t1_g2gp49m

import React, { useState, useRef, useCallback } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { LoginFormButton, ExitButton, ExitArea } from "../../Buttons";
import { getAuthRoute, getRoute, isSaved } from "../../../modules/helpers";
import { getSpotifyData, getOMDBData } from "../../../modules/search";
import {
  currentUser,
  savedFilms,
  blacklist,
  resultSaved,
  albumResults,
  filmResult,
} from "../../../../actions";

function LoginOverlay({
  currentUser,
  savedFilms,
  blacklist,
  resultSaved,
  albumResults,
  filmResult,
}) {
  const state = {
    searchQuery: useSelector((state) => state.searchQuery),
    blacklist: useSelector((state) => state.blacklist),
  };

  const [userDenied, setUserDenied] = useState(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const history = useHistory();
  const closeLogin = useCallback(() => history.push("/"), [history]);

  async function doLogin(e) {
    e.preventDefault();

    const get = {
      user: await getAuthRoute(
        "users",
        emailAddress.current.value,
        password.current.value
      ),
    };

    if (get.user.message) {
      setUserDenied(get.user.message);
    } else {
      get.blacklist = await getRoute("blacklist", get.user.id);
      get.savedFilms = await getRoute("saved", get.user.id);
      get.film = await getOMDBData(state.searchQuery);
      get.albums = await getSpotifyData(state.searchQuery, get.blacklist);

      currentUser(get.user);
      savedFilms(get.savedFilms);
      blacklist(get.blacklist);
      albumResults(get.albums);
      filmResult(get.film);

      isSaved(get.savedFilms, state.searchQuery)
        ? resultSaved(true)
        : resultSaved(false);

      closeLogin();
    }
  }

  return (
    <div className="overlay__container form">
      <ExitButton />
      <div className="overlay__wrap">
        <Form className="overlay__form" onSubmit={doLogin}>
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

          <LoginFormButton />
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

export default connect(mapStateToProps, {
  currentUser,
  savedFilms,
  blacklist,
  resultSaved,
  albumResults,
  filmResult,
})(LoginOverlay);
