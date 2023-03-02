import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchDetailedArticle } from "../Services/fetchData";
import { FaEdit, FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import { Context } from "../Context/userContext";
import { deleteArticle } from "../Services/deleteArticle";
import { isLoggedIn } from "../Services/auth";
import { removeFromFav, Fav, isFavorite } from "../Services/Fav";
import { InlineShareButtons } from "sharethis-reactjs";
import jsonapi from "jsonapi-parse";
import "./css/DetailedBlog.css";

export default function DetailedBlog() {
  const [detailedBlog, setDetailedBlog] = useState({});
  const [isFav, setIsFav] = useState();
  const parse = require("html-react-parser");
  const { state } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    // eslint-disable-next-line
    async function fetchData() {
      const res = await fetchDetailedArticle(id);
      const blog = jsonapi.parse(res);
      setDetailedBlog({
        id: blog.data.id,
        title: blog.data.title,
        body: parse(blog.data.body.value),
        image: `${base_url}${blog.data.field_image.uri.url}`,
        user: blog.data.uid.display_name,
        tag: blog.data.field_tags[0].name,
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
  };

  const removeFav = async () => {
    await removeFromFav(id);
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
      <div className="border-gray-900 bg-regal-blue p-3 mb-3">
        Tag: <span className="px-4">{detailedBlog.tag} </span>
      </div>
      <InlineShareButtons
        config={{
          alignment: "center",
          color: "social",
          enabled: true,
          font_size: 16,
          labels: "cta",
          language: "en",
          networks: [
            "whatsapp",
            "linkedin",
            "messenger",
            "facebook",
            "twitter",
          ],
          padding: 10,
          radius: 4,
          size: 35,
          title: `Read this exciting blog at`,
        }}
      />
    </div>
  );
}
