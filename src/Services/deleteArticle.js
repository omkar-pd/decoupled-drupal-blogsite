import axios from "axios";
import { toast } from "react-toastify";
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

      toast.success("Blog Deleted Successfully!", {
        theme: "dark",
        position: "top-center",
      });
      return res;
    } catch (error) {
      toast.error("You don't have permission to delete this Blog!", {
        theme: "dark",
        position: "top-center",
      });
      return false;
    }
  }
};
