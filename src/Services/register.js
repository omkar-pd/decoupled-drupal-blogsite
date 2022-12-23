import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;
export const handleRegister = async (data) => {
  const jsonData = createJson(data);
  const res = drupalRegister(jsonData);
  return res;
};

export const drupalRegister = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}jsonapi/user/register`, data, {
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/json",
      },
    });
    if (res) {
      toast.success("Account Created Successfully!", {
        theme: "dark",
        position: "top-center",
      });
    }
    return res;
  } catch (error) {
    toast.error(error.response.data.errors[0].detail, {
      theme: "dark",
      position: "top-center",
    });
    return false;
  }
};

const createJson = (data) => {
  const jsonData = {
    data: {
      type: "user--user",
      attributes: {
        name: data.name,
        pass: data.pass,
        mail: data.mail,
        status: "true",
      },
      // relationships: {
      //   roles: {
      //     data: {
      //       type: "user_role--user_role",
      //       id: "d590e230-e627-49ab-8042-4a852d538c20",
      //     },
      //   },
      // },
    },
  };
  return jsonData;
};
