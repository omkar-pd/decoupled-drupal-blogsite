import React, { useState } from "react";
import { Input } from "../Components/Input";
import "./css/Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler}>
        <Input
          type="text"
          label="Enter Username"
          name="email-username"
          onChange={onChangeUsername}
        />
        <Input
          type="password"
          label="Enter Password"
          name="password"
          onChange={onChangePassword}
        />
        <Input type="submit" />
      </form>
    </div>
  );
};
