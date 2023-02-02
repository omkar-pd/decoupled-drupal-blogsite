import axios from "axios";
import { isLoggedIn } from "./auth";
import { createJsonResponse } from "./fetchData";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getUserDetails = async (id) => {
  const token = await isLoggedIn();

  try {
    const res = await axios.get(`${baseUrl}jsonapi/user/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

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
    const res1 = await createJsonResponse(response);
    const result = res1.map((item) => {
      return item.data;
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
  return Ids.filter(item => {
    if(articlesIds.includes(item)){
      return item;
    }
  })
  // console.log(favArticleIds);
};
const getAllArticles = async () => {
  try {
    const res = await axios.get(`${baseUrl}jsonapi/node/article/`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};
