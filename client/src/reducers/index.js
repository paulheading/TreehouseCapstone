import { combineReducers } from "redux";

const loadingResult = (loadingResult = false, action) => {
  if (action.type === "LOADING_RESULT") {
    return action.payload;
  }
  return loadingResult;
};

const searchQuery = (searchQuery = null, action) => {
  if (action.type === "SEARCH_QUERY") {
    return action.payload;
  }
  return searchQuery;
};

const filmResult = (filmResult = null, action) => {
  if (action.type === "FILM_RESULT") {
    return action.payload;
  }
  return filmResult;
};

const albumResults = (albumResults = [], action) => {
  if (action.type === "ALBUM_RESULTS") {
    return action.payload;
  }
  return albumResults;
};

const currentUser = (user = null, action) => {
  if (action.type === "CURRENT_USER") {
    return action.payload;
  }
  return user;
};

const firstTime = (first = true, action) => {
  if (action.type === "FIRST_TIME") {
    return action.payload;
  }
  return first;
};

const savedFilms = (films = [], action) => {
  if (action.type === "SAVED_FILMS") {
    return action.payload;
  }
  return films;
};

const blacklist = (list = [], action) => {
  if (action.type === "BLACK_LIST") {
    return action.payload;
  }
  return list;
};

const resultSaved = (result = false, action) => {
  if (action.type === "RESULT_SAVED") {
    return action.payload;
  }
  return result;
};

export default combineReducers({
  searchQuery,
  filmResult,
  albumResults,
  currentUser,
  firstTime,
  savedFilms,
  blacklist,
  resultSaved,
  loadingResult,
});
