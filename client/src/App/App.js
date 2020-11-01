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

function App({ filmResult, albumResults }) {
  // environment variables
  require("dotenv").config();
  // spotify variables
  const params = getHashParams();
  const token = params.access_token;
  // display variables
  const [film, setFilm] = useState(null); // available in store
  const [albums, setAlbums] = useState(null); // available in store
  // user variables
  const [savedFilms, setSavedFilms] = useState([]);
  const [blackLists, setBlackLists] = useState([]);
  const [resultSaved, setResultSaved] = useState(false);
  const [updateSearch, setUpdateSearch] = useState(null);

  const searchQuery = useSelector((state) => state.searchQuery);
  const sessionExpired = useSelector((state) => state.sessionExpired);

  if (token) {
    spotifyApi.setAccessToken(token);
  }

  const loggedIn = useState(token ? true : false);

  async function albumTest(delta) {
    const results = await searchAlbums(delta, blackLists);
    sessionExpired(results.expired);
    albumResults(results.data);
  }

  async function filmTest(delta) {
    const result = await searchFilm(delta, process.env.REACT_APP_OMDB_API);
    filmResult(result);
  }

  useEffect(() => {
    document.title = "MovieTunes | Homepage";
  }, []);

  return (
    <div className={`App ${applyClass(loggedIn[0], "loggedIn")}`}>
      {loggedIn[0] && !sessionExpired ? (
        <div className="dashboard-screen">
          <MemoryRouter>
            <Route path="/about" exact component={AboutOverlay} />
            <Route
              path="/login"
              exact
              component={() => {
                return (
                  <LoginOverlay
                    setResultSaved={(delta) => {
                      setResultSaved(delta);
                    }}
                    setSavedFilms={(delta) => {
                      setSavedFilms(delta);
                    }}
                    setBlackLists={(delta) => {
                      setBlackLists(delta);
                    }}
                    doSearch={(delta) => {
                      filmTest(delta);
                      albumTest(delta);
                    }}
                  />
                );
              }}
            />
            <Route
              path="/signup"
              exact
              component={() => {
                return <SignupOverlay />;
              }}
            />
            <Route
              path="/menu"
              exact
              component={() => {
                return (
                  <MenuOverlay
                    setSavedFilms={(delta) => {
                      setSavedFilms(delta);
                    }}
                    setBlackLists={(delta) => {
                      setBlackLists(delta);
                    }}
                  />
                );
              }}
            />
            <Route
              path="/account"
              exact
              component={() => {
                return (
                  <AccountOverlay
                    savedFilms={savedFilms}
                    blackLists={blackLists}
                    doSearch={(delta) => {
                      searchFilm(searchQuery);
                      searchAlbums(searchQuery);
                    }}
                    setBlackLists={(delta) => {
                      setBlackLists(delta);
                    }}
                    setSavedFilms={(delta) => {
                      setSavedFilms(delta);
                    }}
                    setResultSaved={(delta) => {
                      setResultSaved(delta);
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
                    <Navigation
                      setSavedFilms={(delta) => {
                        setSavedFilms(delta);
                      }}
                      setBlackLists={(delta) => {
                        setBlackLists(delta);
                      }}
                    />
                    <SearchForm
                      savedFilms={savedFilms}
                      updateSearch={updateSearch}
                      doSearch={(delta) => {
                        filmTest(delta);
                        albumTest(delta);
                      }}
                      setResultSaved={(delta) => {
                        setResultSaved(delta);
                      }}
                      setUpdateSearch={(delta) => {
                        setUpdateSearch(delta);
                      }}
                    />
                    {searchQuery ? (
                      <SearchResults
                        albums={albums}
                        film={film}
                        savedFilms={savedFilms}
                        resultSaved={resultSaved}
                        setResultSaved={(delta) => {
                          setResultSaved(delta);
                        }}
                        setSavedFilms={(delta) => {
                          setSavedFilms(delta);
                        }}
                        setAlbums={(delta) => {
                          setAlbums(
                            albums.filter((value) => {
                              return value.id !== delta;
                            })
                          );
                        }}
                        setBlackLists={(delta) => {
                          setBlackLists(delta);
                        }}
                      />
                    ) : (
                      <SearchMessage />
                    )}
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
  console.log(state);
  return state;
};

export default connect(mapStateToProps, {
  filmResult,
  albumResults,
})(App);
