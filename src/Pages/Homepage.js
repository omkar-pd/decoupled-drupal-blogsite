import React from "react";
import LatestBlogs from "../Components/LatestBlogs";
import { FilterArticles } from "../Components/FilterArticles";
export const Homepage = () => {
  return (
    <>
      <LatestBlogs></LatestBlogs>;
      <FilterArticles></FilterArticles>
    </>
  );
};
