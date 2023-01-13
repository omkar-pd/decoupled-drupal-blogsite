import React from "react";
import { Link } from "react-router-dom";
import fallback from "../Assets/image.jpeg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Context } from "../Context/userContext";
import { useContext } from "react";
import { deleteArticle } from "../Services/deleteArticle";

const BlogCard = (props) => {
  const parse = require("html-react-parser");
  const { state } = useContext(Context);
  const regex = /(<([^>]+)>)/gi;
  let body = props.body.replace(regex, "");
  const newR= /[&\/\\#,+()$~%.'":*?<>{}]/g;
  body = body.replace(newR, '')
  // let body = props.body.substring(0,100)
  // body = parse(body)

  // console.log(props.body);
  const base_url = process.env.REACT_APP_BASE_URL;
  const img = props.img ? base_url + props.img : fallback;

  const deleteNode = async (e) => {
    const id = e.target.value;
    const res = await deleteArticle(id);
    if (res) {
      props.onDelete(id);
    }
  };
  return (
    <div className="max-w-lg  mt-4 h-30 mx-auto">
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg max-w-sm mb-5 h-full ">
        <img
          className="rounded-t-lg h-48 object-cover w-screen"
          src={img}
          alt="blog-img"
        />
        <div className="p-5 h-52">
          <p className="bg-green-400 w-14 text-center text-white font-semibold">
            {props.tag?.attributes.name}
          </p>

          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
            {`${props.title.substring(0, 25)}...`}
          </h5>
          <p className="font-normal text-gray-700 mb-3">
            {`${body.substring(0, 100)}...`}
            {/* {`${body} ...`}             */}
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
            by:- {props.author.attributes.display_name}
          </p>
          {state.isAuthenticated && (
            <div className="flex text-2xl my-0 p-0 justify-end">
              <button onClick={deleteNode} value={props.id} className="px-2">
                <FaTrash className="pointer-events-none" />
              </button>
              <Link to={`/blog/update/${props.id}`}>
                <FaEdit></FaEdit>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
