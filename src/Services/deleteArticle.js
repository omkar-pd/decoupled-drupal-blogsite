import axios from "axios";
import { isLoggedIn } from "./auth";
const baseUrl = process.env.REACT_APP_BASE_URL;
export const deleteArticle = async (id) => {
  const token = await isLoggedIn();
  if (token) {
    try {
      const res = await axios.delete(`${baseUrl}jsonapi/node/article/${id}`, {
        headers: {
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      return res;
    } catch (error) {
      return false;
    }
  }
};
