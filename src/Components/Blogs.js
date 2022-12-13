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
          let image = item?.image ? item.image.attributes.uri.url : null;
          return (
            <BlogCard
              key={index}
              title={item.data.attributes.title}
              body={item.data.attributes.body.processed}
              id={item.data.id}
              img={image}
              author={item.user}
              tag={item.tag}
              onDelete={onBlogDelete}
            />
          );
        })}
    </div>
  );
};

export default Blogs;
