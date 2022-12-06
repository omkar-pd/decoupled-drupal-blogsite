import "./css/BlogCard.css";
import React from "react";
import { Link } from "react-router-dom";
import fallback from "../Assets/image.jpeg";

const BlogCard = (props) => {
  const regex = /(<([^>]+)>)/gi;
  const body = props.body.replace(regex, "");
  const base_url = process.env.REACT_APP_BASE_URL;
  const img = props.img ? base_url + props.img : fallback;
  return (
    <div className="blog-card">
      <div className="image-wrapper">
        <img src={img} alt="asd" />
      </div>
      <h1>{props.title}</h1>
      <div>
        <p className="blog-body">{`${body.substring(0, 100)}...`}</p>
      </div>
      <Link to={`blog/${props.id}`}>Read More</Link>
    </div>
  );
};

export default BlogCard;
