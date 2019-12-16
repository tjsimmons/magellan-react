import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const style = { color: "orange" };
  const inactiveStyle = { color: "blue" };

  return (
    <>
      <nav>
        <NavLink exact to="/" activeStyle={style} style={inactiveStyle}>
          Home
        </NavLink>{" "}
        |{" "}
        <NavLink to="/users" activeStyle={style} style={inactiveStyle}>
          Users
        </NavLink>
      </nav>
    </>
  );
};

export default Nav;
