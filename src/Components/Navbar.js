import React, { useContext, useState } from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavElements";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/userContext";
import { handleLogout } from "../Services/auth";
import { Search } from "./Search";
import { FaSearch } from "react-icons/fa";
import "./css/Search.css";

const Navbar = () => {
  const [isToggled, SetIsToggled] = useState(false);
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
  const onSearchToggled = (e) => {
    SetIsToggled(!isToggled);
  };
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          {state.isAuthenticated && <NavLink to="/blog/create">Create</NavLink>}
          <NavLink to="/blogs">Blogs</NavLink>
          {!state.isAuthenticated && <NavLink to="/register">Sign Up</NavLink>}
        </NavMenu>
        <NavMenu>
          <div className={`${isToggled && "toggled"} `}>
            {isToggled && <Search />}
          </div>
          <NavBtn onClick={onSearchToggled}>
            <FaSearch className="text-white text-3xl cursor-pointer" />
          </NavBtn>
          <NavBtn>
            {state.isAuthenticated ? (
              <NavBtnLink onClick={onLogout}>Log Out</NavBtnLink>
            ) : (
              <NavBtnLink to="/signin">Sign In</NavBtnLink>
            )}
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
