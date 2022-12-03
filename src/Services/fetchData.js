import axios from "axios";

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
    const res = await axios.get(`/jsonapi/node/article/${id}?include=field_image`);
    return res.data;
  }catch (error) {
    console.log(error);
  }

}
