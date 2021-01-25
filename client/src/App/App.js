import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import { filmResult, albumResults, sessionExpired } from "../actions";

import { SearchForm, SearchResults } from "./Components/Search";
import Navigation from "./Components/Navigation";
import {
  AboutOverlay,
  AccountOverlay,
  LoginOverlay,
  MenuOverlay,
  SignupOverlay,
} from "./Components/Overlays";

import "./App.scss";

export function sayHello() {
  return "hello";
}

// https://hellocode.dev/updating-state
// https://www.positronx.io/react-onclick-event-handling-methods-with-examples/
// https://jscomplete.com/learn/react-beyond-basics/react-cfp

function App() {
  useEffect(() => {
    document.title = "MovieTunes | Homepage";
  }, []);

  function HomeScreen() {
    return (
      <div>
        <Navigation />
        <SearchForm />
        <SearchResults />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="dashboard-screen">
        <MemoryRouter>
          <Route path="/about" exact component={AboutOverlay} />
          <Route path="/login" exact component={LoginOverlay} />
          <Route path="/signup" exact component={SignupOverlay} />
          <Route path="/menu" exact component={MenuOverlay} />
          <Route path="/account" exact component={AccountOverlay} />
          <Route path="/" exact component={HomeScreen} />
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
