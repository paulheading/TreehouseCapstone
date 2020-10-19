// https://www.youtube.com/watch?v=3e1GHCA3GP0&ab_channel=techsith

import React from "react";
import ReactDOM from "react-dom";
import Block from "../Block";
import renderer from "react-test-renderer";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Block />, div);
});

it("renders block button correctly", () => {
  const { getByTestId } = render(<Block className="test" />);
  expect(getByTestId("blockButton")).toHaveClass("test");
});

it("matches snapshot", () => {
  const tree = renderer.create(<Block className="test" />).toJSON();
  expect(tree).toMatchSnapshot();
});
