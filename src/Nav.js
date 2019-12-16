import React from "react";
import { NavLink } from "react-router-dom";

const Nav = function() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink> | <NavLink to="/users">Users</NavLink>
      </nav>
    </>
  );
};

export default Nav;
