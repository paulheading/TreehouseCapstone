import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import { searchFilm, searchAlbums } from "./modules/search";
import { filmResult, albumResults, sessionExpired } from "../actions";
import { getSpotifyData, getOMDBData } from "./modules/newSearch";

// Import react components
import { SearchForm, SearchMessage, SearchResults } from "./Components/Search";
import Navigation from "./Components/Navigation/Navigation";
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
  const store = {
    searchQuery: useSelector((state) => state.searchQuery),
    sessionExpired: useSelector((state) => state.sessionExpired),
    blackList: useSelector((state) => state.blackList),
  };

  // blacklist defaults to store contents
  async function albumData(delta, blacklist = store.blackList) {
    if (delta) {
      const results = await searchAlbums(delta, blacklist);
      sessionExpired(results.expired);
      albumResults(results.data);
    }
  }

  async function filmData(delta) {
    if (delta) {
      const result = await searchFilm(delta, process.env.REACT_APP_OMDB_API);
      filmResult(result);
    }
  }

  useEffect(() => {
    document.title = "MovieTunes | Homepage";
  }, []);

  return (
    <div className={`App loggedIn`}>
      <div className="dashboard-screen">
        <MemoryRouter>
          <Route path="/about" exact component={AboutOverlay} />
          <Route
            path="/login"
            exact
            component={() => {
              return (
                // doSearch refreshes blacklist instantly
                <LoginOverlay
                  doSearch={(delta, blacklist) => {
                    // albumData(delta, blacklist);
                    // filmData(delta);
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
                // doSearch refreshes blacklist instantly
                <AccountOverlay
                  doSearch={(delta, blacklist) => {
                    // albumData(delta, blacklist);
                    // filmData(delta);
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
                      (async () => {
                        albumResults(await getSpotifyData(delta));
                        filmResult(await getOMDBData(delta));
                      })();
                    }}
                  />
                  {store.searchQuery ? <SearchResults /> : <SearchMessage />}
                </div>
              );
            }}
          />
        </MemoryRouter>
      </div>
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
