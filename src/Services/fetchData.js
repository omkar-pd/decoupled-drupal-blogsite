import axios from "axios";
import jsonapi from "jsonapi-parse";
import { isLoggedIn } from "./auth";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchArticles = async () => {
  try {
    const res = await axios.get(`${baseUrl}jsonapi/node/article/`);
    let data = res.data.data;
    const endpoints = data.map((article) => {
      return `${baseUrl}jsonapi/node/article/${article.id}?include=field_image,field_tags,uid`;
    });
    const response = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((data) => data);
    const res1 = await createJsonResponse(response);
    return res1;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetailedArticle = async (id) => {
  try {
    const res = await axios.get(
      `${baseUrl}/jsonapi/node/article/${id}?include=field_image,field_tags,uid`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLatestBlogs = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}jsonapi/views/latest_blogs/latest_blogs`
    );
    const data = res.data.data;
    const endpoints = data.map((article) => {
      return `jsonapi/node/article/${article.id}?include=field_image,field_tags,uid`;
    });
    let response = await axios.all(
      endpoints.map(async (endpoint) => await axios.get(endpoint))
    );
    response = createJsonResponse(response);
    return response;
  } catch (error) {
    return false;
  }
};

export const fetchTaxonomyTerms = async () => {
  try {
    const res = await axios.get(`${baseUrl}jsonapi/taxonomy_term/tags`);
    return res.data.data;
  } catch (error) {
    return false;
  }
};

export const fetchArticlesByTag = async (tagName) => {
  try {
    const res = await axios.get(
      `${baseUrl}jsonapi/node/article?filter[field_tags.name][value]=${tagName}`
    );
    const data = res.data.data;
    const endpoints = data.map((article) => {
      return `jsonapi/node/article/${article.id}?include=field_image,field_tags,uid`;
    });
    let response = await axios.all(
      endpoints.map(async (endpoint) => await axios.get(endpoint))
    );
    response = createJsonResponse(response);
    return response;
  } catch (error) {
    return false;
  }
};

export const fetchArticlesByTitle = async (query) => {
  try {
    const res = await axios.get(
      `${baseUrl}jsonapi/node/article?filter[title][operator]=CONTAINS&filter[title][value]=${query}`
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchArticlesByUser = async (uid) => {
  const token = await isLoggedIn();

  try {
    const res = await axios.get(
      `${baseUrl}jsonapi/node/article?filter[uid.id]=${uid}&include=field_image,field_tags,uid`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );
    const parse = jsonapi.parse(res.data);
    return parse.data;
  } catch (err) {
    return err;
  }
};

export const createJsonResponse = (res) => {
  if (!isNaN(res.length)) {
    res.forEach((item, id) => {
      return item.data.included.forEach((item2) => {
        if (item2.type === "file--file") {
          return (res[id].data.image = item2);
        }
        if (item2.type === "taxonomy_term--tags") {
          res[id].data.tag = item2;
        }
        if (item2.type === "user--user") {
          res[id].data.user = item2;
        }
      });
    });
  } else {
    res.included.forEach((item) => {
      if (item.type === "file--file") {
        return (res.data.image = item);
      }
      if (item.type === "taxonomy_term--tags") {
        res.data.tag = item;
      }
      if (item.type === "user--user") {
        res.data.user = item;
      }
    });
  }
  return res;
};
