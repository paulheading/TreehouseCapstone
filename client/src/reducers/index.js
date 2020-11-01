import { combineReducers } from "redux";

const searchQueryReducer = (searchQuery = null, action) => {
  if (action.type === "SEARCH_QUERY") {
    return action.payload;
  }
  return searchQuery;
};

const filmResultReducer = (filmResult = null, action) => {
  if (action.type === "FILM_RESULT") {
    return action.payload;
  }
  return filmResult;
};

const albumResultsReducer = (albumResults = [], action) => {
  if (action.type === "ALBUM_RESULTS") {
    return action.payload;
  }
  return albumResults;
};

const sessionExpiredReducer = (expired = false, action) => {
  if (action.type === "SESSION_EXPIRED") {
    return action.payload;
  }
  return expired;
};

const currentUserReducer = (user = null, action) => {
  if (action.type === "CURRENT_USER") {
    return action.payload;
  }
  return user;
};

const firstTimeReducer = (first = false, action) => {
  if (action.type === "FIRST_TIME") {
    return action.payload;
  }
  return first;
};

export default combineReducers({
  searchQuery: searchQueryReducer,
  filmResult: filmResultReducer,
  albumResults: albumResultsReducer,
  sessionExpired: sessionExpiredReducer,
  currentUser: currentUserReducer,
  firstTime: firstTimeReducer,
});
