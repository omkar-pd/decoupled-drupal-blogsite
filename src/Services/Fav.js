import axios from "axios";
import { toast } from "react-toastify";
import { checkToken, isLoggedIn, getCurrentUserDetails } from "./auth";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const Fav = async (postID) => {
  const token = await isLoggedIn();

  if (token) {
    const userInfo = await getCurrentUserDetails();
    const FavPosts = await getFavPosts(userInfo.token, userInfo.user.id);
    FavPosts.push({
      id: postID,
      type: "node--article",
    });

    const json = createJsonBody(userInfo.user.id, FavPosts);
    const res = await setFav(json);
    if (res) {
      toast.success("Article added to Fav !", {
        theme: "dark",
        position: "top-center",
      });
    }
    return res;
  }
};

export const removeFromFav = async (postID) => {
  const token = await isLoggedIn();

  if (token) {
    const userInfo = await getCurrentUserDetails();
    const favPosts = await getFavPosts(userInfo.token, userInfo.user.id);
    const filteredArray = favPosts.filter((item) => {
      return postID !== item.id;
    });
    const Json = createJsonBody(userInfo.user.id, filteredArray);
    const res = await setFav(Json);
    if (res) {
      toast.success("Article removed from fav !", {
        theme: "dark",
        position: "top-center",
      });
    }
  }
};

const createJsonBody = (userID, favPosts) => {
  // eslint-disable-next-line
  const Posts = favPosts.map((item) => {
    if (item.id !== "missing") {
      return {
        id: item.id,
        type: "node--article",
      };
    }
  });
  const json = {
    data: {
      type: "user--user",
      id: userID,
      relationships: {
        field_add_to_fav: {
          data: Posts,
        },
      },
    },
  };
  return json;
};

const getFavPosts = async (token, user_id) => {
  try {
    const res = await axios.get(`/jsonapi/user/user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    return res.data.data.relationships.field_add_to_fav.data;
  } catch (err) {
    console.log(err);
  }
};

export const isFavorite = async (postID) => {
  let isFavorite = false;
  const userInfo = await getCurrentUserDetails();

  const FavPosts = await getFavPosts(userInfo.token, userInfo.user.id);
  FavPosts.forEach((post) => {
    if (post.id === postID) {
      isFavorite = true;
    }
  });
  return isFavorite;
};

const setFav = async (data) => {
  const token = await isLoggedIn();

  if (token) {
    const userInfo = await getCurrentUserDetails();
    try {
      const res = await axios.patch(
        `${baseUrl}jsonapi/user/user/${userInfo.user.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
        }
      );
      if (res) {
        checkToken();
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  }
};
