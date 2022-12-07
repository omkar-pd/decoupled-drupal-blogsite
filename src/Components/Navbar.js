import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavElements";
import { Context } from "../Context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../Services/auth";
const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const onLogout = async () => {
    const res = await handleLogout();
    if (res) {
      dispatch({
        type: "LOGOUT",
      });
      navigate("/signin");
    }
  };
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          {state.isAuthenticated && <NavLink to="/blog/create">Create</NavLink>}
          {/* <NavLink to="/update">Update</NavLink> */}
          <NavLink to="/">Blogs</NavLink>
          {!state.isAuthenticated && <NavLink to="/sign-up">Sign Up</NavLink>}
        </NavMenu>
        <NavBtn>
          {state.isAuthenticated ? (
            <NavBtnLink onClick={onLogout}>Log Out</NavBtnLink>
          ) : (
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          )}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
