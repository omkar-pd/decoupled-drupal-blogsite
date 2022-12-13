import React, { useRef } from "react";
import { toast } from "react-toastify";
import { handleLogin } from "../Services/auth";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/userContext";
import { useContext } from "react";

export const Login = () => {
  const { dispatch } = useContext(Context);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const response = await handleLogin(username, password).then((res) => {
      return res;
    });
    if (response) {
      dispatch({
        type: "LOGIN",
      });
      toast.success("Logged In Successfully !", {
        theme: "dark",
        position: "top-center",
      });
      navigate("/");
    } else {
      toast.error(
        "Something went wrong, Please Check your Username and Password !",
        {
          theme: "dark",
          position: "top-center",
        }
      );
    }
  };

  return (
    <div className="h-screen flex bg-gray-bg">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Log in to your account 🔐
        </h1>

        <form onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="Username"
              placeholder="Your Username"
              ref={usernameRef}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Your Password"
              ref={passwordRef}
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
