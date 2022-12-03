// import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { fetchArticles } from "../Services/fetchData";
import jsonapi from 'jsonapi-parse';

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    function fetchData() {
      fetchArticles().then((res) => {
        setBlogs(res.map((item) => item.data));
      });
    }
    fetchData();
  }, []);
  return (
    <div className="blogs">
      {blogs &&
        blogs.map((item, index) => {
          return (
            <BlogCard
              key={index}
              title={item.data.attributes.title}
              body={item.data.attributes.body.processed}
              id={item.data.id}
              img={item.included[0].attributes.uri.url}
            ></BlogCard>
          );
        })}
    </div>
  );
};

export default Blogs;
