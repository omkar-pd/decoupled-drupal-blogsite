import React, { useState, useRef, useEffect } from "react";
import { Input } from "../Components/Input";
import { handleLogin } from "../Services/auth";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";
export const Login = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const response = await handleLogin(username, password).then((res) => {
      navigate('/')
      return res;
    });
    // if (response) {
    //   setIsLoggedIn(true);
    // }
  };

  useEffect(() => {
    console.log("HELLO");
  });
  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler}>
        <Input
          type="text"
          label="Enter Username"
          name="email-username"
          ref={usernameRef}
        />
        <Input
          type="password"
          label="Enter Password"
          name="password"
          ref={passwordRef}
        />
        <Input type="submit" />
      </form>
    </div>
  );
};
