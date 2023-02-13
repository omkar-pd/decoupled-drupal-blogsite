import React from "react";
import { Link } from "react-router-dom";

export const FavBlogCard = (props) => {
    const regex = /(<([^>]+)>)/gi;
    return (
    <div className="max-w-lg  mt-4 h-30 mx-auto">
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg max-w-sm mb-5 h-full ">
        <img
          className="rounded-t-lg h-48 object-cover w-screen"
          src={props?.image?.uri?.url}
          alt="blog-img"
        />
        <div className="p-5 h-52">
          <p className="bg-green-400 w-14 text-center text-white font-semibold">
            {props.tag?.name}
          </p>

          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
            {`${props.title.substring(0, 25)}...`}
          </h5>
          <p className="font-normal text-gray-700 mb-3">
            {`${props.body.value.replace(regex, " ").substring(0, 100)}...`}
          </p>
          <Link
            className="text-black border-2 hover:bg-black  hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            to={`/blog/${props.id}`}
          >
            Read More
          </Link>
        </div>
        <div className="px-5 pt-4 flex justify-between">
          <p className="font-normal text-blue-500">
            by:- {props.user.display_name}
          </p>
        </div>
      </div>
    </div>
  );
};
