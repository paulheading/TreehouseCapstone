import React, { useState, useEffect } from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { spotifyApi, getHashParams } from "./modules/spotify";
import { applyClass } from "./modules/helpers";

// Import react components
import Navigation from "./Components/Navigation/Navigation";
import Start from "./Components/Start/Start";
import {
  AboutOverlay,
  AccountOverlay,
  LoginOverlay,
  MenuOverlay,
  SignupOverlay,
} from "./Components/Overlays/Index";
import {
  SearchForm,
  SearchMessage,
  SearchResults,
} from "./Components/Search/Index";

// Import css for bootstrap & styling for App
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

export function sayHello() {
  return "hello";
}

// https://hellocode.dev/updating-state
// https://www.positronx.io/react-onclick-event-handling-methods-with-examples/
// https://jscomplete.com/learn/react-beyond-basics/react-cfp

export default function App() {
  // environment variables
  require("dotenv").config();
  // spotify variables
  const params = getHashParams();
  const token = params.access_token;
  // display variables
  const [searchTerm, setSearchTerm] = useState(null);
  const [film, setFilm] = useState(null);
  const [albums, setAlbums] = useState(null);
  // user variables
  const [currentUser, setCurrentUser] = useState(null);
  const [savedFilms, setSavedFilms] = useState([]);
  const [blackLists, setBlackLists] = useState([]);
  const [expired, setExpired] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [resultSaved, setResultSaved] = useState(false);
  const [updateSearch, setUpdateSearch] = useState(null);

  if (token) {
    spotifyApi.setAccessToken(token);
  }

  const loggedIn = useState(token ? true : false);

  function searchAlbums(delta, limit = 15) {
    setSearchTerm(delta);
    setAlbums(null);

    spotifyApi
      .searchAlbums(delta, { limit })
      .then((data) => {
        return data.albums.items.map(
          ({ name, id, external_urls, images, release_date }) => {
            const url = external_urls.spotify;
            return {
              name,
              id,
              url,
              images,
              release_date,
            };
          }
        );
      })
      .then((data) => {
        let filter = [];
        if (blackLists) {
          data.forEach((data) => {
            blackLists.forEach(({ searchTerm, albumId }) => {
              if (searchTerm === delta) {
                if (albumId === data.id) {
                  filter.push(albumId);
                }
              }
            });
          });
        }
        return data.filter((data) => {
          return filter.indexOf(data.id) === -1;
        });
      })
      .then((data) => {
        data.forEach((value) => {
          value.related = [];
          spotifyApi.getAlbumTracks(value.id).then(({ items }) => {
            items.forEach(({ artists }) => {
              artists.forEach(({ external_urls, name }) => {
                const url = external_urls.spotify;
                let exists = false;
                value.related.forEach((value) => {
                  if (value.name === name) {
                    exists = true;
                  }
                });
                if (!exists) {
                  value.related.push({ url, name });
                }
              });
            });
          });
        });
        return data;
      })
      .then(
        (data) => {
          setAlbums(data);
        },
        () => {
          setExpired(true);
        }
      );
  }

  async function searchFilm(delta) {
    let get = await fetch(
      `//www.omdbapi.com/?t=${delta}&apikey=${process.env.REACT_APP_OMDB_API}`
    );
    setFilm(await get.json());
  }

  useEffect(() => {
    document.title = "MovieTunes | Homepage";
  }, []);

  return (
    <div className={`App ${applyClass(loggedIn[0], "loggedIn")}`}>
      {loggedIn[0] && !expired ? (
        <div className="dashboard-screen">
          <MemoryRouter>
            <Route path="/about" exact component={AboutOverlay} />
            <Route
              path="/login"
              exact
              component={() => {
                return (
                  <LoginOverlay
                    searchTerm={searchTerm}
                    setCurrentUser={(delta) => {
                      setCurrentUser(delta);
                    }}
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
                      searchFilm(delta);
                      searchAlbums(delta);
                    }}
                  />
                );
              }}
            />
            <Route
              path="/signup"
              exact
              component={() => {
                return (
                  <SignupOverlay
                    setCurrentUser={(delta) => {
                      setCurrentUser(delta);
                    }}
                    setIsFirstTime={(delta) => {
                      setIsFirstTime(delta);
                    }}
                  />
                );
              }}
            />
            <Route
              path="/menu"
              exact
              component={() => {
                return (
                  <MenuOverlay
                    currentUser={currentUser}
                    setCurrentUser={(delta) => {
                      setCurrentUser(delta);
                    }}
                    setSavedFilms={(delta) => {
                      setSavedFilms(delta);
                    }}
                    setBlackLists={(delta) => {
                      setBlackLists(delta);
                    }}
                    setIsFirstTime={(delta) => {
                      setIsFirstTime(delta);
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
                    currentUser={currentUser}
                    savedFilms={savedFilms}
                    blackLists={blackLists}
                    doSearch={(delta) => {
                      searchFilm(delta);
                      searchAlbums(delta);
                    }}
                    setCurrentUser={(delta) => {
                      setCurrentUser(delta);
                    }}
                    setBlackLists={(delta) => {
                      setBlackLists(delta);
                    }}
                    setSavedFilms={(delta) => {
                      setSavedFilms(delta);
                    }}
                    setIsFirstTime={(delta) => {
                      setIsFirstTime(delta);
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
                      currentUser={currentUser}
                      setCurrentUser={(delta) => {
                        setCurrentUser(delta);
                      }}
                      setSavedFilms={(delta) => {
                        setSavedFilms(delta);
                      }}
                      setBlackLists={(delta) => {
                        setBlackLists(delta);
                      }}
                      setIsFirstTime={(delta) => {
                        setIsFirstTime(delta);
                      }}
                    />
                    <SearchForm
                      currentUser={currentUser}
                      savedFilms={savedFilms}
                      updateSearch={updateSearch}
                      doSearch={(delta) => {
                        searchFilm(delta);
                        searchAlbums(delta);
                      }}
                      setResultSaved={(delta) => {
                        setResultSaved(delta);
                      }}
                      setUpdateSearch={(delta) => {
                        setUpdateSearch(delta);
                      }}
                    />
                    {searchTerm ? (
                      <SearchResults
                        currentUser={currentUser}
                        searchTerm={searchTerm}
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
