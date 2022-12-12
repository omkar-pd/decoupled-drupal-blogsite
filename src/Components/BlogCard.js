import React from "react";
import { Link } from "react-router-dom";
import fallback from "../Assets/image.jpeg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Context } from "../Context/userContext";
import { useContext } from "react";
import { deleteArticle } from "../Services/deleteArticle";

const BlogCard = (props) => {
  const { state } = useContext(Context);
  const regex = /(<([^>]+)>)/gi;
  const body = props.body.replace(regex, "");
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
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
            {`${props.title.substring(0, 25)}...`}
          </h5>
          <p className="font-normal text-gray-700 mb-3">
            {`${body.substring(0, 100)}...`}
          </p>
          <Link
            className="text-black border-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            to={`blog/${props.id}`}
          >
            Read More
          </Link>
        </div>
        {state.isAuthenticated && (
          <div className="flex text-2xl px-5 my-0 p-0 justify-between">
            <button onClick={deleteNode} value={props.id}>
              <FaTrash className="pointer-events-none" />
            </button>
            <Link to={`blog/update/${props.id}`}>
              <FaEdit></FaEdit>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
