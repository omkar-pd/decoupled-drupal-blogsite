import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchDetailedArticle } from "../Services/fetchData";
import { FaEdit, FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import "./css/DetailedBlog.css";
import { Link } from "react-router-dom";
import { Context } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../Services/deleteArticle";
import { isLoggedIn } from "../Services/auth";
import { createJsonResponse } from "../Services/fetchData";
import { removeFromFav, Fav, isFavorite } from "../Services/Fav";

export default function DetailedBlog() {
  const [detailedBlog, setDetailedBlog] = useState({});
  const [isFav, setIsFav] = useState();
  const parse = require("html-react-parser");
  const { dispatch, state } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    // eslint-disable-next-line
    function fetchData() {
      fetchDetailedArticle(id).then((res) => {
        const jsonRes = createJsonResponse(res);
        setDetailedBlog({
          id: res.data.id,
          title: res.data.attributes.title,
          body: parse(res.data.attributes.body.value),
          image: `${base_url}${jsonRes.data.image.attributes.uri.url}`,
          user: jsonRes.data.user.attributes.display_name,
          tag: jsonRes.data.tag.attributes.name,
        });
      });
    }
    fetchData();
    const checkIsFav = async () => {
      const user = await isLoggedIn();
      user && isFavorite(id).then((res) => setIsFav(res));
    };
    checkIsFav();
    // eslint-disable-next-line
  }, [id]);

  const deleteNode = async () => {
    const res = await deleteArticle(id);
    if (res) {
      navigate("/");
    }
  };

  const AddBlogToFav = async () => {
    await Fav(detailedBlog.id);
    setIsFav(true);
    // dispatch({
    //   type: "LOGIN",
    // });
  };

  const removeFav = async () => {
    await removeFromFav(id);
    // dispatch({
    // type: "LOGIN",
    // });
    setIsFav(false);
  };

  return (
    <div className="detailed-blog bg-white">
      <div className="flex justify-between flex-col md:flex-row">
        <h5 className="text-gray-900 font-bold text-5xl tracking-tight mb-2">
          {detailedBlog.title}
        </h5>
        {state.isAuthenticated && (
          <div className="flex md:m-3 mx-0 text-2xl items-center">
            <button onClick={deleteNode} value={id}>
              <FaTrash className="pointer-events-none md:m-2 mx-0" />
            </button>{" "}
            <Link to={`/blog/update/${id}`}>
              <FaEdit className="m-2"></FaEdit>
            </Link>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <p>By {detailedBlog.user}</p>
        {state.isAuthenticated && (
          <p className="m-2">
            {isFav ? (
              <FaHeart onClick={removeFav} />
            ) : (
              <FaRegHeart onClick={AddBlogToFav} />
            )}
          </p>
        )}
      </div>
      <div className="blog-image">
        <img src={detailedBlog.image} alt="" />
      </div>
      <div className="blog-body m-3">{detailedBlog.body}</div>
      <div className="border-gray-900 bg-regal-blue p-3">
        Tag: <span className="px-4">{detailedBlog.tag} </span>
      </div>
    </div>
  );
}
