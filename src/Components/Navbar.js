import React, { useEffect } from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavElements";
import { isLoggedIn } from "../Services/auth";

const Navbar = () => {
  let user;
  // useEffect = () => {
  //   user = isLoggedIn().then((res) => {
  //     return res;
  //   });
  // };

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/create">Create</NavLink>
          <NavLink to="/update">Update</NavLink>
          <NavLink to="/">Blogs</NavLink>
          <NavLink to="/sign-up">Sign Up</NavLink>
        </NavMenu>
        <NavBtn>
          {/* {user ? ( */}
            {/* <NavBtnLink to="/logout">Log Out</NavBtnLink> */}
          {/* ) : ( */}
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          {/* )} */}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
