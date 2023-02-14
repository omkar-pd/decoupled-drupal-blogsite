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

  return (
    <div className="my-4">
      <h5 className="text-gray-900 font-bold text-4xl text-center tracking-tight mb-2">
        Latest Blogs
      </h5>
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
              ></BlogCard>
            );
          })}
      </div>
    </div>
  );
}
