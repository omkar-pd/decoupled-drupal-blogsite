import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetails, getUserFavArticles } from "../Services/user";
import { FavBlogCard } from "../Components/FavBlogCard";
import { fetchArticlesByUser } from "../Services/fetchData";
export const UserProfile = () => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await getUserDetails(id);
      setProfile(res.data.attributes);

      const user_blogs = await fetchArticlesByUser(id);
      setUserBlogs(user_blogs);
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
  console.log(blogs);
  return (
    <>
      <div>
        <h3 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-5xl text-center py-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            User
          </span>{" "}
          Details{" "}
        </h3>
        <div className="max-w-3xl p-8 sm:flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100 mx-auto mb-5 shadow-md">
          <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
            <img
              src={profile.user_picture?.uri?.url}
              alt=""
              className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-gray-900 font-bold text-3xl tracking-tight mb-2">
                {profile.name}
              </h2>
              <span className="text-md dark:text-gray-400">Admin</span>
            </div>
            <div className="space-y-1">
              <span className="flex items-center space-x-2 text-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Email address"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                  ></path>
                </svg>
                <span className="dark:text-gray-400">{profile.mail}</span>
              </span>
              {/* <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Phonenumber"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                  ></path>
                </svg>
                <span className="dark:text-gray-400">+25 381 77 983</span>
              </span> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-5xl text-center py-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            User
          </span>
          Blogs
        </h3>
        <div className="flex flex-wrap">
          {userBlogs &&
            userBlogs.map((blog, id) => {
              return (
                <Fragment key={id}>
                  <FavBlogCard
                    title={blog.title}
                    body={blog.body}
                    image={blog?.field_image}
                    user={blog?.uid}
                    tag={blog?.field_tags}
                    id={blog.id}
                  />
                </Fragment>
              );
            })}
        </div>
      </div>
      <h3 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-5xl text-center py-5">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Favorite
        </span>{" "}
        Blogs{" "}
      </h3>
      <div className="flex flex-wrap">
        {blogs &&
          blogs.map((blog, id) => {
            return (
              <Fragment key={id}>
                <FavBlogCard
                  title={blog.data.title}
                  body={blog.data.body}
                  image={blog?.data.field_image}
                  user={blog?.data.uid}
                  tag={blog?.data.field_tags}
                  id={blog.data.id}
                />
              </Fragment>
            );
          })}
      </div>
    </>
  );
};
