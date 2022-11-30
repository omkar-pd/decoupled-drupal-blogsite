import axios from "axios";

export const fetchArticles = async() => {
    try {
        const res = await axios.get("jsonapi/node/article");
        // console.log(res.data.data.data);
        return res.data.data;
      } catch (error) {
        console.log(error);
      }
    };

