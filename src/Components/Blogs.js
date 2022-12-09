import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { fetchArticles } from "../Services/fetchData";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    function fetchData() {
      fetchArticles().then((res) => {
        setBlogs(res.map((item) => item.data));
      });
    }
    fetchData();
  }, []);

  const onBlogDelete = (id) => {
    setBlogs(
      blogs.filter((item) => {
        return item.data.id !== id;
      })
    );
  };
  return (
    <div className="flex flex-wrap">
      {blogs &&
        blogs.map((item, index) => {
          let image = item?.included
            ? item.included[0].attributes.uri.url
            : null;
          return (
            <BlogCard
              key={index}
              title={item.data.attributes.title}
              body={item.data.attributes.body.processed}
              id={item.data.id}
              img={image}
              onDelete={onBlogDelete}
              // {item.included[0] ? item.included[0].attributes.uri.url : null  }// img={item.included[0].attributes.uri.url}
            ></BlogCard>
          );
        })}
    </div>
  );
};

export default Blogs;
