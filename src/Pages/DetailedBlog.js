import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetailedArticle } from "../Services/fetchData";
import "./css/DetailedBlog.css";
import fallback from "../Assets/image.jpeg";

export default function DetailedBlog(props) {
  const parse = require("html-react-parser");
  const [detailedBlog, setDetailedBlog] = useState({});
  const { id } = useParams();
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
  return (
    <div className="detailed-blog">
      <h5 className="text-gray-900 font-bold text-5xl text-center tracking-tight mb-2">
        {detailedBlog.title}
      </h5>
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
