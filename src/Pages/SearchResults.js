import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesByTitle } from "../Services/fetchData";
import { SearchCard } from "../Components/SearchCard";
export const SearchResults = () => {
  const { query } = useParams();
  const [blogs, SetBlogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchArticlesByTitle(query);
      SetBlogs(res);
    };

    fetchData();
  }, [query]);
  return (
    <div className="flex justify-center items-center flex-col my-4">
      <h5 className="text-gray-900 font-bold text-3xl tracking-tight mb-2">
        {`Search Results For ${query}`}{" "}
      </h5>
      {blogs &&
        blogs.map((blog, id) => {
          return (
            <SearchCard
              title={blog.attributes.title}
              id={blog.id}
              body={blog.attributes.body.value}
              key={id}
            />
          );
        })}
    </div>
  );
};
