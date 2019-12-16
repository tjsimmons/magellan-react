import React from "react";
import Users from "./Users";
import Home from "./Home";
import Nav from "./Nav";
import { Route } from "react-router-dom";

const App = function() {
  return (
    <>
      <Nav />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/users">
        <Users />
      </Route>
    </>
  );
};

export default App;
