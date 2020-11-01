export const searchQuery = (query) => {
  return {
    type: "SEARCH_QUERY",
    payload: query,
  };
};

export const filmResult = (film) => {
  return {
    type: "FILM_RESULT",
    payload: film,
  };
};

export const albumResults = (albums) => {
  return {
    type: "ALBUM_RESULTS",
    payload: albums,
  };
};

export const sessionExpired = (value) => {
  return {
    type: "SESSION_EXPIRED",
    payload: value,
  };
};

export const currentUser = (user) => {
  return {
    type: "CURRENT_USER",
    payload: user,
  };
};

export const firstTime = (user) => {
  return {
    type: "FIRST_TIME",
    payload: user,
  };
};
