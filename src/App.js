import "./App.css";
import Blogs from "./Components/Blogs";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailedBlog from "./Pages/DetailedBlog";
import Navbar from "./Components/Navbar";
import { Login } from "./Pages/Login";
import { ContextProvider } from "./Context/userContext";
// import { useEffect } from "react";
// import { isLoggedIn } from "./Services/auth";

function App() {
  // useEffect(() => {
  //   const ifLoggedIn = async () => {
  //     const res = await isLoggedIn();

  //     console.log(res);
  //   };
  //   ifLoggedIn();
  // });

  return (
    <ContextProvider>
      <div className="App">
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="blog/:id" element={<DetailedBlog />} />
            <Route path="/signin" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </ContextProvider>
  );
}

export default App;
