import React, { useEffect, useState } from "react";
import { fetchLatestBlogs } from "../Services/fetchData";
import BlogCard from "./BlogCard";

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetchLatestBlogs();
      if (res) {
        setBlogs(
          res.map((item) => {
            return item.data;
          })
        );
      }
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
    <div className="my-4">
      <h5 className="text-gray-900 font-bold text-4xl text-center tracking-tight mb-2">
        Latest Blogs
      </h5>
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
    </div>
  );
}
