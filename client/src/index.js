// https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App/App";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
