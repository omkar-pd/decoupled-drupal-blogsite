import React, { useState, useRef } from "react";
import { Input } from "../Components/Input";
import "./css/Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(usernameRef.current.value);
    console.log(passwordRef.current.value);

  };

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
