import React, { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { Context } from "../Context/userContext";
export const AddToFav = (props) => {
  //   const { state } = useContext(Context);
  //   console.log(state);
  //   const AddBlogToFav = () => {
  //     console.log("clic");
  //   };
  return (
    <div {...props}>
      <FaRegHeart />
    </div>
  );
};
