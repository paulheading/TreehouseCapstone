import React, { useState, useEffect } from "react";
import { spotifyApi, getHashParams } from "./modules/spotify";
import { applyClass } from "./modules/helpers";

// Import react components
import Navigation from "./Components/Navigation/Navigation";
import Overlays from "./Components/Overlays/Overlays";
import Start from "./Components/Start/Start";
import {
  SearchForm,
  SearchMessage,
  SearchResults,
} from "./Components/Search/Search";

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
  // overlay variables
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
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
          <Overlays
            currentUser={currentUser}
            isAboutOpen={isAboutOpen}
            isAccountOpen={isAccountOpen}
            isFirstTime={isFirstTime}
            isLoginOpen={isLoginOpen}
            isSignupOpen={isSignupOpen}
            savedFilms={savedFilms}
            blackLists={blackLists}
            searchTerm={searchTerm}
            setCurrentUser={(delta) => {
              setCurrentUser(delta);
            }}
            setIsAboutOpen={(delta) => {
              setIsAboutOpen(delta);
            }}
            setIsAccountOpen={(delta) => {
              setIsAccountOpen(delta);
            }}
            setIsLoginOpen={(delta) => {
              setIsLoginOpen(delta);
            }}
            setIsSignupOpen={(delta) => {
              setIsSignupOpen(delta);
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
            setIsFirstTime={(delta) => {
              setIsFirstTime(delta);
            }}
            setResultSaved={(delta) => {
              setResultSaved(delta);
            }}
            setUpdateSearch={(delta) => {
              setUpdateSearch(delta);
            }}
          />
          <Navigation
            currentUser={currentUser}
            setCurrentUser={(delta) => {
              setCurrentUser(delta);
            }}
            setIsLoginOpen={(delta) => {
              setIsLoginOpen(delta);
            }}
            setIsAboutOpen={(delta) => {
              setIsAboutOpen(delta);
            }}
            setIsAccountOpen={(delta) => {
              setIsAccountOpen(delta);
            }}
            setIsSignupOpen={(delta) => {
              setIsSignupOpen(delta);
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
              setIsLoginOpen={(delta) => {
                setIsLoginOpen(delta);
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
      ) : (
        <div className="home-screen">
          <Overlays
            isAboutOpen={isAboutOpen}
            setIsAboutOpen={(delta) => {
              setIsAboutOpen(delta);
            }}
          />
          <Start
            setIsAboutOpen={(delta) => {
              setIsAboutOpen(delta);
            }}
          />
        </div>
      )}
    </div>
  );
}
