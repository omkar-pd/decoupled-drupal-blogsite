import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { fetchArticles } from "../Services/fetchData";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetchArticles();
      setBlogs(res.map((item) => item.data));
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap">
      {blogs &&
        blogs.map((item, index) => {
          let image = item?.field_image ? item.field_image.uri.url : null;
          return (
            <BlogCard
              key={index}
              title={item.title}
              body={item.body.value}
              id={item.id}
              img={image}
              author={item.uid}
              tag={item.field_tags}
            />
          );
        })}
    </div>
  );
};

export default Blogs;
