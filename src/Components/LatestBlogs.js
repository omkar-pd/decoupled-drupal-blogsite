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
  console.log(blogs);
  return (
    <div className="my-4">
      <h5 className="text-gray-900 font-bold text-4xl text-center tracking-tight mb-2">
        Latest Blogs
      </h5>
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
              ></BlogCard>
            );
          })}
      </div>
    </div>
  );
}
