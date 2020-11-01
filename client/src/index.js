// https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

import "./index.css";
import App from "./App/App";

render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
