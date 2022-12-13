import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Homepage } from "./Pages/Homepage";
import Blogs from "./Components/Blogs";
import DetailedBlog from "./Pages/DetailedBlog";
import Navbar from "./Components/Navbar";
import { Login } from "./Pages/Login";
import { ContextProvider } from "./Context/userContext";
import { CreateArticle } from "./Pages/CreateArticle";
import { Update } from "./Pages/Update";
import { SearchResults } from "./Pages/SearchResults";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
function App() {
  return (
    <ContextProvider>
      <div className="bg-slate-100 pb-10 min-h-screen">
        <Router>
          <Navbar></Navbar>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="blog/:id" element={<DetailedBlog />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/blog/create" element={<CreateArticle />} />
            <Route path="/blog/update/:id" element={<Update />} />
            <Route path="/blog/search/:query" element={<SearchResults />} />
          </Routes>
        </Router>
      </div>
    </ContextProvider>
  );
}

export default App;
