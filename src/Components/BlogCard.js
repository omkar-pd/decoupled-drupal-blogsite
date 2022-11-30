import "./css/BlogCard.css";
import React from 'react';
import { Link } from "react-router-dom";
const BlogCard = (props) => { 
const regex = /(<([^>]+)>)/ig;
const body = props.body.replace(regex, '');
  return (
    <div className='blog-card'>
      <div className='image-wrapper'><img src="https://images.unsplash.com/photo-1666884614831-ff6a889266d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjA3MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Njk0NDQzNTM&ixlib=rb-4.0.3&q=80&w=400" alt="asd" /></div>
      <h1>{props.title}</h1>
      <div>
        <p className="blog-body">{`${body.substring(0,100)}...`}</p>
      </div>

      <Link
      to={`blog/${props.id}`}>Read More</Link>
    </div>
  )
}


export default BlogCard;
