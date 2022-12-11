import React from "react";
import { Link } from "react-router-dom";
export const SearchCard = (props) => {
  const regex = /(<([^>]+)>)/gi;
  const body = props.body.replace(regex, "");

  return (
    <div className=" w-4/6 h-[200px] flex shadow-md p-3 rounded-lg bg-primary text-white my-4">
      <div className=" w-[650px]  max-h-44">
        <img
          src="https://images.unsplash.com/photo-1668668252875-80088c7eeec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjA3MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzA1ODUzOTk&ixlib=rb-4.0.3&q=80&w=400"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full mx-2 px-3 flex flex-col">
        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
          {props.title}
        </h5>{" "}
        <p className="font-normal text-gray-700 mb-3">
          {`${body.substring(0, 150)}...`}
        </p>
        <Link to={`/blog/${props.id}`} className="my-5">Read More</Link>
      </div>
    </div>
  );
};
