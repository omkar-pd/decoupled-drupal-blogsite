import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchArticles = async () => {
  try {
    const res = await axios.get("jsonapi/node/article/");
    let data = res.data.data;
    const endpoints = data.map((article) => {
      return `jsonapi/node/article/${article.id}?include=field_image`;
    });
    const response = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((data) => data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetailedArticle = async (id) => {
  // console.log(id);
  try {
    const res = await axios.get(
      `/jsonapi/node/article/${id}?include=field_image`
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
      return `jsonapi/node/article/${article.id}?include=field_image`;
    });
    const response = await axios.all(
      endpoints.map(async (endpoint) => await axios.get(endpoint))
    );
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
      return `jsonapi/node/article/${article.id}?include=field_image`;
    });
    const response = await axios.all(
      endpoints.map(async (endpoint) => await axios.get(endpoint))
    );
    return response;
  } catch (error) {
    return false;
  }
};
