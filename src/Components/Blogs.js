// import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { fetchArticles } from "../Services/fetchData";
const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetchArticles().then((res)=> {
       setBlogs(res)
      });
    }
    fetchData()
  }, []);

  console.log(blogs);
  return (
    <div className="blogs">
      {blogs && blogs.map((item,index)=> {
        return(
            <BlogCard key={index} title = {item.attributes.title} body={item.attributes.body.processed} id={item.id}></BlogCard>
        )
      })}
    </div>
  );
};

export default Blogs;
