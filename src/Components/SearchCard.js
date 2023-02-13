import React from "react";
import { Link } from "react-router-dom";
export const SearchCard = (props) => {
  const regex = /(<([^>]+)>)/gi;
  const body = props.body.replace(regex, "");

  return (
    <div className="w-4/6  h-full flex shadow-md p-3 rounded-lg bg-white text-white my-4 flex-col md:flex-row">
      {/* <div className="md:max-h-48 md:w-[600px]">
        <img
          src="https://images.unsplash.com/photo-1668668252875-80088c7eeec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjA3MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzA1ODUzOTk&ixlib=rb-4.0.3&q=80&w=400"
          alt=""
          className="object-cover w-full max-h-[230px] md:h-full"
        />
      </div> */}
      <div className="w-full md:mx-2 md:px-4 flex flex-col">
        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
          {props.title}
        </h5>{" "}
        <p className="font-normal text-gray-700 mb-3">
          {`${body.substring(0, 150)}...`}
        </p>
        <Link
          className="text-black border-2 hover:bg-black  hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center max-w-max"
          to={`/blog/${props.id}`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
