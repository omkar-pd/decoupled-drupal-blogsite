import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetails, getUserFavArticles } from "../Services/user";
import { FavBlogCard } from "../Components/FavBlogCard";
export const UserProfile = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await getUserDetails(id);
      const Ids = res.data.relationships?.field_add_to_fav?.data
        ?.filter((article) => {
          return article.id !== "missing";
        })
        .map((article) => {
          return article.id;
        });
      const favs = await getUserFavArticles(Ids);
      setBlogs(favs);
    };
    fetchUserDetails();
  }, [id]);
  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center py-5">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Favorite
        </span>{" "}
        Blogs{" "}
      </h1>
      <div className="flex flex-wrap">
        {blogs &&
          blogs.map((blog, id) => {
            return (
              <Fragment key={id}>
                <FavBlogCard
                  title={blog.data.attributes.title}
                  body={blog.data.attributes.body}
                  image={blog?.image?.attributes}
                  user={blog?.user?.attributes}
                  tag={blog?.tag?.attributes}
                  id={blog.data.id}
                />
              </Fragment>
            );
          })}
      </div>
    </>
  );
};
