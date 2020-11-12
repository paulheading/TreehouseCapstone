import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import { spotifyApi, getHashParams } from "./modules/spotify";
import { searchFilm, searchAlbums } from "./modules/search";
import { applyClass } from "./modules/helpers";
import { filmResult, albumResults, sessionExpired } from "../actions";

// Import react components
import { SearchForm, SearchMessage, SearchResults } from "./Components/Search";
import Navigation from "./Components/Navigation/Navigation";
import Start from "./Components/Start/Start";
import {
  AboutOverlay,
  AccountOverlay,
  LoginOverlay,
  MenuOverlay,
  SignupOverlay,
} from "./Components/Overlays";

// Import css for bootstrap & styling for App
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

export function sayHello() {
  return "hello";
}

// https://hellocode.dev/updating-state
// https://www.positronx.io/react-onclick-event-handling-methods-with-examples/
// https://jscomplete.com/learn/react-beyond-basics/react-cfp

function App({ filmResult, albumResults, sessionExpired }) {
  // environment variables
  require("dotenv").config();
  // spotify variables
  const params = getHashParams();
  const token = params.access_token;
  const store = {
    searchQuery: useSelector((state) => state.searchQuery),
    sessionExpired: useSelector((state) => state.sessionExpired),
    blackList: useSelector((state) => state.blackList),
  };

  if (token) {
    spotifyApi.setAccessToken(token);
  }

  const loggedIn = useState(token ? true : false);

  // blacklist defaults to store contents
  async function albumData(delta, blacklist = store.blackList) {
    const results = await searchAlbums(delta, blacklist);
    sessionExpired(results.expired);
    albumResults(results.data);
  }

  async function filmData(delta) {
    const result = await searchFilm(delta, process.env.REACT_APP_OMDB_API);
    filmResult(result);
  }

  useEffect(() => {
    document.title = "MovieTunes | Homepage";
  }, []);

  return (
    <div className={`App ${applyClass(loggedIn[0], "loggedIn")}`}>
      {loggedIn[0] && !store.sessionExpired ? (
        <div className="dashboard-screen">
          <MemoryRouter>
            <Route path="/about" exact component={AboutOverlay} />
            <Route
              path="/login"
              exact
              component={() => {
                return (
                  // customSearch refreshes blacklist instantly
                  <LoginOverlay
                    customSearch={(delta, blacklist) => {
                      albumData(delta, blacklist);
                      filmData(delta);
                    }}
                  />
                );
              }}
            />
            <Route path="/signup" exact component={SignupOverlay} />
            <Route path="/menu" exact component={MenuOverlay} />
            <Route
              path="/account"
              exact
              component={() => {
                return (
                  // customSearch refreshes blacklist instantly
                  <AccountOverlay
                    customSearch={(delta, blacklist) => {
                      filmData(delta);
                      albumData(delta, blacklist);
                    }}
                    doSearch={(delta) => {
                      filmData(delta);
                      albumData(delta);
                    }}
                  />
                );
              }}
            />
            <Route
              path="/"
              exact
              component={() => {
                return (
                  <div>
                    <Navigation />
                    <SearchForm
                      doSearch={(delta) => {
                        filmData(delta);
                        albumData(delta);
                      }}
                    />
                    {store.searchQuery ? <SearchResults /> : <SearchMessage />}
                  </div>
                );
              }}
            />
          </MemoryRouter>
        </div>
      ) : (
        <div className="home-screen">
          <MemoryRouter>
            <Route path="/about" exact component={AboutOverlay} />
            <Route path="/" exact component={Start} />
          </MemoryRouter>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  filmResult,
  albumResults,
  sessionExpired,
})(App);
