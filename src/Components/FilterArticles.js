import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import { fetchArticlesByTag, fetchTaxonomyTerms } from "../Services/fetchData";
import BlogCard from "./BlogCard";
export const FilterArticles = () => {
  const [term, SetTerm] = useState();
  const [blogs, SetBlogs] = useState([]);
  const [selectedTerm, SetSelectedTerm] = useState("all");

  useEffect(() => {
    async function fetchData() {
      const res = await fetchTaxonomyTerms();
      SetTerm(
        res.map((term) => {
          return term.attributes.name;
        })
      );
    }
    fetchData();
  }, []);

  const onTermSelect = async (e) => {
    const res = await fetchArticlesByTag(e.target.value);
    SetSelectedTerm(e.target.value);
    if (res.length !== 0) {
      SetBlogs(
        res.map((item) => {
          return item.data;
        })
      );
    } else {
      SetBlogs(null);
    }
  };
  const onBlogDelete = (id) => {
    SetBlogs(
      blogs.filter((item) => {
        return item.data.id !== id;
      })
    );
  };

  const RenderBlogs = blogs ? (
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
    })
  ) : (
    <div className=" w-full flex justify-center items-center h-36 ">
      <h5 className="text-gray-900 font-bold text-4xl text-center tracking-tight mb-2">
        No Result Found For {`${selectedTerm} Category`}
      </h5>
    </div>
  );
  return (
    <div className="my-5">
      <h5 className="text-gray-900 font-bold text-4xl text-center tracking-tight my-5">
        {`${selectedTerm} Blogs`}
      </h5>{" "}
      <div className="px-7">
        <label htmlFor="underline_select" className="sr-only">
          Select Category
        </label>
        <select
          id="underline_select"
          className="block py-2.5  w-full text-sm text-gray-500 bg-white  appearance-none dark:text-gray-400 focus:outline-none   border-2 border-r-primary px-2"
          onChange={onTermSelect}
          defaultValue={null}
        >
          <option value="all">All</option>
          {term &&
            term.map((item, id) => {
              return (
                <option key={id} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
      </div>
      <div className="flex flex-wrap">
        {selectedTerm === "all" ? <Blogs></Blogs> : RenderBlogs}
      </div>
    </div>
  );
};
