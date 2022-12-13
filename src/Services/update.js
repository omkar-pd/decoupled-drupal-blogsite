import axios from "axios";
import { toast } from "react-toastify";
import { isLoggedIn } from "./auth";
import { createJsonBody } from "./create";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const update = async (data) => {
  const token = await isLoggedIn();
  if (token) {
    const body = createJsonBody(data);
    body.data.id = data.id;
    try {
      const res = await axios.patch(
        `${baseUrl}jsonapi/node/article/${data.id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
        }
      );
      toast.success("Article Updated Successfully !", {
        theme: "dark",
        position: "top-center",
      });
      return res.data.data;
    } catch (error) {
      toast.error("you don't have permission to edit this blog !", {
        theme: "dark",
        position: "top-center",
      });
      return false;
    }
  }
};
