import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { fetchDetailedArticle } from "../Services/fetchData";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./css/DetailedBlog.css";
import { Link } from "react-router-dom";
import fallback from "../Assets/image.jpeg";
import { Context } from "../Context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../Services/deleteArticle";

export default function DetailedBlog() {
  const parse = require("html-react-parser");
  const { state } = useContext(Context);
  const [detailedBlog, setDetailedBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    // eslint-disable-next-line
    function fetchData() {
      fetchDetailedArticle(id).then((res) => {
        let image = res?.included
          ? base_url + res.included[0].attributes.uri.url
          : fallback;
        setDetailedBlog({
          title: res.data.attributes.title,
          body: parse(res.data.attributes.body.value),
          image: image,
        });
      });
    }
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const deleteNode = async () => {
    const res = await deleteArticle(id);
    if (res) {
      navigate("/");
    }
  };
  return (
    <div className="detailed-blog">
      <div className="flex justify-between">
        <h5 className="text-gray-900 font-bold text-5xl tracking-tight mb-2">
          {detailedBlog.title}
        </h5>
        {state.isAuthenticated && (
          <div className="flex m-3 text-2xl">
            <button onClick={deleteNode} value={id}>
              <FaTrash className="pointer-events-none m-2" />
            </button>{" "}
            <Link to={`/blog/update/${id}`}>
              <FaEdit className="m-2"></FaEdit>
            </Link>
          </div>
        )}
      </div>
      <div>
        <p>By Admin</p>
      </div>
      <div className="blog-image">
        <img src={detailedBlog.image} alt="" />
      </div>
      <div className="blog-body m-3">{detailedBlog.body}</div>
    </div>
  );
}
