import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetailedArticle } from "../Services/fetchData";
import "./css/DetailedBlog.css"

export default function DetailedBlog(props) {
  const parse = require("html-react-parser");
  const [detailedBlog, setDetailedBlog] = useState({});
  const { id } = useParams();
  const base_url = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    // eslint-disable-next-line
    function fetchData() {
      fetchDetailedArticle(id).then((res) => {
        setDetailedBlog({
          title: res.data.attributes.title,
          body: parse(res.data.attributes.body.value),
          image: res.included[0].attributes.uri.url,
        });
      });
    }
    fetchData();
  }, [id]);
  return (
    <div className="detailed-blog">
      <h1>{detailedBlog.title}</h1>
      <div>
        <p>By Admin</p>
      </div>
      <div className="blog-image">
        <img src={base_url + detailedBlog.image} alt="" />
      </div>
      <div className="blog-body">{detailedBlog.body}</div>
    </div>
  );
}
