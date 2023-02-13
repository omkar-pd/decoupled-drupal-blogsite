import axios from "axios";
import jsonapi from "jsonapi-parse";
import { isLoggedIn } from "./auth";
import { createJsonResponse } from "./fetchData";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getUserDetails = async (id) => {
  const token = await isLoggedIn();

  try {
    const res = await axios.get(
      `${baseUrl}jsonapi/user/user/${id}?include=user_picture`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );
    res.data.data.attributes.user_picture = res.data?.included[0]?.attributes;
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getUserFavArticles = async (Ids) => {
  const nodeIds = await isArticleExists(Ids);
  const endpoints = nodeIds.map((id) => {
    return `${baseUrl}jsonapi/node/article/${id}?include=field_image,field_tags,uid`;
  });
  try {
    const response = await axios.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );
    const result = response.map((res) => {
      return jsonapi.parse(res.data);
    });
    return result;
  } catch (error) {
    return error;
  }
};

const isArticleExists = async (Ids) => {
  const articles = await getAllArticles();
  const articlesIds = articles.map((article) => {
    return article.id;
  });
  // eslint-disable-next-line
  return Ids.filter((item) => {
    if (articlesIds.includes(item)) {
      return item;
    }
  });
};
const getAllArticles = async () => {
  try {
    const res = await axios.get(`${baseUrl}jsonapi/node/article/`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};
