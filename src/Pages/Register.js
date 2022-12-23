import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { handleRegister } from "../Services/register";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const passRef = useRef();
  const mailRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: userRef.current.value,
      pass: passRef.current.value,
      mail: mailRef.current.value,
    };

    const res = handleRegister(data);
    if (res) {
      navigate("/signin");
    }
  };
  return (
    <div className="bg-grey-lighter min-h-screen  flex flex-col mt-5">
      <form
        className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2"
        onSubmit={submitHandler}
      >
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Username"
            ref={userRef}
            required
          />

          <input
            type="email"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            ref={mailRef}
            required
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            ref={passRef}
            required
          />

          <button
            type="submit"
            className="bg-white flex mx-auto hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Create Account
          </button>
          <div className="text-grey-dark mt-6 text-center">
            Already have an account?<span> </span>
            <Link to="/signin" className="text-blue-600 underline    ">
              Log in
            </Link>
            .
          </div>
        </div>
      </form>
    </div>
  );
};
