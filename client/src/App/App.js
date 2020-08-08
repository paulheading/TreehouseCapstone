import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Bootstrap from "./pages/Bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// NASA API Key HJ03QquubaScQ8wcRsU1gPyQELUbrOBwMvUjtliq
// https://api.nasa.gov/planetary/apod?api_key=HJ03QquubaScQ8wcRsU1gPyQELUbrOBwMvUjtliq

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/list" component={List} />
          <Route path="/bootstrap" component={Bootstrap} />
        </Switch>
      </div>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
