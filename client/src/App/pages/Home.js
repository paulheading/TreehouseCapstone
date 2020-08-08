import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1>Project Home</h1>
        {/* Link to List.js */}
        <Link to={"./list"}>
          <Button variant="btn btn-primary">My List</Button>
        </Link>
      </div>
    );
  }
}
export default Home;
