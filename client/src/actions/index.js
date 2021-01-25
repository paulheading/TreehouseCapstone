export const justArrived = (query) => {
  return {
    type: "JUST_ARRIVED",
    payload: query,
  };
};

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

export const savedFilms = (films) => {
  return {
    type: "SAVED_FILMS",
    payload: films,
  };
};

export const blackList = (list) => {
  return {
    type: "BLACK_LIST",
    payload: list,
  };
};

export const resultSaved = (result) => {
  return {
    type: "RESULT_SAVED",
    payload: result,
  };
};
