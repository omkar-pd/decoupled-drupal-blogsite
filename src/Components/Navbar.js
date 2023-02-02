import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/userContext";
import { getCurrentUserDetails, handleLogout } from "../Services/auth";
import { Search } from "./Search";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const [userId, setUserId] = useState("");
  const [isToggled, SetIsToggled] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await getCurrentUserDetails();
      setUserId(res.user.id);
    };
    state.isAuthenticated && getCurrentUser();
  }, [state]);

  const onLogout = async () => {
    const res = await handleLogout();
    if (res) {
      dispatch({
        type: "LOGOUT",
      });
      setUserId("");
      navigate("/signin");
    }
  };
  const onSearchToggled = (e) => {
    SetIsToggled(!isToggled);
  };

  return (
    <nav className="w-full bg-white shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <NavLink to="/">
              <h2 className="text-2xl font-bold">DRUPAL BLOG</h2>
            </NavLink>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-0 md:block md:pb-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 p-0 pb-4 md:pb-0 md:flex md:space-x-6 md:space-y-0 list-none">
              <li className="text-black-600 hover:text-blue-600">
                <NavLink to="/"> Home </NavLink>
              </li>
              {state.isAuthenticated && (
                <li className="text-black-600 hover:text-blue-600">
                  <NavLink to="/blog/create">Create</NavLink>
                </li>
              )}
              <li className="text-black-600 hover:text-blue-600">
                <NavLink to="/blogs">Blogs</NavLink>
              </li>
              {isToggled && (
                <div className={`${isToggled && "toggled"} `}>
                  <Search />
                </div>
              )}
              <li className="text-black-600 hover:text-blue-600">
                <button onClick={onSearchToggled}>
                  <FaSearch className="text-black text-2xl cursor-pointer" />
                </button>
              </li>
              <li>
                {state.isAuthenticated ? (
                  <div className="flex gap-3">
                    <NavLink to={`/user/account/${userId}`}>
                      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg
                          className="absolute w-12 h-12 text-gray-400 -left-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </NavLink>
                    <NavLink
                      onClick={onLogout}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Log Out
                    </NavLink>
                  </div>
                ) : (
                  <NavLink
                    to="/signin"
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Sign In
                  </NavLink>
                )}
              </li>
              {!state.isAuthenticated && (
                <li className="text-black-600 hover:text-blue-600">
                  <NavLink
                    to="/register"
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Sign Up
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
