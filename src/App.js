import "./App.css";
import Blogs from "./Components/Blogs";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailedBlog from "./Pages/DetailedBlog";
import Navbar from "./Components/Navbar";
import { Homepage } from "./Pages/Homepage";
import { Login } from "./Pages/Login";
import { ContextProvider } from "./Context/userContext";
import { CreateArticle } from "./Pages/CreateArticle";
import { Update } from "./Pages/Update";
import { SearchResults } from "./Pages/SearchResults";
function App() {
  return (
    <ContextProvider>
      <div className="bg-slate-100 pb-10">
        <Router>
          <Navbar></Navbar>
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
